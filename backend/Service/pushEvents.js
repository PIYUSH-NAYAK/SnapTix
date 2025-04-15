// Service/pushEvents.js

const Fluvio = require('@fluvio/client').default;  // <-- Change this line

const TOPIC_NAME = "events";
const PARTITION = 0;

async function pushEvents() {
  try {
    console.log("Connecting to Fluvio...");
    const fluvio = await Fluvio.connect();
    console.log("Connected to Fluvio successfully");

    const producer = await fluvio.topicProducer(TOPIC_NAME);

    const events = [
      {
        id: '1',
        title: 'Coldplay Tour',
        type: 'concert',
        artist: 'Coldplay',
        genre: 'pop/rock',
        date: '2025-05-21',
        time: '8:00 PM',
        location: 'Delhi',
        price: '₹3,000 - ₹15,000',
        description: 'Coldplay returns to India on their 2025 world tour',
        image: 'https://example.com/coldplay.jpg',
        tags: ['music', 'pop', 'rock', 'international']
      },
      {
        id: '7',
        title: 'Sunburn Festival',
        type: 'festival',
        artist: 'Various Artists',
        genre: 'electronic',
        date: '2025-12-28',
        time: '4:00 PM',
        location: 'Goa',
        price: '₹4,000 - ₹12,000',
        description: 'Asia\'s biggest electronic dance music festival',
        image: 'https://example.com/sunburn.jpg',
        tags: ['music', 'festival', 'edm']
      }
    ];

    for (const event of events) {
      await producer.sendRecord(JSON.stringify(event), PARTITION);
      console.log(`✅ Event sent: ${event.title}`);
    }

    console.log(`✅ Successfully pushed ${events.length} events to Fluvio`);
  } catch (error) {
    console.error("❌ Error pushing events to Fluvio:", error);
  }
}

pushEvents();