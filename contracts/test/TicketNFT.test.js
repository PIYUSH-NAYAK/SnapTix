const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketNFT", function () {
  let TicketNFT;
  let ticketNFT;
  let owner;
  let organizer;
  let buyer;
  let addrs;
  let eventId;

  const EVENT_TITLE = "Test Concert";
  const EVENT_LOCATION = "Test Venue";
  const TICKET_URI = "ipfs://QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  const TICKET_PRICE = ethers.parseEther("0.1");

  beforeEach(async function () {
    // Get signers
    [owner, organizer, buyer, ...addrs] = await ethers.getSigners();
    
    // Deploy TicketNFT
    TicketNFT = await ethers.getContractFactory("TicketNFT");
    ticketNFT = await TicketNFT.deploy();
    
    // Set current time
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Create an event
    const tx = await ticketNFT.connect(organizer).createEvent(
      EVENT_TITLE,
      currentTime + 86400, // Start time: 1 day from now
      currentTime + 172800, // End time: 2 days from now
      EVENT_LOCATION,
      100, // Max tickets
      true // Reserved seating
    );
    
    const receipt = await tx.wait();
    const event = receipt.logs.find(log => {
      try {
        return ticketNFT.interface.parseLog(log).name === "EventCreated";
      } catch (e) {
        return false;
      }
    });
    
    if (event) {
      const parsedEvent = ticketNFT.interface.parseLog(event);
      eventId = parsedEvent.args[0];
    } else {
      throw new Error("EventCreated event not emitted");
    }
  });

  describe("Event Creation", function () {
    it("Should create an event with correct details", async function () {
      const eventData = await ticketNFT.events(eventId);
      
      expect(eventData.title).to.equal(EVENT_TITLE);
      expect(eventData.location).to.equal(EVENT_LOCATION);
      expect(eventData.organizer).to.equal(organizer.address);
      expect(eventData.isActive).to.be.true;
      expect(eventData.maxTickets).to.equal(100);
      expect(eventData.ticketsSold).to.equal(0);
    });
  });
  
  describe("Ticket Minting", function () {
    it("Should mint a ticket successfully", async function () {
      const seatInfo = "A1";
      
      await ticketNFT.connect(organizer).mintTicket(
        buyer.address,
        eventId,
        seatInfo,
        TICKET_PRICE,
        TICKET_URI
      );
      
      // Check ownership
      expect(await ticketNFT.balanceOf(buyer.address)).to.equal(1);
      
      // Check ticket data
      const tokenId = 1;
      const ticketData = await ticketNFT.tickets(tokenId);
      
      expect(ticketData.eventId).to.equal(eventId);
      expect(ticketData.seatInfo).to.equal(seatInfo);
      expect(ticketData.price).to.equal(TICKET_PRICE);
      expect(ticketData.isUsed).to.be.false;
    });
    
    it("Should prevent duplicate seats for reserved seating", async function () {
      const seatInfo = "A1";
      
      await ticketNFT.connect(organizer).mintTicket(
        buyer.address,
        eventId,
        seatInfo,
        TICKET_PRICE,
        TICKET_URI
      );
      
      // Try to mint the same seat again
      await expect(
        ticketNFT.connect(organizer).mintTicket(
          addrs[0].address,
          eventId,
          seatInfo,
          TICKET_PRICE,
          TICKET_URI
        )
      ).to.be.revertedWith("Seat is already taken");
    });
  });
  
  describe("Ticket Usage and Verification", function () {
    it("Should mark a ticket as used", async function () {
      // Mint a ticket
      await ticketNFT.connect(organizer).mintTicket(
        buyer.address,
        eventId,
        "A1",
        TICKET_PRICE,
        TICKET_URI
      );
      
      const tokenId = 1;
      
      // Use the ticket
      await ticketNFT.connect(buyer).useTicket(tokenId);
      
      // Check the ticket is marked as used
      const ticketData = await ticketNFT.tickets(tokenId);
      expect(ticketData.isUsed).to.be.true;
    });
    
    it("Should verify valid tickets", async function () {
      // Mint a ticket
      await ticketNFT.connect(organizer).mintTicket(
        buyer.address,
        eventId,
        "A1",
        TICKET_PRICE,
        TICKET_URI
      );
      
      const tokenId = 1;
      
      // Verify the ticket
      expect(await ticketNFT.verifyTicket(tokenId, buyer.address)).to.be.true;
      expect(await ticketNFT.verifyTicket(tokenId, addrs[0].address)).to.be.false;
    });
  });
});