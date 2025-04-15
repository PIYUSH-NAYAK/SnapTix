const Fluvio = require('@fluvio/client').default;
const { eventCache } = require('./eventCache');
const { eventsList } = require('./eventData');

async function startFluvioConsumer() {
  try {
    console.log("Connecting to Fluvio...");
    const fluvio = await Fluvio.connect();
    console.log("Connected to Fluvio successfully");

    // Get the consumer
    const consumer = await fluvio.partitionConsumer('events', 0);
    console.log('🟢 Fluvio consumer created for topic "events"');

    // Load initial events from the beginning
    try {
      console.log('Loading events from beginning of topic...');
      
      // Get all records from the beginning
      const records = await consumer.fetch({ maxBytes: 100000 });
      console.log(`Fetched ${records.length} records from Fluvio`);
      
      // Process each record
      for (const record of records) {
        try {
          const valueString = record.valueString();
          console.log(`Raw record received: ${valueString}`);
          
          const event = JSON.parse(valueString);
          console.log(`📥 Processing event: ${event.title || event.name}`);
          
          eventCache.push(event);
        } catch (parseError) {
          console.error("❌ Error parsing record:", parseError);
        }
      }
      
      console.log(`➕ Added ${records.length} events from Fluvio`);
      
      // Success! Return the consumer
      return consumer;
    } catch (fetchErr) {
      console.error('❌ Error fetching records:', fetchErr);
      throw fetchErr;
    }
  } catch (err) {
    console.error('❌ Error in Fluvio setup or fetch:', err);
    console.log('⚠️ Using mock event data for development');
    
    // Import mock events from separate file
    eventsList.forEach(event => eventCache.push(event));
    console.log(`➕ Added ${eventsList.length} mock events to cache`);
    
    return null;
  }
}

module.exports = startFluvioConsumer;