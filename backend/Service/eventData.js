const eventsList = [
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
    // Change this line:
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80', // Added comma here
    tags: ['music', 'pop', 'rock', 'international']
  },
  {
    id: '2',
    title: 'AR Rahman Live',
    type: 'concert',
    artist: 'AR Rahman',
    genre: 'indian classical/fusion',
    date: '2025-06-15',
    time: '7:30 PM',
    location: 'Mumbai',
    price: '₹2,000 - ₹10,000',
    description: 'An evening of musical magic with the Mozart of Madras',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    tags: ['music', 'indian', 'bollywood']
  },
  // {
  //   id: '3',
  //   title: 'IPL Final 2025',
  //   type: 'sports',
  //   genre: 'cricket',
  //   date: '2025-05-30',
  //   time: '7:00 PM',
  //   location: 'Ahmedabad',
  //   price: '₹1,500 - ₹25,000',
  //   description: 'The grand finale of IPL 2025',
  //   image: 'https://images.app.goo.gl/J8o6yZvYMGe2uLoj8',
  //   tags: ['sports', 'cricket', 'ipl']
  // },
  // {
  //   id: '4',
  //   title: 'Diljit Dosanjh - Dil-Luminati Tour',
  //   type: 'concert',
  //   artist: 'Diljit Dosanjh',
  //   genre: 'punjabi/pop',
  //   date: '2025-07-10',
  //   time: '7:00 PM',
  //   location: 'Bengaluru',
  //   price: '₹2,500 - ₹12,000',
  //   description: 'Diljit brings his electrifying Dil-Luminati tour to India',
  //   image: 'https://images.app.goo.gl/3xzjdPyFZDSAvLJ89',
  //   tags: ['music', 'punjabi', 'bollywood']
  // },
  // {
  //   id: '5',
  //   title: 'Arijit Singh Live in Concert',
  //   type: 'concert',
  //   artist: 'Arijit Singh',
  //   genre: 'bollywood',
  //   date: '2025-08-05',
  //   time: '7:00 PM',
  //   location: 'Mumbai',
  //   price: '₹2,000 - ₹10,000',
  //   description: 'Experience the magic of Arijit Singh\'s soulful voice live in concert',
  //   image: 'https://images.app.goo.gl/YpYQPYJPoa2WzcJF7',
  //   tags: ['music', 'bollywood', 'vocal']
  // },
  // Uncomment and update these events with proper image URLs
{
  id: '3',
  title: 'IPL Final 2025',
  type: 'sports',
  genre: 'cricket',
  date: '2025-05-30',
  time: '7:00 PM',
  location: 'Ahmedabad',
  price: '₹1,500 - ₹25,000',
  description: 'The grand finale of IPL 2025',
  image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
  tags: ['sports', 'cricket', 'ipl']
},
// Add this event before the closing square bracket and module.exports
{
  id: '4',
  title: 'Techfest 2025',
  type: 'expo',
  artist: 'Multiple Tech Speakers',
  genre: 'technology',
  date: '2025-09-05',
  time: '9:00 AM',
  location: 'Bengaluru',
  price: '₹2500 - ₹15000',
  description: 'India\'s largest technology expo featuring latest innovations, workshops and tech talks',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech',
    'innovation'
  ]
},
{
  id: '5',
  title: 'Clash - Ahmedabad',
  type: 'expo',
  artist: 'Rahul Subramanian',
  genre: 'electronic',
  date: '2025-10-09',
  time: '6:00 PM',
  location: 'Ahmedabad',
  price: '₹1150 - ₹8618',
  description: 'Clash - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},


{
  id: '6',
  title: 'India vs Australia ',
  type: 'sports',
  genre: 'cricket',
  date: '2025-09-12',
  time: '9:30 AM',
  location: 'Chennai',
  price: '₹500 - ₹5,000',
  description: 'Day 1 of the first test match between India and Australia',
  image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
  tags: ['sports', 'cricket', 'international']
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
  image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  tags: ['music', 'festival', 'edm']
},
// Add after event #7 (Sunburn Festival) and before event #41 (Extravaganza - Jaipur)
{
  id: '8',
  title: 'Festival - Mumbai',
  type: 'concert',
  artist: 'Coldplay',
  genre: 'punjabi',
  date: '2026-01-26',
  time: '4:00 PM',
  location: 'Mumbai',
  price: '₹1720 - ₹3701',
  description: 'Festival - Mumbai happening live in Mumbai',
  image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '9',
  title: 'Festival - Delhi',
  type: 'concert',
  artist: 'Virat Kohli',
  genre: 'punjabi',
  date: '2026-04-18',
  time: '12:00 PM',
  location: 'Delhi',
  price: '₹621 - ₹7134',
  description: 'Festival - Delhi happening live in Delhi',
  image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},


{
  id: '10',
  title: 'Experience - Kolkata',
  type: 'concert',
  artist: 'Film Stars',
  genre: 'kabaddi',
  date: '2025-08-30',
  time: '12:00 PM',
  location: 'Kolkata',
  price: '₹1376 - ₹6832',
  description: 'Experience - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1564585222527-c2777a5bc6cb?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '11',
  title: 'Extravaganza - Bengaluru',
  type: 'standup',
  artist: 'AP Dhillon',
  genre: 'pop/rock',
  date: '2025-08-02',
  time: '12:00 PM',
  location: 'Bengaluru',
  price: '₹1242 - ₹10298',
  description: 'Extravaganza - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
{
  id: '12',
  title: 'Live - Delhi',
  type: 'sports',
  artist: 'Various Artists',
  genre: 'electronic',
  date: '2025-07-24',
  time: '8:00 PM',
  location: 'Delhi',
  price: '₹1466 - ₹9567',
  description: 'Live - Delhi happening live in Delhi',
  image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '13',
  title: 'Experience - Ahmedabad',
  type: 'expo',
  artist: 'Neha Kakkar',
  genre: 'punjabi',
  date: '2025-08-28',
  time: '6:00 PM',
  location: 'Ahmedabad',
  price: '₹1557 - ₹9200',
  description: 'Experience - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '14',
  title: 'Extravaganza - Jaipur',
  type: 'festival',
  artist: 'Arijit Singh',
  genre: 'pop/rock',
  date: '2026-04-08',
  time: '8:00 PM',
  location: 'Jaipur',
  price: '₹1268 - ₹11474',
  description: 'Extravaganza - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '15',
  title: 'Live - Jaipur',
  type: 'expo',
  artist: 'Film Stars',
  genre: 'standup',
  date: '2026-03-16',
  time: '6:00 PM',
  location: 'Jaipur',
  price: '₹895 - ₹7993',
  description: 'Live - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '16',
  title: 'Experience - Pune',
  type: 'standup',
  artist: 'Various Artists',
  genre: 'electronic',
  date: '2026-04-19',
  time: '6:00 PM',
  location: 'Pune',
  price: '₹601 - ₹9208',
  description: 'Experience - Pune happening live in Pune',
  image: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '17',
  title: 'Extravaganza - Pune',
  type: 'screening',
  artist: 'AP Dhillon',
  genre: 'cricket',
  date: '2025-11-13',
  time: '4:00 PM',
  location: 'Pune',
  price: '₹1910 - ₹7269',
  description: 'Extravaganza - Pune happening live in Pune',
  image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '18',
  title: 'Arijit Singh Live',
  type: 'concert',
  artist: 'Arijit Singh',
  genre: 'bollywood',
  date: '2025-08-05',
  time: '7:00 PM',
  location: 'Mumbai',
  price: '₹2,000 - ₹10,000',
  description: 'Experience the magic of Arijit Singh\'s soulful voice live in concert',
  image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  tags: ['music', 'bollywood', 'vocal']
},

{
  id: '19',
  title: 'Live - Bengaluru',
  type: 'sports',
  artist: 'Neha Kakkar',
  genre: 'bollywood',
  date: '2026-04-07',
  time: '12:00 PM',
  location: 'Bengaluru',
  price: '₹806 - ₹10698',
  description: 'Live - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
// Replace the image URL in event with ID 20
{
  id: '20',
  title: 'Clash - Delhi',
  type: 'festival',
  artist: 'Rahul Subramanian',
  genre: 'kabaddi',
  date: '2026-04-02',
  time: '10:00 AM',
  location: 'Delhi',
  price: '₹1383 - ₹8388',
  description: 'Clash - Delhi happening live in Delhi',
  image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},

{
  id: '21',
  title: 'Live - Pune',
  type: 'screening',
  artist: 'Coldplay',
  genre: 'bollywood',
  date: '2025-07-05',
  time: '7:00 PM',
  location: 'Pune',
  price: '₹1183 - ₹14746',
  description: 'Live - Pune happening live in Pune',
  image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '22',
  title: 'Madness - Kolkata',
  type: 'concert',
  artist: 'Virat Kohli',
  genre: 'punjabi',
  date: '2025-07-16',
  time: '10:00 AM',
  location: 'Kolkata',
  price: '₹828 - ₹12079',
  description: 'Madness - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
{
  id: '23',
  title: 'Live - Hyderabad',
  type: 'screening',
  artist: 'Ranveer Singh',
  genre: 'punjabi',
  date: '2025-11-22',
  time: '10:00 AM',
  location: 'Hyderabad',
  price: '₹626 - ₹5458',
  description: 'Live - Hyderabad happening live in Hyderabad',
  image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '24',
  title: 'Experience - Chennai',
  type: 'expo',
  artist: 'Prateek Kuhad',
  genre: 'kabaddi',
  date: '2026-01-14',
  time: '4:00 PM',
  location: 'Chennai',
  price: '₹1548 - ₹3560',
  description: 'Experience - Chennai happening live in Chennai',
  image: 'https://images.unsplash.com/photo-1550305080-4e029753abcf?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '25',
  title: 'Extravaganza - Chennai',
  type: 'expo',
  artist: 'Arijit Singh',
  genre: 'electronic',
  date: '2025-06-24',
  time: '10:00 AM',
  location: 'Chennai',
  price: '₹410 - ₹5871',
  description: 'Extravaganza - Chennai happening live in Chennai',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '26',
  title: 'Madness - Jaipur',
  type: 'expo',
  artist: 'Arijit Singh',
  genre: 'bollywood',
  date: '2026-02-23',
  time: '4:00 PM',
  location: 'Jaipur',
  price: '₹1433 - ₹5704',
  description: 'Madness - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1560523159-6b681a1e1852?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '27',
  title: 'Experience - Bengaluru',
  type: 'concert',
  artist: 'Rahul Subramanian',
  genre: 'kabaddi',
  date: '2026-04-13',
  time: '7:00 PM',
  location: 'Bengaluru',
  price: '₹1743 - ₹13086',
  description: 'Experience - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '28',
  title: 'Tour - Bengaluru',
  type: 'standup',
  artist: 'Coldplay',
  genre: 'kabaddi',
  date: '2025-12-12',
  time: '8:00 PM',
  location: 'Bengaluru',
  price: '₹445 - ₹13542',
  description: 'Tour - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '29',
  title: 'Tour - Hyderabad',
  type: 'festival',
  artist: 'Virat Kohli',
  genre: 'classical',
  date: '2026-04-10',
  time: '12:00 PM',
  location: 'Hyderabad',
  price: '₹1398 - ₹12401',
  description: 'Tour - Hyderabad happening live in Hyderabad',
  image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '30',
  title: 'Tour - Goa',
  type: 'festival',
  artist: 'Coldplay',
  genre: 'pop/rock',
  date: '2025-04-27',
  time: '8:00 PM',
  location: 'Goa',
  price: '₹1880 - ₹9290',
  description: 'Tour - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '31',
  title: 'Experience - Goa',
  type: 'screening',
  artist: 'Ranveer Singh',
  genre: 'cricket',
  date: '2026-01-07',
  time: '6:00 PM',
  location: 'Goa',
  price: '₹416 - ₹8244',
  description: 'Experience - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '32',
  title: 'Festival - Kolkata',
  type: 'concert',
  artist: 'Virat Kohli',
  genre: 'standup',
  date: '2026-04-15',
  time: '12:00 PM',
  location: 'Kolkata',
  price: '₹1722 - ₹3051',
  description: 'Festival - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},

{
  id: '33',
  title: 'Madness - Kolkata',
  type: 'screening',
  artist: 'Ranveer Singh',
  genre: 'pop/rock',
  date: '2025-12-10',
  time: '4:00 PM',
  location: 'Kolkata',
  price: '₹1493 - ₹11643',
  description: 'Madness - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
{
  id: '34',
  title: 'Tour - Goa',
  type: 'standup',
  artist: 'Arijit Singh',
  genre: 'pop/rock',
  date: '2025-07-26',
  time: '4:00 PM',
  location: 'Goa',
  price: '₹613 - ₹3508',
  description: 'Tour - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '35',
  title: 'Live - Goa',
  type: 'concert',
  artist: 'AP Dhillon',
  genre: 'kabaddi',
  date: '2025-08-28',
  time: '12:00 PM',
  location: 'Goa',
  price: '₹1214 - ₹4798',
  description: 'Live - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '36',
  title: 'Clash - Kolkata',
  type: 'concert',
  artist: 'Coldplay',
  genre: 'cricket',
  date: '2025-06-03',
  time: '6:00 PM',
  location: 'Kolkata',
  price: '₹833 - ₹5016',
  description: 'Clash - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '37',
  title: 'Festival - Pune',
  type: 'standup',
  artist: 'Arijit Singh',
  genre: 'cricket',
  date: '2026-02-13',
  time: '10:00 AM',
  location: 'Pune',
  price: '₹982 - ₹9239',
  description: 'Festival - Pune happening live in Pune',
  image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '38',
  title: 'Live - Hyderabad',
  type: 'screening',
  artist: 'Arijit Singh',
  genre: 'electronic',
  date: '2025-05-10',
  time: '4:00 PM',
  location: 'Hyderabad',
  price: '₹381 - ₹9157',
  description: 'Live - Hyderabad happening live in Hyderabad',
  image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '39',
  title: 'Festival - Chennai',
  type: 'festival',
  artist: 'Coldplay',
  genre: 'pop/rock',
  date: '2025-08-07',
  time: '8:00 PM',
  location: 'Chennai',
  price: '₹1793 - ₹12116',
  description: 'Festival - Chennai happening live in Chennai',
  image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '40',
  title: 'Live - Delhi',
  type: 'screening',
  artist: 'AP Dhillon',
  genre: 'standup',
  date: '2025-10-16',
  time: '12:00 PM',
  location: 'Delhi',
  price: '₹808 - ₹7228',
  description: 'Live - Delhi happening live in Delhi',
  image: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},

  
  
// Replace the existing events 41-60 with these updated ones
{
  id: '41',
  title: 'Extravaganza - Jaipur',
  type: 'standup',
  artist: 'Film Stars',
  genre: 'bollywood',
  date: '2025-10-27',
  time: '10:00 AM',
  location: 'Jaipur',
  price: '₹752 - ₹10757',
  description: 'Extravaganza - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '42',
  title: 'Festival - Hyderabad',
  type: 'screening',
  artist: 'Coldplay',
  genre: 'electronic',
  date: '2025-09-06',
  time: '4:00 PM',
  location: 'Hyderabad',
  price: '₹1604 - ₹8041',
  description: 'Festival - Hyderabad happening live in Hyderabad',
  image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '43',
  title: 'Tour - Ahmedabad',
  type: 'expo',
  artist: 'Coldplay',
  genre: 'bollywood',
  date: '2025-07-14',
  time: '8:00 PM',
  location: 'Ahmedabad',
  price: '₹1031 - ₹12985',
  description: 'Tour - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1560523159-6b681a1e1852?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '44',
  title: 'Tour - Mumbai',
  type: 'sports',
  artist: 'AP Dhillon',
  genre: 'classical',
  date: '2026-03-07',
  time: '4:00 PM',
  location: 'Mumbai',
  price: '₹671 - ₹5972',
  description: 'Tour - Mumbai happening live in Mumbai',
  image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '45',
  title: 'Live - Hyderabad',
  type: 'sports',
  artist: 'Prateek Kuhad',
  genre: 'punjabi',
  date: '2025-05-24',
  time: '8:00 PM',
  location: 'Hyderabad',
  price: '₹674 - ₹4448',
  description: 'Live - Hyderabad happening live in Hyderabad',
  image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '46',
  title: 'Festival - Jaipur',
  type: 'concert',
  artist: 'Film Stars',
  genre: 'bollywood',
  date: '2025-07-26',
  time: '10:00 AM',
  location: 'Jaipur',
  price: '₹1886 - ₹14948',
  description: 'Festival - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '47',
  title: 'Madness - Delhi',
  type: 'concert',
  artist: 'Rahul Subramanian',
  genre: 'bollywood',
  date: '2026-01-24',
  time: '12:00 PM',
  location: 'Delhi',
  price: '₹1823 - ₹3835',
  description: 'Madness - Delhi happening live in Delhi',
  image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '48',
  title: 'Experience - Bengaluru',
  type: 'screening',
  artist: 'Prateek Kuhad',
  genre: 'bollywood',
  date: '2026-01-17',
  time: '7:00 PM',
  location: 'Bengaluru',
  price: '₹1056 - ₹3083',
  description: 'Experience - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '49',
  title: 'Madness - Kolkata',
  type: 'expo',
  artist: 'Coldplay',
  genre: 'cricket',
  date: '2026-04-02',
  time: '10:00 AM',
  location: 'Kolkata',
  price: '₹398 - ₹12555',
  description: 'Madness - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1550305080-4e029753abcf?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '50',
  title: 'Extravaganza - Jaipur',
  type: 'screening',
  artist: 'Coldplay',
  genre: 'standup',
  date: '2026-01-09',
  time: '7:00 PM',
  location: 'Jaipur',
  price: '₹372 - ₹4424',
  description: 'Extravaganza - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '51',
  title: 'Tour - Goa',
  type: 'festival',
  artist: 'Virat Kohli',
  genre: 'bollywood',
  date: '2025-04-29',
  time: '10:00 AM',
  location: 'Goa',
  price: '₹1568 - ₹9997',
  description: 'Tour - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '52',
  title: 'Extravaganza - Chennai',
  type: 'screening',
  artist: 'Various Artists',
  genre: 'punjabi',
  date: '2026-01-17',
  time: '6:00 PM',
  location: 'Chennai',
  price: '₹1242 - ₹13124',
  description: 'Extravaganza - Chennai happening live in Chennai',
  image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '53',
  title: 'Festival - Ahmedabad',
  type: 'concert',
  artist: 'AP Dhillon',
  genre: 'classical',
  date: '2025-10-07',
  time: '10:00 AM',
  location: 'Ahmedabad',
  price: '₹1326 - ₹10763',
  description: 'Festival - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '54',
  title: 'Extravaganza - Mumbai',
  type: 'concert',
  artist: 'Prateek Kuhad',
  genre: 'cricket',
  date: '2025-12-14',
  time: '7:00 PM',
  location: 'Mumbai',
  price: '₹1694 - ₹11062',
  description: 'Extravaganza - Mumbai happening live in Mumbai',
  image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
{
  id: '55',
  title: 'Tour - Jaipur',
  type: 'standup',
  artist: 'Coldplay',
  genre: 'pop/rock',
  date: '2026-01-08',
  time: '8:00 PM',
  location: 'Jaipur',
  price: '₹807 - ₹13585',
  description: 'Tour - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '56',
  title: 'Tour - Jaipur',
  type: 'concert',
  artist: 'Arijit Singh',
  genre: 'kabaddi',
  date: '2025-12-05',
  time: '7:00 PM',
  location: 'Jaipur',
  price: '₹999 - ₹8753',
  description: 'Tour - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '57',
  title: 'Experience - Ahmedabad',
  type: 'screening',
  artist: 'Various Artists',
  genre: 'punjabi',
  date: '2025-05-03',
  time: '10:00 AM',
  location: 'Ahmedabad',
  price: '₹555 - ₹4828',
  description: 'Experience - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '58',
  title: 'Festival - Pune',
  type: 'expo',
  artist: 'Neha Kakkar',
  genre: 'electronic',
  date: '2025-08-19',
  time: '12:00 PM',
  location: 'Pune',
  price: '₹1329 - ₹12658',
  description: 'Festival - Pune happening live in Pune',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '59',
  title: 'Extravaganza - Ahmedabad',
  type: 'concert',
  artist: 'Virat Kohli',
  genre: 'kabaddi',
  date: '2025-08-18',
  time: '4:00 PM',
  location: 'Ahmedabad',
  price: '₹1185 - ₹5014',
  description: 'Extravaganza - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
{
  id: '60',
  title: 'Tour - Hyderabad',
  type: 'festival',
  artist: 'Film Stars',
  genre: 'classical',
  date: '2025-06-02',
  time: '10:00 AM',
  location: 'Hyderabad',
  price: '₹1263 - ₹5908',
  description: 'Tour - Hyderabad happening live in Hyderabad',
  image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},

// Replace the existing events 61-75 with these updated ones
{
  id: '61',
  title: 'Live - Jaipur',
  type: 'screening',
  artist: 'Ranveer Singh',
  genre: 'punjabi',
  date: '2026-04-19',
  time: '4:00 PM',
  location: 'Jaipur',
  price: '₹757 - ₹10633',
  description: 'Live - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '62',
  title: 'Festival - Chennai',
  type: 'concert',
  artist: 'AP Dhillon',
  genre: 'cricket',
  date: '2026-04-02',
  time: '6:00 PM',
  location: 'Chennai',
  price: '₹941 - ₹3001',
  description: 'Festival - Chennai happening live in Chennai',
  image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '63',
  title: 'Tour - Jaipur',
  type: 'festival',
  artist: 'Film Stars',
  genre: 'pop/rock',
  date: '2025-11-29',
  time: '12:00 PM',
  location: 'Jaipur',
  price: '₹431 - ₹12509',
  description: 'Tour - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '64',
  title: 'Experience - Bengaluru',
  type: 'standup',
  artist: 'AP Dhillon',
  genre: 'electronic',
  date: '2026-03-16',
  time: '4:00 PM',
  location: 'Bengaluru',
  price: '₹994 - ₹6307',
  description: 'Experience - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '65',
  title: 'Madness - Kolkata',
  type: 'sports',
  artist: 'Virat Kohli',
  genre: 'electronic',
  date: '2025-08-18',
  time: '4:00 PM',
  location: 'Kolkata',
  price: '₹820 - ₹3011',
  description: 'Madness - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '66',
  title: 'Festival - Jaipur',
  type: 'expo',
  artist: 'Ranveer Singh',
  genre: 'kabaddi',
  date: '2025-09-15',
  time: '10:00 AM',
  location: 'Jaipur',
  price: '₹1302 - ₹13371',
  description: 'Festival - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
{
  id: '67',
  title: 'Tour - Ahmedabad',
  type: 'festival',
  artist: 'Arijit Singh',
  genre: 'punjabi',
  date: '2026-03-09',
  time: '7:00 PM',
  location: 'Ahmedabad',
  price: '₹436 - ₹7130',
  description: 'Tour - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '68',
  title: 'Madness - Kolkata',
  type: 'standup',
  artist: 'Virat Kohli',
  genre: 'punjabi',
  date: '2025-07-19',
  time: '6:00 PM',
  location: 'Kolkata',
  price: '₹1883 - ₹7315',
  description: 'Madness - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '69',
  title: 'Experience - Pune',
  type: 'screening',
  artist: 'Various Artists',
  genre: 'cricket',
  date: '2025-08-08',
  time: '8:00 PM',
  location: 'Pune',
  price: '₹1156 - ₹11823',
  description: 'Experience - Pune happening live in Pune',
  image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '70',
  title: 'Experience - Bengaluru',
  type: 'sports',
  artist: 'Arijit Singh',
  genre: 'cricket',
  date: '2026-04-15',
  time: '7:00 PM',
  location: 'Bengaluru',
  price: '₹1790 - ₹10485',
  description: 'Experience - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '71',
  title: 'Tour - Kolkata',
  type: 'standup',
  artist: 'Coldplay',
  genre: 'electronic',
  date: '2026-01-19',
  time: '10:00 AM',
  location: 'Kolkata',
  price: '₹555 - ₹7688',
  description: 'Tour - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '72',
  title: 'Tour - Kolkata',
  type: 'expo',
  artist: 'Film Stars',
  genre: 'classical',
  date: '2025-05-23',
  time: '6:00 PM',
  location: 'Kolkata',
  price: '₹1329 - ₹14759',
  description: 'Tour - Kolkata happening live in Kolkata',
  image: 'https://images.unsplash.com/photo-1560523159-6b681a1e1852?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '73',
  title: 'Clash - Bengaluru',
  type: 'festival',
  artist: 'Film Stars',
  genre: 'bollywood',
  date: '2025-08-09',
  time: '8:00 PM',
  location: 'Bengaluru',
  price: '₹1122 - ₹5199',
  description: 'Clash - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '74',
  title: 'Extravaganza - Bengaluru',
  type: 'sports',
  artist: 'Neha Kakkar',
  genre: 'bollywood',
  date: '2026-01-13',
  time: '7:00 PM',
  location: 'Bengaluru',
  price: '₹2000 - ₹7002',
  description: 'Extravaganza - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '75',
  title: 'Clash - Hyderabad',
  type: 'expo',
  artist: 'Ranveer Singh',
  genre: 'kabaddi',
  date: '2025-06-22',
  time: '10:00 AM',
  location: 'Hyderabad',
  price: '₹563 - ₹11515',
  description: 'Clash - Hyderabad happening live in Hyderabad',
  image: 'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
  // Replace or add events 76-107 with these updated ones
{
  id: '76',
  title: 'Madness - Goa',
  type: 'standup',
  artist: 'Prateek Kuhad',
  genre: 'punjabi',
  date: '2025-12-18',
  time: '4:00 PM',
  location: 'Goa',
  price: '₹738 - ₹6724',
  description: 'Madness - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '77',
  title: 'Clash - Chennai',
  type: 'sports',
  artist: 'AP Dhillon',
  genre: 'kabaddi',
  date: '2025-09-14',
  time: '4:00 PM',
  location: 'Chennai',
  price: '₹1626 - ₹3178',
  description: 'Clash - Chennai happening live in Chennai',
  image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '78',
  title: 'Live - Hyderabad',
  type: 'concert',
  artist: 'Ranveer Singh',
  genre: 'electronic',
  date: '2025-09-28',
  time: '10:00 AM',
  location: 'Hyderabad',
  price: '₹916 - ₹9587',
  description: 'Live - Hyderabad happening live in Hyderabad',
  image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '79',
  title: 'Clash - Jaipur',
  type: 'concert',
  artist: 'Arijit Singh',
  genre: 'electronic',
  date: '2025-11-18',
  time: '7:00 PM',
  location: 'Jaipur',
  price: '₹1896 - ₹12143',
  description: 'Clash - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '80',
  title: 'Extravaganza - Bengaluru',
  type: 'concert',
  artist: 'Virat Kohli',
  genre: 'bollywood',
  date: '2025-10-29',
  time: '8:00 PM',
  location: 'Bengaluru',
  price: '₹1722 - ₹14618',
  description: 'Extravaganza - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '81',
  title: 'Festival - Goa',
  type: 'expo',
  artist: 'Arijit Singh',
  genre: 'standup',
  date: '2026-01-28',
  time: '12:00 PM',
  location: 'Goa',
  price: '₹1433 - ₹9058',
  description: 'Festival - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1560523159-6b681a1e1852?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '82',
  title: 'Tour - Jaipur',
  type: 'festival',
  artist: 'Rahul Subramanian',
  genre: 'punjabi',
  date: '2025-08-14',
  time: '12:00 PM',
  location: 'Jaipur',
  price: '₹795 - ₹9265',
  description: 'Tour - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
{
  id: '83',
  title: 'Festival - Delhi',
  type: 'expo',
  artist: 'AP Dhillon',
  genre: 'bollywood',
  date: '2025-06-19',
  time: '10:00 AM',
  location: 'Delhi',
  price: '₹1073 - ₹3085',
  description: 'Festival - Delhi happening live in Delhi',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '84',
  title: 'Tour - Chennai',
  type: 'standup',
  artist: 'Various Artists',
  genre: 'punjabi',
  date: '2026-03-25',
  time: '10:00 AM',
  location: 'Chennai',
  price: '₹973 - ₹10246',
  description: 'Tour - Chennai happening live in Chennai',
  image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '85',
  title: 'Live - Bengaluru',
  type: 'festival',
  artist: 'Neha Kakkar',
  genre: 'classical',
  date: '2025-06-19',
  time: '7:00 PM',
  location: 'Bengaluru',
  price: '₹1915 - ₹3583',
  description: 'Live - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
{
  id: '86',
  title: 'Experience - Goa',
  type: 'expo',
  artist: 'Prateek Kuhad',
  genre: 'punjabi',
  date: '2025-10-02',
  time: '10:00 AM',
  location: 'Goa',
  price: '₹825 - ₹12860',
  description: 'Experience - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1593642532454-e138e28a63f4?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '87',
  title: 'Madness - Bengaluru',
  type: 'screening',
  artist: 'Arijit Singh',
  genre: 'electronic',
  date: '2025-07-03',
  time: '7:00 PM',
  location: 'Bengaluru',
  price: '₹986 - ₹14869',
  description: 'Madness - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '88',
  title: 'Live - Goa',
  type: 'festival',
  artist: 'Prateek Kuhad',
  genre: 'pop/rock',
  date: '2026-02-25',
  time: '12:00 PM',
  location: 'Goa',
  price: '₹1299 - ₹3181',
  description: 'Live - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '89',
  title: 'Tour - Delhi',
  type: 'standup',
  artist: 'Coldplay',
  genre: 'cricket',
  date: '2025-06-05',
  time: '8:00 PM',
  location: 'Delhi',
  price: '₹1311 - ₹7317',
  description: 'Tour - Delhi happening live in Delhi',
  image: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '90',
  title: 'Live - Jaipur',
  type: 'standup',
  artist: 'Prateek Kuhad',
  genre: 'pop/rock',
  date: '2025-04-24',
  time: '12:00 PM',
  location: 'Jaipur',
  price: '₹335 - ₹3804',
  description: 'Live - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1564585222527-c2777a5bc6cb?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '91',
  title: 'Experience - Delhi',
  type: 'concert',
  artist: 'Virat Kohli',
  genre: 'standup',
  date: '2025-07-13',
  time: '10:00 AM',
  location: 'Delhi',
  price: '₹1372 - ₹10945',
  description: 'Experience - Delhi happening live in Delhi',
  image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '92',
  title: 'Live - Pune',
  type: 'concert',
  artist: 'Rahul Subramanian',
  genre: 'electronic',
  date: '2025-05-13',
  time: '12:00 PM',
  location: 'Pune',
  price: '₹1962 - ₹7568',
  description: 'Live - Pune happening live in Pune',
  image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '93',
  title: 'Madness - Pune',
  type: 'concert',
  artist: 'AP Dhillon',
  genre: 'punjabi',
  date: '2025-05-27',
  time: '7:00 PM',
  location: 'Pune',
  price: '₹1609 - ₹3284',
  description: 'Madness - Pune happening live in Pune',
  image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '94',
  title: 'Tour - Goa',
  type: 'sports',
  artist: 'Coldplay',
  genre: 'punjabi',
  date: '2025-05-18',
  time: '7:00 PM',
  location: 'Goa',
  price: '₹918 - ₹6932',
  description: 'Tour - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
{
  id: '95',
  title: 'Experience - Delhi',
  type: 'concert',
  artist: 'Various Artists',
  genre: 'pop/rock',
  date: '2025-05-01',
  time: '6:00 PM',
  location: 'Delhi',
  price: '₹746 - ₹12002',
  description: 'Experience - Delhi happening live in Delhi',
  image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '96',
  title: 'Extravaganza - Pune',
  type: 'screening',
  artist: 'Arijit Singh',
  genre: 'pop/rock',
  date: '2025-11-18',
  time: '12:00 PM',
  location: 'Pune',
  price: '₹1439 - ₹7397',
  description: 'Extravaganza - Pune happening live in Pune',
  image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '97',
  title: 'Experience - Chennai',
  type: 'screening',
  artist: 'Virat Kohli',
  genre: 'cricket',
  date: '2025-09-14',
  time: '7:00 PM',
  location: 'Chennai',
  price: '₹1751 - ₹4804',
  description: 'Experience - Chennai happening live in Chennai',
  image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
  tags: [
    'sports',
    'cricket'
  ]
},
{
  id: '98',
  title: 'Tour - Goa',
  type: 'festival',
  artist: 'Various Artists',
  genre: 'pop/rock',
  date: '2026-02-17',
  time: '4:00 PM',
  location: 'Goa',
  price: '₹1628 - ₹4377',
  description: 'Tour - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '99',
  title: 'Tour - Ahmedabad',
  type: 'screening',
  artist: 'Coldplay',
  genre: 'kabaddi',
  date: '2025-09-09',
  time: '10:00 AM',
  location: 'Ahmedabad',
  price: '₹1488 - ₹13221',
  description: 'Tour - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '100',
  title: 'Clash - Ahmedabad',
  type: 'festival',
  artist: 'Arijit Singh',
  genre: 'pop/rock',
  date: '2025-07-20',
  time: '4:00 PM',
  location: 'Ahmedabad',
  price: '₹1292 - ₹12947',
  description: 'Clash - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '101',
  title: 'Live - Bengaluru',
  type: 'festival',
  artist: 'Virat Kohli',
  genre: 'punjabi',
  date: '2026-02-01',
  time: '4:00 PM',
  location: 'Bengaluru',
  price: '₹1093 - ₹5515',
  description: 'Live - Bengaluru happening live in Bengaluru',
  image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
  tags: [
    'expo',
    'tech'
  ]
},
{
  id: '102',
  title: 'Experience - Ahmedabad',
  type: 'concert',
  artist: 'Arijit Singh',
  genre: 'cricket',
  date: '2025-05-28',
  time: '8:00 PM',
  location: 'Ahmedabad',
  price: '₹588 - ₹9057',
  description: 'Experience - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '103',
  title: 'Madness - Goa',
  type: 'concert',
  artist: 'Coldplay',
  genre: 'bollywood',
  date: '2026-03-21',
  time: '4:00 PM',
  location: 'Goa',
  price: '₹1375 - ₹5960',
  description: 'Madness - Goa happening live in Goa',
  image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
  tags: [
    'festival',
    'edm'
  ]
},
{
  id: '104',
  title: 'Madness - Chennai',
  type: 'screening',
  artist: 'Coldplay',
  genre: 'standup',
  date: '2025-05-25',
  time: '10:00 AM',
  location: 'Chennai',
  price: '₹1739 - ₹6783',
  description: 'Madness - Chennai happening live in Chennai',
  image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '105',
  title: 'Clash - Jaipur',
  type: 'festival',
  artist: 'Various Artists',
  genre: 'cricket',
  date: '2025-05-07',
  time: '4:00 PM',
  location: 'Jaipur',
  price: '₹508 - ₹14178',
  description: 'Clash - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
  tags: [
    'comedy',
    'standup'
  ]
},
{
  id: '106',
  title: 'Live - Ahmedabad',
  type: 'expo',
  artist: 'Various Artists',
  genre: 'electronic',
  date: '2025-12-21',
  time: '7:00 PM',
  location: 'Ahmedabad',
  price: '₹554 - ₹14552',
  description: 'Live - Ahmedabad happening live in Ahmedabad',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  tags: [
    'film',
    'screening'
  ]
},
{
  id: '107',
  title: 'Clash - Jaipur',
  type: 'sports',
  artist: 'Various Artists',
  genre: 'cricket',
  date: '2025-05-27',
  time: '8:00 PM',
  location: 'Jaipur',
  price: '₹1861 - ₹7629',
  description: 'Clash - Jaipur happening live in Jaipur',
  image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'pop'
  ]
},
// Add this event before the closing square bracket and module.exports
{
  id: '108',
  title: 'Festival - Mumbai',
  type: 'concert',
  artist: 'Divine',
  genre: 'rap/hip-hop',
  date: '2025-08-14',
  time: '8:00 PM',
  location: 'Mumbai',
  price: '₹1250 - ₹8500',
  description: 'Experience the best of Indian hip-hop with Divine live in Mumbai',
  image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
  tags: [
    'music',
    'rap',
    'hip-hop'
  ]
},
 
]
module.exports = { eventsList };