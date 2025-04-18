// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SnapTix NFT Ticket
 * @dev Implements an NFT for event tickets with additional ticket-specific functionality
 */
contract TicketNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _eventIds;
    
    // Mapping for token URIs (replacing ERC721URIStorage)
    mapping(uint256 => string) private _tokenURIs;
    
    // Enumerable storage (replacing ERC721Enumerable)
    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;
    mapping(uint256 => uint256) private _ownedTokensIndex;
    mapping(uint256 => address) private _tokenOwners;
    uint256[] private _allTokens;
    mapping(uint256 => uint256) private _allTokensIndex;
    
    // Event struct to store event info
    struct Event {
        uint256 id;
        string title;
        uint256 startTime;
        uint256 endTime;
        string location;
        address organizer;
        bool isActive;
        uint256 maxTickets;
        uint256 ticketsSold;
    }
    
    // Ticket struct to store ticket info
    struct Ticket {
        uint256 eventId;
        string seatInfo;
        uint256 price;
        bool isUsed;
        uint256 purchaseTime;
    }
    
    // Mapping to store events by ID
    mapping(uint256 => Event) public events;
    
    // Mapping to store tickets by token ID
    mapping(uint256 => Ticket) public tickets;
    
    // Mapping from event ID to whether the event is using reserved seating
    mapping(uint256 => bool) public eventHasReservedSeating;
    
    // Mapping from event ID and seat info to whether the seat is taken
    mapping(uint256 => mapping(string => bool)) public isSeatTaken;
    
    // Events
    event EventCreated(
        uint256 eventId,
        string title,
        uint256 startTime,
        uint256 endTime,
        string location,
        address organizer,
        uint256 maxTickets
    );
    
    event TicketMinted(
        uint256 tokenId,
        uint256 eventId,
        string seatInfo,
        uint256 price,
        address buyer
    );
    
    event TicketUsed(uint256 tokenId);
    
    // Constructor
    constructor() ERC721("SnapTix Ticket", "SNTIX") Ownable() {}
    
    /**
     * @dev Set a token URI - replacement for ERC721URIStorage
     */
    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_exists(tokenId), "URI set for nonexistent token");
        _tokenURIs[tokenId] = uri;
    }
    
    /**
     * @dev Get a token URI - replacement for ERC721URIStorage
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
        
        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        
        return super.tokenURI(tokenId);
    }
    
    /**
     * @dev Get token balance for an address - replacement for ERC721Enumerable
     */
    function balanceOf(address owner) public view virtual override returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return super.balanceOf(owner);
    }
    
    /**
     * @dev Get token of owner by index - replacement for ERC721Enumerable
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256) {
        require(index < balanceOf(owner), "Owner index out of bounds");
        return _ownedTokens[owner][index];
    }
    
    /**
     * @dev Total supply of tokens - replacement for ERC721Enumerable
     */
    function totalSupply() public view returns (uint256) {
        return _allTokens.length;
    }
    
    /**
     * @dev Hook that is called before any token transfer
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
        
        // Track enumeration changes
        if (from == address(0)) {
            // Mint
            _addTokenToAllTokensEnumeration(firstTokenId);
        } else if (from != to) {
            // Transfer
            _removeTokenFromOwnerEnumeration(from, firstTokenId);
        }
        
        if (to == address(0)) {
            // Burn
            _removeTokenFromAllTokensEnumeration(firstTokenId);
        } else if (to != from) {
            // Transfer
            _addTokenToOwnerEnumeration(to, firstTokenId);
        }
    }
    
    /**
     * @dev Private function to add a token to owner's token list
     */
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        uint256 length = balanceOf(to);
        _ownedTokens[to][length] = tokenId;
        _ownedTokensIndex[tokenId] = length;
    }
    
    /**
     * @dev Private function to remove a token from owner's token list
     */
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        uint256 lastTokenIndex = balanceOf(from) - 1;
        uint256 tokenIndex = _ownedTokensIndex[tokenId];
        
        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];
            _ownedTokens[from][tokenIndex] = lastTokenId;
            _ownedTokensIndex[lastTokenId] = tokenIndex;
        }
        
        delete _ownedTokens[from][lastTokenIndex];
        delete _ownedTokensIndex[tokenId];
    }
    
    /**
     * @dev Private function to add a token to all tokens list
     */
    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }
    
    /**
     * @dev Private function to remove a token from the all tokens list
     */
    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        uint256 lastTokenIndex = _allTokens.length - 1;
        uint256 tokenIndex = _allTokensIndex[tokenId];
        uint256 lastTokenId = _allTokens[lastTokenIndex];
        
        _allTokens[tokenIndex] = lastTokenId;
        _allTokensIndex[lastTokenId] = tokenIndex;
        
        delete _allTokensIndex[tokenId];
        _allTokens.pop();
    }
    
    /**
     * @dev Creates a new event
     */
    function createEvent(
        string memory title,
        uint256 startTime,
        uint256 endTime,
        string memory location,
        uint256 maxTickets,
        bool hasReservedSeating
    ) public returns (uint256) {
        require(startTime > block.timestamp, "Event must start in the future");
        require(endTime > startTime, "End time must be after start time");
        
        _eventIds.increment();
        uint256 newEventId = _eventIds.current();
        
        events[newEventId] = Event(
            newEventId,
            title,
            startTime,
            endTime,
            location,
            msg.sender,
            true,
            maxTickets,
            0
        );
        
        eventHasReservedSeating[newEventId] = hasReservedSeating;
        
        emit EventCreated(
            newEventId,
            title,
            startTime,
            endTime,
            location,
            msg.sender,
            maxTickets
        );
        
        return newEventId;
    }
    
    /**
     * @dev Mints a new ticket NFT
     */
    function mintTicket(
        address buyer,
        uint256 eventId,
        string memory seatInfo,
        uint256 price,
        string memory tokenURI_
    ) public returns (uint256) {
        Event storage eventData = events[eventId];
        require(eventData.isActive, "Event is not active");
        require(eventData.ticketsSold < eventData.maxTickets, "Event is sold out");
        require(eventData.startTime > block.timestamp, "Event has already started");
        
        // If event has reserved seating, check if seat is available
        if (eventHasReservedSeating[eventId]) {
            require(!isSeatTaken[eventId][seatInfo], "Seat is already taken");
            isSeatTaken[eventId][seatInfo] = true;
        }
        
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        
        _mint(buyer, newItemId);
        _setTokenURI(newItemId, tokenURI_);
        
        tickets[newItemId] = Ticket(
            eventId,
            seatInfo,
            price,
            false,
            block.timestamp
        );
        
        // Increment tickets sold for this event
        eventData.ticketsSold += 1;
        
        emit TicketMinted(newItemId, eventId, seatInfo, price, buyer);
        
        return newItemId;
    }
    
    /**
     * @dev Mark a ticket as used
     */
    function useTicket(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender || msg.sender == owner(), "Not authorized");
        require(!tickets[tokenId].isUsed, "Ticket already used");
        
        uint256 eventId = tickets[tokenId].eventId;
        require(events[eventId].isActive, "Event is not active");
        
        tickets[tokenId].isUsed = true;
        emit TicketUsed(tokenId);
    }
    
    /**
     * @dev Cancel an event and allow refunds
     */
    function cancelEvent(uint256 eventId) public {
        Event storage eventData = events[eventId];
        require(msg.sender == eventData.organizer || msg.sender == owner(), "Not authorized");
        require(eventData.isActive, "Event is already inactive");
        
        eventData.isActive = false;
    }
    
    /**
     * @dev Get all tickets owned by an address
     */
    function getTicketsByOwner(address owner_) public view returns (uint256[] memory) {
        uint256 ticketCount = balanceOf(owner_);
        uint256[] memory result = new uint256[](ticketCount);
        
        for (uint256 i = 0; i < ticketCount; i++) {
            result[i] = tokenOfOwnerByIndex(owner_, i);
        }
        
        return result;
    }
    
    /**
     * @dev Check if a ticket is valid for an event
     */
    function isTicketValid(uint256 tokenId) public view returns (bool) {
        if (!_exists(tokenId)) {
            return false;
        }
        
        Ticket memory ticket = tickets[tokenId];
        Event memory eventData = events[ticket.eventId];
        
        return (
            eventData.isActive &&
            !ticket.isUsed &&
            block.timestamp >= eventData.startTime &&
            block.timestamp <= eventData.endTime
        );
    }
    
    /**
     * @dev Verify the ticket belongs to a specific owner and is valid
     */
    function verifyTicket(uint256 tokenId, address attendee) public view returns (bool) {
        return (_exists(tokenId) && ownerOf(tokenId) == attendee && isTicketValid(tokenId));
    }
}