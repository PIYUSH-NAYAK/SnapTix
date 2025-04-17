const Fluvio = require('@fluvio/client').default;
const { eventCache } = require('./eventCache');
const { eventsList } = require('./eventData');

async function startFluvioConsumer() {
  // For development, you can set this environment variable to skip Fluvio entirely
  if (process.env.USE_MOCK_DATA === 'true') {
    console.log('🔄 Using mock event data (configured via environment)');
    eventsList.forEach(event => eventCache.push(event));
    console.log(`➕ Added ${eventsList.length} mock events to cache`);
    return null;
  }

  try {
    console.log("Connecting to Fluvio...");
    
    // Connect to fluvio - simpler approach matching documentation
    const fluvio = await Fluvio.connect();
    console.log("Connected to Fluvio successfully");
    
    // Create a consumer for the events topic
    const consumer = await fluvio.consumer('events');
    console.log('🟢 Fluvio consumer created for topic "events"');
    
    try {
      // Use the documented approach for consuming data (-B flag in CLI = from beginning)
      console.log('Loading events from beginning of topic...');
      
      // This matches the simpler API from the documentation
      const records = await consumer.fetch({ autoCommit: true, fromBeginning: true });
      
      console.log(`Fetched ${records?.length || 0} records from Fluvio`);
      
      if (records && records.length > 0) {
        for (const record of records) {
          try {
            // Process each record as string and parse JSON
            const valueString = record.value().toString();
            console.log(`Raw record received: ${valueString}`);
            
            const event = JSON.parse(valueString);
            console.log(`📥 Processing event: ${event.title || event.name || 'Unknown'}`);
            
            eventCache.push(event);
          } catch (parseError) {
            console.error("❌ Error parsing record:", parseError);
          }
        }
        
        console.log(`➕ Added ${records.length} events from Fluvio`);
      } else {
        console.log('No records found in Fluvio topic, using mock data');
        throw new Error('No records found in topic');
      }
      
      return consumer;
    } catch (fetchErr) {
      console.error('❌ Error fetching records:', fetchErr);
      throw fetchErr;
    }
  } catch (err) {
    console.error('❌ Error in Fluvio setup or fetch:', err);
    console.log('⚠️ Using mock event data for development');
    
    eventsList.forEach(event => eventCache.push(event));
    console.log(`➕ Added ${eventsList.length} mock events to cache`);
    
    return null;
  }
}

module.exports = startFluvioConsumer;