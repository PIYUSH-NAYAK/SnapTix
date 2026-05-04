import { ethers } from 'ethers';
import { getConnectedAccount } from '../core/provider';
import { getTicketNFT } from '../core/contracts';

export const buyTicket = async (eventId, seatInfo, price, onStep = () => {}) => {
  const ticketNFT = await getTicketNFT();
  const account = await getConnectedAccount();
  const eventIdNum = typeof eventId === 'string' ? parseInt(eventId) : eventId;
  const metadataUri = `https://snaptix.example/metadata/${eventIdNum}-${seatInfo}`;

  // Check if the on-chain event exists and is active
  let onChainEventId = eventIdNum;
  let eventExists = false;

  try {
    const ev = await ticketNFT.events(eventIdNum);
    const nowSec = Math.floor(Date.now() / 1000);
    // Must exist, be active, and still be before start time (minting window)
    eventExists =
      ev.organizer !== ethers.ZeroAddress &&
      ev.isActive &&
      Number(ev.startTime) > nowSec;
  } catch {}

  if (!eventExists) {
    onStep("Creating event on-chain...");
    console.log("Event not on-chain, creating it...");
    const currentTime = Math.floor(Date.now() / 1000);
    const createTx = await ticketNFT.createEvent(
      `Event ${eventIdNum}`,
      currentTime + 600,             // start 10 min from now (enough for mint tx)
      currentTime + 365 * 24 * 3600, // end 1 year from now
      "SnapTix Venue",
      1000,
      false,
      { gasLimit: 500000 }
    );
    const createReceipt = await createTx.wait();

    // Parse EventCreated log to get the real on-chain event ID
    const eventCreatedTopic = ticketNFT.interface.getEvent("EventCreated").topicHash;
    const log = createReceipt.logs.find((l) => l.topics[0] === eventCreatedTopic);
    if (log) {
      const parsed = ticketNFT.interface.parseLog(log);
      onChainEventId = Number(parsed.args.eventId);
      console.log("Created on-chain event ID:", onChainEventId);
    }
  }

  console.log(`Minting ticket for on-chain eventId=${onChainEventId}, seat=${seatInfo}`);
  const mintTx = await ticketNFT.mintTicket(
    account,
    onChainEventId,
    seatInfo,
    price,
    metadataUri,
    { gasLimit: 500000 }
  );

  console.log("Mint tx submitted:", mintTx.hash);
  await mintTx.wait();
  console.log("Ticket minted successfully");
  return mintTx.hash;
};

export const buyTicketDirect = buyTicket;
