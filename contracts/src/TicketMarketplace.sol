// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./TicketNFT.sol";

/**
 * @title SnapTix Ticket Marketplace
 * @dev Facilitates the buying and selling of NFT tickets on a secondary market
 */
contract TicketMarketplace is Ownable, ReentrancyGuard {
    TicketNFT private ticketNFT;
    
    // Listing struct to store marketplace listings
    struct Listing {
        address seller;
        uint256 price;
        uint256 tokenId;
        bool isActive;
    }
    
    // Mapping to store listings by token ID
    mapping(uint256 => Listing) public listings;
    
    // Platform fee percentage (0.5%)
    uint256 public platformFeePercent = 50; // 0.5% = 50 basis points
    
    // Organizer fee percentage (5%)
    uint256 public organizerFeePercent = 500; // 5% = 500 basis points
    
    // Events
    event TicketListed(uint256 tokenId, uint256 price, address seller);
    event TicketPriceChanged(uint256 tokenId, uint256 newPrice);
    event TicketSold(uint256 tokenId, uint256 price, address seller, address buyer);
    event ListingCancelled(uint256 tokenId);
    
    constructor(address _ticketNFTAddress) Ownable() {
        ticketNFT = TicketNFT(_ticketNFTAddress);
    }
    
    /**
     * @dev List a ticket for sale on the marketplace
     */
    function listTicket(uint256 tokenId, uint256 price) external {
        require(ticketNFT.ownerOf(tokenId) == msg.sender, "Not token owner");
        require(price > 0, "Price must be greater than zero");
        
        // Check if token is already approved for marketplace
        require(
            ticketNFT.getApproved(tokenId) == address(this) || 
            ticketNFT.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved"
        );
        
        // Create a new listing
        listings[tokenId] = Listing({
            seller: msg.sender,
            price: price,
            tokenId: tokenId,
            isActive: true
        });
        
        emit TicketListed(tokenId, price, msg.sender);
    }
    
    /**
     * @dev Update the price of a listed ticket
     */
    function updateListing(uint256 tokenId, uint256 newPrice) external {
        Listing storage listing = listings[tokenId];
        
        require(listing.isActive, "Listing not active");
        require(listing.seller == msg.sender, "Not the seller");
        require(newPrice > 0, "Price must be greater than zero");
        
        listing.price = newPrice;
        
        emit TicketPriceChanged(tokenId, newPrice);
    }
    
    /**
     * @dev Cancel a ticket listing
     */
    function cancelListing(uint256 tokenId) external {
        Listing storage listing = listings[tokenId];
        
        require(listing.isActive, "Listing not active");
        require(listing.seller == msg.sender, "Not the seller");
        
        listing.isActive = false;
        
        emit ListingCancelled(tokenId);
    }
    
    /**
     * @dev Buy a listed ticket
     */
    function buyTicket(uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[tokenId];
        
        require(listing.isActive, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");
        require(msg.sender != listing.seller, "Seller cannot buy own ticket");
        
        // Get the event ID from the ticket
        (uint256 eventId, , , ,) = ticketNFT.tickets(tokenId);
        
        // Get the organizer address from the event
        (, , , , , address organizer, , ,) = ticketNFT.events(eventId);
        
        // Calculate fees
        uint256 platformFee = (listing.price * platformFeePercent) / 10000;
        uint256 organizerFee = (listing.price * organizerFeePercent) / 10000;
        uint256 sellerAmount = listing.price - platformFee - organizerFee;
        
        // Mark listing as inactive
        listing.isActive = false;
        
        // Transfer the ticket
        ticketNFT.safeTransferFrom(listing.seller, msg.sender, tokenId);
        
        // Transfer funds
        (bool platformSuccess, ) = payable(owner()).call{value: platformFee}("");
        require(platformSuccess, "Platform fee transfer failed");
        
        (bool organizerSuccess, ) = payable(organizer).call{value: organizerFee}("");
        require(organizerSuccess, "Organizer fee transfer failed");
        
        (bool sellerSuccess, ) = payable(listing.seller).call{value: sellerAmount}("");
        require(sellerSuccess, "Seller payment failed");
        
        // Refund excess payment
        if (msg.value > listing.price) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - listing.price}("");
            require(refundSuccess, "Refund failed");
        }
        
        emit TicketSold(tokenId, listing.price, listing.seller, msg.sender);
    }
    
    /**
     * @dev Get all active listings
     */
    function getActiveListings() external view returns (uint256[] memory) {
        uint256 totalSupply = ticketNFT.totalSupply();
        uint256[] memory activeListingIds = new uint256[](totalSupply);
        uint256 counter = 0;
        
        for (uint256 i = 1; i <= totalSupply; i++) {
            if (listings[i].isActive) {
                activeListingIds[counter] = i;
                counter++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = activeListingIds[i];
        }
        
        return result;
    }
    
    /**
     * @dev Update platform fee percentage
     */
    function setPlatformFeePercent(uint256 _platformFeePercent) external onlyOwner {
        require(_platformFeePercent <= 1000, "Fee cannot exceed 10%");
        platformFeePercent = _platformFeePercent;
    }
    
    /**
     * @dev Update organizer fee percentage
     */
    function setOrganizerFeePercent(uint256 _organizerFeePercent) external onlyOwner {
        require(_organizerFeePercent <= 2000, "Fee cannot exceed 20%");
        organizerFeePercent = _organizerFeePercent;
    }
}