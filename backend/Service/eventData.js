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
        image: 'https://example.com/coldplay.jpg',
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
        image: 'https://example.com/ar-rahman.jpg',
        tags: ['music', 'indian', 'bollywood']
      },
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
        image: 'https://example.com/ipl.jpg',
        tags: ['sports', 'cricket', 'ipl']
      },
      {
        id: '4',
        title: 'Diljit Dosanjh - Dil-Luminati Tour',
        type: 'concert',
        artist: 'Diljit Dosanjh',
        genre: 'punjabi/pop',
        date: '2025-07-10',
        time: '7:00 PM',
        location: 'Bengaluru',
        price: '₹2,500 - ₹12,000',
        description: 'Diljit brings his electrifying Dil-Luminati tour to India',
        image: 'https://example.com/diljit.jpg',
        tags: ['music', 'punjabi', 'bollywood']
      },
      {
        id: '5',
        title: 'Arijit Singh Live in Concert',
        type: 'concert',
        artist: 'Arijit Singh',
        genre: 'bollywood',
        date: '2025-08-05',
        time: '7:00 PM',
        location: 'Mumbai',
        price: '₹2,000 - ₹10,000',
        description: 'Experience the magic of Arijit Singh\'s soulful voice live in concert',
        image: 'https://example.com/arijit.jpg',
        tags: ['music', 'bollywood', 'vocal']
      },
      {
        id: '6',
        title: 'India vs Australia Test Match',
        type: 'sports',
        genre: 'cricket',
        date: '2025-09-12',
        time: '9:30 AM',
        location: 'Chennai',
        price: '₹500 - ₹5,000',
        description: 'Day 1 of the first test match between India and Australia',
        image: 'https://example.com/indvsaus.jpg',
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
        image: 'https://example.com/sunburn.jpg',
        tags: ['music', 'festival', 'edm']
      },
    {
      "id": "8",
      "title": "Festival - Mumbai",
      "type": "concert",
      "artist": "Coldplay",
      "genre": "punjabi",
      "date": "2026-01-26",
      "time": "4:00 PM",
      "location": "Mumbai",
      "price": "\u20b91720 - \u20b93701",
      "description": "Festival - Mumbai happening live in Mumbai",
      "image": "https://example.com/event-8.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "9",
      "title": "Clash - Ahmedabad",
      "type": "expo",
      "artist": "Rahul Subramanian",
      "genre": "electronic",
      "date": "2025-10-09",
      "time": "6:00 PM",
      "location": "Ahmedabad",
      "price": "\u20b91150 - \u20b98618",
      "description": "Clash - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-9.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "10",
      "title": "Experience - Kolkata",
      "type": "concert",
      "artist": "Film Stars",
      "genre": "kabaddi",
      "date": "2025-08-30",
      "time": "12:00 PM",
      "location": "Kolkata",
      "price": "\u20b91376 - \u20b96832",
      "description": "Experience - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-10.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "11",
      "title": "Extravaganza - Bengaluru",
      "type": "standup",
      "artist": "AP Dhillon",
      "genre": "pop/rock",
      "date": "2025-08-02",
      "time": "12:00 PM",
      "location": "Bengaluru",
      "price": "\u20b91242 - \u20b910298",
      "description": "Extravaganza - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-11.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "12",
      "title": "Live - Delhi",
      "type": "sports",
      "artist": "Various Artists",
      "genre": "electronic",
      "date": "2025-07-24",
      "time": "8:00 PM",
      "location": "Delhi",
      "price": "\u20b91466 - \u20b99567",
      "description": "Live - Delhi happening live in Delhi",
      "image": "https://example.com/event-12.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "13",
      "title": "Experience - Ahmedabad",
      "type": "expo",
      "artist": "Neha Kakkar",
      "genre": "punjabi",
      "date": "2025-08-28",
      "time": "6:00 PM",
      "location": "Ahmedabad",
      "price": "\u20b91557 - \u20b99200",
      "description": "Experience - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-13.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "14",
      "title": "Extravaganza - Jaipur",
      "type": "festival",
      "artist": "Arijit Singh",
      "genre": "pop/rock",
      "date": "2026-04-08",
      "time": "8:00 PM",
      "location": "Jaipur",
      "price": "\u20b91268 - \u20b911474",
      "description": "Extravaganza - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-14.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "15",
      "title": "Live - Jaipur",
      "type": "expo",
      "artist": "Film Stars",
      "genre": "standup",
      "date": "2026-03-16",
      "time": "6:00 PM",
      "location": "Jaipur",
      "price": "\u20b9895 - \u20b97993",
      "description": "Live - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-15.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "16",
      "title": "Experience - Pune",
      "type": "standup",
      "artist": "Various Artists",
      "genre": "electronic",
      "date": "2026-04-19",
      "time": "6:00 PM",
      "location": "Pune",
      "price": "\u20b9601 - \u20b99208",
      "description": "Experience - Pune happening live in Pune",
      "image": "https://example.com/event-16.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "17",
      "title": "Extravaganza - Pune",
      "type": "screening",
      "artist": "AP Dhillon",
      "genre": "cricket",
      "date": "2025-11-13",
      "time": "4:00 PM",
      "location": "Pune",
      "price": "\u20b91910 - \u20b97269",
      "description": "Extravaganza - Pune happening live in Pune",
      "image": "https://example.com/event-17.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "18",
      "title": "Festival - Delhi",
      "type": "concert",
      "artist": "Virat Kohli",
      "genre": "punjabi",
      "date": "2026-04-18",
      "time": "12:00 PM",
      "location": "Delhi",
      "price": "\u20b9621 - \u20b97134",
      "description": "Festival - Delhi happening live in Delhi",
      "image": "https://example.com/event-18.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "19",
      "title": "Live - Bengaluru",
      "type": "sports",
      "artist": "Neha Kakkar",
      "genre": "bollywood",
      "date": "2026-04-07",
      "time": "12:00 PM",
      "location": "Bengaluru",
      "price": "\u20b9806 - \u20b910698",
      "description": "Live - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-19.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "20",
      "title": "Clash - Delhi",
      "type": "festival",
      "artist": "Rahul Subramanian",
      "genre": "kabaddi",
      "date": "2026-04-02",
      "time": "10:00 AM",
      "location": "Delhi",
      "price": "\u20b91383 - \u20b98388",
      "description": "Clash - Delhi happening live in Delhi",
      "image": "https://example.com/event-20.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "21",
      "title": "Live - Pune",
      "type": "screening",
      "artist": "Coldplay",
      "genre": "bollywood",
      "date": "2025-07-05",
      "time": "7:00 PM",
      "location": "Pune",
      "price": "\u20b91183 - \u20b914746",
      "description": "Live - Pune happening live in Pune",
      "image": "https://example.com/event-21.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "22",
      "title": "Madness - Kolkata",
      "type": "concert",
      "artist": "Virat Kohli",
      "genre": "punjabi",
      "date": "2025-07-16",
      "time": "10:00 AM",
      "location": "Kolkata",
      "price": "\u20b9828 - \u20b912079",
      "description": "Madness - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-22.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "23",
      "title": "Live - Hyderabad",
      "type": "screening",
      "artist": "Ranveer Singh",
      "genre": "punjabi",
      "date": "2025-11-22",
      "time": "10:00 AM",
      "location": "Hyderabad",
      "price": "\u20b9626 - \u20b95458",
      "description": "Live - Hyderabad happening live in Hyderabad",
      "image": "https://example.com/event-23.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "24",
      "title": "Experience - Chennai",
      "type": "expo",
      "artist": "Prateek Kuhad",
      "genre": "kabaddi",
      "date": "2026-01-14",
      "time": "4:00 PM",
      "location": "Chennai",
      "price": "\u20b91548 - \u20b93560",
      "description": "Experience - Chennai happening live in Chennai",
      "image": "https://example.com/event-24.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "25",
      "title": "Extravaganza - Chennai",
      "type": "expo",
      "artist": "Arijit Singh",
      "genre": "electronic",
      "date": "2025-06-24",
      "time": "10:00 AM",
      "location": "Chennai",
      "price": "\u20b9410 - \u20b95871",
      "description": "Extravaganza - Chennai happening live in Chennai",
      "image": "https://example.com/event-25.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "26",
      "title": "Madness - Jaipur",
      "type": "expo",
      "artist": "Arijit Singh",
      "genre": "bollywood",
      "date": "2026-02-23",
      "time": "4:00 PM",
      "location": "Jaipur",
      "price": "\u20b91433 - \u20b95704",
      "description": "Madness - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-26.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "27",
      "title": "Experience - Bengaluru",
      "type": "concert",
      "artist": "Rahul Subramanian",
      "genre": "kabaddi",
      "date": "2026-04-13",
      "time": "7:00 PM",
      "location": "Bengaluru",
      "price": "\u20b91743 - \u20b913086",
      "description": "Experience - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-27.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "28",
      "title": "Tour - Bengaluru",
      "type": "standup",
      "artist": "Coldplay",
      "genre": "kabaddi",
      "date": "2025-12-12",
      "time": "8:00 PM",
      "location": "Bengaluru",
      "price": "\u20b9445 - \u20b913542",
      "description": "Tour - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-28.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "29",
      "title": "Tour - Hyderabad",
      "type": "festival",
      "artist": "Virat Kohli",
      "genre": "classical",
      "date": "2026-04-10",
      "time": "12:00 PM",
      "location": "Hyderabad",
      "price": "\u20b91398 - \u20b912401",
      "description": "Tour - Hyderabad happening live in Hyderabad",
      "image": "https://example.com/event-29.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "30",
      "title": "Tour - Goa",
      "type": "festival",
      "artist": "Coldplay",
      "genre": "pop/rock",
      "date": "2025-04-27",
      "time": "8:00 PM",
      "location": "Goa",
      "price": "\u20b91880 - \u20b99290",
      "description": "Tour - Goa happening live in Goa",
      "image": "https://example.com/event-30.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "31",
      "title": "Experience - Goa",
      "type": "screening",
      "artist": "Ranveer Singh",
      "genre": "cricket",
      "date": "2026-01-07",
      "time": "6:00 PM",
      "location": "Goa",
      "price": "\u20b9416 - \u20b98244",
      "description": "Experience - Goa happening live in Goa",
      "image": "https://example.com/event-31.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "32",
      "title": "Festival - Kolkata",
      "type": "concert",
      "artist": "Virat Kohli",
      "genre": "standup",
      "date": "2026-04-15",
      "time": "12:00 PM",
      "location": "Kolkata",
      "price": "\u20b91722 - \u20b93051",
      "description": "Festival - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-32.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "33",
      "title": "Madness - Kolkata",
      "type": "screening",
      "artist": "Ranveer Singh",
      "genre": "pop/rock",
      "date": "2025-12-10",
      "time": "4:00 PM",
      "location": "Kolkata",
      "price": "\u20b91493 - \u20b911643",
      "description": "Madness - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-33.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "34",
      "title": "Tour - Goa",
      "type": "standup",
      "artist": "Arijit Singh",
      "genre": "pop/rock",
      "date": "2025-07-26",
      "time": "4:00 PM",
      "location": "Goa",
      "price": "\u20b9613 - \u20b93508",
      "description": "Tour - Goa happening live in Goa",
      "image": "https://example.com/event-34.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "35",
      "title": "Live - Goa",
      "type": "concert",
      "artist": "AP Dhillon",
      "genre": "kabaddi",
      "date": "2025-08-28",
      "time": "12:00 PM",
      "location": "Goa",
      "price": "\u20b91214 - \u20b94798",
      "description": "Live - Goa happening live in Goa",
      "image": "https://example.com/event-35.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "36",
      "title": "Clash - Kolkata",
      "type": "concert",
      "artist": "Coldplay",
      "genre": "cricket",
      "date": "2025-06-03",
      "time": "6:00 PM",
      "location": "Kolkata",
      "price": "\u20b9833 - \u20b95016",
      "description": "Clash - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-36.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "37",
      "title": "Festival - Pune",
      "type": "standup",
      "artist": "Arijit Singh",
      "genre": "cricket",
      "date": "2026-02-13",
      "time": "10:00 AM",
      "location": "Pune",
      "price": "\u20b9982 - \u20b99239",
      "description": "Festival - Pune happening live in Pune",
      "image": "https://example.com/event-37.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "38",
      "title": "Live - Hyderabad",
      "type": "screening",
      "artist": "Arijit Singh",
      "genre": "electronic",
      "date": "2025-05-10",
      "time": "4:00 PM",
      "location": "Hyderabad",
      "price": "\u20b9381 - \u20b99157",
      "description": "Live - Hyderabad happening live in Hyderabad",
      "image": "https://example.com/event-38.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "39",
      "title": "Festival - Chennai",
      "type": "festival",
      "artist": "Coldplay",
      "genre": "pop/rock",
      "date": "2025-08-07",
      "time": "8:00 PM",
      "location": "Chennai",
      "price": "\u20b91793 - \u20b912116",
      "description": "Festival - Chennai happening live in Chennai",
      "image": "https://example.com/event-39.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "40",
      "title": "Live - Delhi",
      "type": "screening",
      "artist": "AP Dhillon",
      "genre": "standup",
      "date": "2025-10-16",
      "time": "12:00 PM",
      "location": "Delhi",
      "price": "\u20b9808 - \u20b97228",
      "description": "Live - Delhi happening live in Delhi",
      "image": "https://example.com/event-40.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "41",
      "title": "Extravaganza - Jaipur",
      "type": "standup",
      "artist": "Film Stars",
      "genre": "bollywood",
      "date": "2025-10-27",
      "time": "10:00 AM",
      "location": "Jaipur",
      "price": "\u20b9752 - \u20b910757",
      "description": "Extravaganza - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-41.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "42",
      "title": "Festival - Hyderabad",
      "type": "screening",
      "artist": "Coldplay",
      "genre": "electronic",
      "date": "2025-09-06",
      "time": "4:00 PM",
      "location": "Hyderabad",
      "price": "\u20b91604 - \u20b98041",
      "description": "Festival - Hyderabad happening live in Hyderabad",
      "image": "https://example.com/event-42.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "43",
      "title": "Tour - Ahmedabad",
      "type": "expo",
      "artist": "Coldplay",
      "genre": "bollywood",
      "date": "2025-07-14",
      "time": "8:00 PM",
      "location": "Ahmedabad",
      "price": "\u20b91031 - \u20b912985",
      "description": "Tour - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-43.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "44",
      "title": "Tour - Mumbai",
      "type": "sports",
      "artist": "AP Dhillon",
      "genre": "classical",
      "date": "2026-03-07",
      "time": "4:00 PM",
      "location": "Mumbai",
      "price": "\u20b9671 - \u20b95972",
      "description": "Tour - Mumbai happening live in Mumbai",
      "image": "https://example.com/event-44.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "45",
      "title": "Live - Hyderabad",
      "type": "sports",
      "artist": "Prateek Kuhad",
      "genre": "punjabi",
      "date": "2025-05-24",
      "time": "8:00 PM",
      "location": "Hyderabad",
      "price": "\u20b9674 - \u20b94448",
      "description": "Live - Hyderabad happening live in Hyderabad",
      "image": "https://example.com/event-45.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "46",
      "title": "Festival - Jaipur",
      "type": "concert",
      "artist": "Film Stars",
      "genre": "bollywood",
      "date": "2025-07-26",
      "time": "10:00 AM",
      "location": "Jaipur",
      "price": "\u20b91886 - \u20b914948",
      "description": "Festival - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-46.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "47",
      "title": "Madness - Delhi",
      "type": "concert",
      "artist": "Rahul Subramanian",
      "genre": "bollywood",
      "date": "2026-01-24",
      "time": "12:00 PM",
      "location": "Delhi",
      "price": "\u20b91823 - \u20b93835",
      "description": "Madness - Delhi happening live in Delhi",
      "image": "https://example.com/event-47.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "48",
      "title": "Experience - Bengaluru",
      "type": "screening",
      "artist": "Prateek Kuhad",
      "genre": "bollywood",
      "date": "2026-01-17",
      "time": "7:00 PM",
      "location": "Bengaluru",
      "price": "\u20b91056 - \u20b93083",
      "description": "Experience - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-48.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "49",
      "title": "Madness - Kolkata",
      "type": "expo",
      "artist": "Coldplay",
      "genre": "cricket",
      "date": "2026-04-02",
      "time": "10:00 AM",
      "location": "Kolkata",
      "price": "\u20b9398 - \u20b912555",
      "description": "Madness - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-49.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "50",
      "title": "Extravaganza - Jaipur",
      "type": "screening",
      "artist": "Coldplay",
      "genre": "standup",
      "date": "2026-01-09",
      "time": "7:00 PM",
      "location": "Jaipur",
      "price": "\u20b9372 - \u20b94424",
      "description": "Extravaganza - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-50.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "51",
      "title": "Tour - Goa",
      "type": "festival",
      "artist": "Virat Kohli",
      "genre": "bollywood",
      "date": "2025-04-29",
      "time": "10:00 AM",
      "location": "Goa",
      "price": "\u20b91568 - \u20b99997",
      "description": "Tour - Goa happening live in Goa",
      "image": "https://example.com/event-51.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "52",
      "title": "Extravaganza - Chennai",
      "type": "screening",
      "artist": "Various Artists",
      "genre": "punjabi",
      "date": "2026-01-17",
      "time": "6:00 PM",
      "location": "Chennai",
      "price": "\u20b91242 - \u20b913124",
      "description": "Extravaganza - Chennai happening live in Chennai",
      "image": "https://example.com/event-52.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "53",
      "title": "Festival - Ahmedabad",
      "type": "concert",
      "artist": "AP Dhillon",
      "genre": "classical",
      "date": "2025-10-07",
      "time": "10:00 AM",
      "location": "Ahmedabad",
      "price": "\u20b91326 - \u20b910763",
      "description": "Festival - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-53.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "54",
      "title": "Extravaganza - Mumbai",
      "type": "concert",
      "artist": "Prateek Kuhad",
      "genre": "cricket",
      "date": "2025-12-14",
      "time": "7:00 PM",
      "location": "Mumbai",
      "price": "\u20b91694 - \u20b911062",
      "description": "Extravaganza - Mumbai happening live in Mumbai",
      "image": "https://example.com/event-54.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "55",
      "title": "Tour - Jaipur",
      "type": "standup",
      "artist": "Coldplay",
      "genre": "pop/rock",
      "date": "2026-01-08",
      "time": "8:00 PM",
      "location": "Jaipur",
      "price": "\u20b9807 - \u20b913585",
      "description": "Tour - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-55.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "56",
      "title": "Tour - Jaipur",
      "type": "concert",
      "artist": "Arijit Singh",
      "genre": "kabaddi",
      "date": "2025-12-05",
      "time": "7:00 PM",
      "location": "Jaipur",
      "price": "\u20b9999 - \u20b98753",
      "description": "Tour - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-56.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "57",
      "title": "Experience - Ahmedabad",
      "type": "screening",
      "artist": "Various Artists",
      "genre": "punjabi",
      "date": "2025-05-03",
      "time": "10:00 AM",
      "location": "Ahmedabad",
      "price": "\u20b9555 - \u20b94828",
      "description": "Experience - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-57.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "58",
      "title": "Festival - Pune",
      "type": "expo",
      "artist": "Neha Kakkar",
      "genre": "electronic",
      "date": "2025-08-19",
      "time": "12:00 PM",
      "location": "Pune",
      "price": "\u20b91329 - \u20b912658",
      "description": "Festival - Pune happening live in Pune",
      "image": "https://example.com/event-58.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "59",
      "title": "Extravaganza - Ahmedabad",
      "type": "concert",
      "artist": "Virat Kohli",
      "genre": "kabaddi",
      "date": "2025-08-18",
      "time": "4:00 PM",
      "location": "Ahmedabad",
      "price": "\u20b91185 - \u20b95014",
      "description": "Extravaganza - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-59.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "60",
      "title": "Tour - Hyderabad",
      "type": "festival",
      "artist": "Film Stars",
      "genre": "classical",
      "date": "2025-06-02",
      "time": "10:00 AM",
      "location": "Hyderabad",
      "price": "\u20b91263 - \u20b95908",
      "description": "Tour - Hyderabad happening live in Hyderabad",
      "image": "https://example.com/event-60.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "61",
      "title": "Live - Jaipur",
      "type": "screening",
      "artist": "Ranveer Singh",
      "genre": "punjabi",
      "date": "2026-04-19",
      "time": "4:00 PM",
      "location": "Jaipur",
      "price": "\u20b9757 - \u20b910633",
      "description": "Live - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-61.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "62",
      "title": "Festival - Chennai",
      "type": "concert",
      "artist": "AP Dhillon",
      "genre": "cricket",
      "date": "2026-04-02",
      "time": "6:00 PM",
      "location": "Chennai",
      "price": "\u20b9941 - \u20b93001",
      "description": "Festival - Chennai happening live in Chennai",
      "image": "https://example.com/event-62.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "63",
      "title": "Tour - Jaipur",
      "type": "festival",
      "artist": "Film Stars",
      "genre": "pop/rock",
      "date": "2025-11-29",
      "time": "12:00 PM",
      "location": "Jaipur",
      "price": "\u20b9431 - \u20b912509",
      "description": "Tour - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-63.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "64",
      "title": "Experience - Bengaluru",
      "type": "standup",
      "artist": "AP Dhillon",
      "genre": "electronic",
      "date": "2026-03-16",
      "time": "4:00 PM",
      "location": "Bengaluru",
      "price": "\u20b9994 - \u20b96307",
      "description": "Experience - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-64.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "65",
      "title": "Madness - Kolkata",
      "type": "sports",
      "artist": "Virat Kohli",
      "genre": "electronic",
      "date": "2025-08-18",
      "time": "4:00 PM",
      "location": "Kolkata",
      "price": "\u20b9820 - \u20b93011",
      "description": "Madness - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-65.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "66",
      "title": "Festival - Jaipur",
      "type": "expo",
      "artist": "Ranveer Singh",
      "genre": "kabaddi",
      "date": "2025-09-15",
      "time": "10:00 AM",
      "location": "Jaipur",
      "price": "\u20b91302 - \u20b913371",
      "description": "Festival - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-66.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "67",
      "title": "Tour - Ahmedabad",
      "type": "festival",
      "artist": "Arijit Singh",
      "genre": "punjabi",
      "date": "2026-03-09",
      "time": "7:00 PM",
      "location": "Ahmedabad",
      "price": "\u20b9436 - \u20b97130",
      "description": "Tour - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-67.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "68",
      "title": "Madness - Kolkata",
      "type": "standup",
      "artist": "Virat Kohli",
      "genre": "punjabi",
      "date": "2025-07-19",
      "time": "6:00 PM",
      "location": "Kolkata",
      "price": "\u20b91883 - \u20b97315",
      "description": "Madness - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-68.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "69",
      "title": "Experience - Pune",
      "type": "screening",
      "artist": "Various Artists",
      "genre": "cricket",
      "date": "2025-08-08",
      "time": "8:00 PM",
      "location": "Pune",
      "price": "\u20b91156 - \u20b911823",
      "description": "Experience - Pune happening live in Pune",
      "image": "https://example.com/event-69.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "70",
      "title": "Experience - Bengaluru",
      "type": "sports",
      "artist": "Arijit Singh",
      "genre": "cricket",
      "date": "2026-04-15",
      "time": "7:00 PM",
      "location": "Bengaluru",
      "price": "\u20b91790 - \u20b910485",
      "description": "Experience - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-70.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "71",
      "title": "Tour - Kolkata",
      "type": "standup",
      "artist": "Coldplay",
      "genre": "electronic",
      "date": "2026-01-19",
      "time": "10:00 AM",
      "location": "Kolkata",
      "price": "\u20b9555 - \u20b97688",
      "description": "Tour - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-71.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "72",
      "title": "Tour - Kolkata",
      "type": "expo",
      "artist": "Film Stars",
      "genre": "classical",
      "date": "2025-05-23",
      "time": "6:00 PM",
      "location": "Kolkata",
      "price": "\u20b91329 - \u20b914759",
      "description": "Tour - Kolkata happening live in Kolkata",
      "image": "https://example.com/event-72.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "73",
      "title": "Clash - Bengaluru",
      "type": "festival",
      "artist": "Film Stars",
      "genre": "bollywood",
      "date": "2025-08-09",
      "time": "8:00 PM",
      "location": "Bengaluru",
      "price": "\u20b91122 - \u20b95199",
      "description": "Clash - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-73.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "74",
      "title": "Extravaganza - Bengaluru",
      "type": "sports",
      "artist": "Neha Kakkar",
      "genre": "bollywood",
      "date": "2026-01-13",
      "time": "7:00 PM",
      "location": "Bengaluru",
      "price": "\u20b92000 - \u20b97002",
      "description": "Extravaganza - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-74.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "75",
      "title": "Clash - Hyderabad",
      "type": "expo",
      "artist": "Ranveer Singh",
      "genre": "kabaddi",
      "date": "2025-06-22",
      "time": "10:00 AM",
      "location": "Hyderabad",
      "price": "\u20b9563 - \u20b911515",
      "description": "Clash - Hyderabad happening live in Hyderabad",
      "image": "https://example.com/event-75.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "76",
      "title": "Madness - Goa",
      "type": "standup",
      "artist": "Prateek Kuhad",
      "genre": "punjabi",
      "date": "2025-12-18",
      "time": "4:00 PM",
      "location": "Goa",
      "price": "\u20b9738 - \u20b96724",
      "description": "Madness - Goa happening live in Goa",
      "image": "https://example.com/event-76.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "77",
      "title": "Clash - Chennai",
      "type": "sports",
      "artist": "AP Dhillon",
      "genre": "kabaddi",
      "date": "2025-09-14",
      "time": "4:00 PM",
      "location": "Chennai",
      "price": "\u20b91626 - \u20b93178",
      "description": "Clash - Chennai happening live in Chennai",
      "image": "https://example.com/event-77.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "78",
      "title": "Live - Hyderabad",
      "type": "concert",
      "artist": "Ranveer Singh",
      "genre": "electronic",
      "date": "2025-09-28",
      "time": "10:00 AM",
      "location": "Hyderabad",
      "price": "\u20b9916 - \u20b99587",
      "description": "Live - Hyderabad happening live in Hyderabad",
      "image": "https://example.com/event-78.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "79",
      "title": "Clash - Jaipur",
      "type": "concert",
      "artist": "Arijit Singh",
      "genre": "electronic",
      "date": "2025-11-18",
      "time": "7:00 PM",
      "location": "Jaipur",
      "price": "\u20b91896 - \u20b912143",
      "description": "Clash - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-79.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "80",
      "title": "Extravaganza - Bengaluru",
      "type": "concert",
      "artist": "Virat Kohli",
      "genre": "bollywood",
      "date": "2025-10-29",
      "time": "8:00 PM",
      "location": "Bengaluru",
      "price": "\u20b91722 - \u20b914618",
      "description": "Extravaganza - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-80.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "81",
      "title": "Festival - Goa",
      "type": "expo",
      "artist": "Arijit Singh",
      "genre": "standup",
      "date": "2026-01-28",
      "time": "12:00 PM",
      "location": "Goa",
      "price": "\u20b91433 - \u20b99058",
      "description": "Festival - Goa happening live in Goa",
      "image": "https://example.com/event-81.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "82",
      "title": "Tour - Jaipur",
      "type": "festival",
      "artist": "Rahul Subramanian",
      "genre": "punjabi",
      "date": "2025-08-14",
      "time": "12:00 PM",
      "location": "Jaipur",
      "price": "\u20b9795 - \u20b99265",
      "description": "Tour - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-82.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "83",
      "title": "Festival - Delhi",
      "type": "expo",
      "artist": "AP Dhillon",
      "genre": "bollywood",
      "date": "2025-06-19",
      "time": "10:00 AM",
      "location": "Delhi",
      "price": "\u20b91073 - \u20b93085",
      "description": "Festival - Delhi happening live in Delhi",
      "image": "https://example.com/event-83.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "84",
      "title": "Tour - Chennai",
      "type": "standup",
      "artist": "Various Artists",
      "genre": "punjabi",
      "date": "2026-03-25",
      "time": "10:00 AM",
      "location": "Chennai",
      "price": "\u20b9973 - \u20b910246",
      "description": "Tour - Chennai happening live in Chennai",
      "image": "https://example.com/event-84.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "85",
      "title": "Live - Bengaluru",
      "type": "festival",
      "artist": "Neha Kakkar",
      "genre": "classical",
      "date": "2025-06-19",
      "time": "7:00 PM",
      "location": "Bengaluru",
      "price": "\u20b91915 - \u20b93583",
      "description": "Live - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-85.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "86",
      "title": "Experience - Goa",
      "type": "expo",
      "artist": "Prateek Kuhad",
      "genre": "punjabi",
      "date": "2025-10-02",
      "time": "10:00 AM",
      "location": "Goa",
      "price": "\u20b9825 - \u20b912860",
      "description": "Experience - Goa happening live in Goa",
      "image": "https://example.com/event-86.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "87",
      "title": "Madness - Bengaluru",
      "type": "screening",
      "artist": "Arijit Singh",
      "genre": "electronic",
      "date": "2025-07-03",
      "time": "7:00 PM",
      "location": "Bengaluru",
      "price": "\u20b9986 - \u20b914869",
      "description": "Madness - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-87.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "88",
      "title": "Live - Goa",
      "type": "festival",
      "artist": "Prateek Kuhad",
      "genre": "pop/rock",
      "date": "2026-02-25",
      "time": "12:00 PM",
      "location": "Goa",
      "price": "\u20b91299 - \u20b93181",
      "description": "Live - Goa happening live in Goa",
      "image": "https://example.com/event-88.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "89",
      "title": "Tour - Delhi",
      "type": "standup",
      "artist": "Coldplay",
      "genre": "cricket",
      "date": "2025-06-05",
      "time": "8:00 PM",
      "location": "Delhi",
      "price": "\u20b91311 - \u20b97317",
      "description": "Tour - Delhi happening live in Delhi",
      "image": "https://example.com/event-89.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "90",
      "title": "Live - Jaipur",
      "type": "standup",
      "artist": "Prateek Kuhad",
      "genre": "pop/rock",
      "date": "2025-04-24",
      "time": "12:00 PM",
      "location": "Jaipur",
      "price": "\u20b9335 - \u20b93804",
      "description": "Live - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-90.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "91",
      "title": "Experience - Delhi",
      "type": "concert",
      "artist": "Virat Kohli",
      "genre": "standup",
      "date": "2025-07-13",
      "time": "10:00 AM",
      "location": "Delhi",
      "price": "\u20b91372 - \u20b910945",
      "description": "Experience - Delhi happening live in Delhi",
      "image": "https://example.com/event-91.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "92",
      "title": "Live - Pune",
      "type": "concert",
      "artist": "Rahul Subramanian",
      "genre": "electronic",
      "date": "2025-05-13",
      "time": "12:00 PM",
      "location": "Pune",
      "price": "\u20b91962 - \u20b97568",
      "description": "Live - Pune happening live in Pune",
      "image": "https://example.com/event-92.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "93",
      "title": "Madness - Pune",
      "type": "concert",
      "artist": "AP Dhillon",
      "genre": "punjabi",
      "date": "2025-05-27",
      "time": "7:00 PM",
      "location": "Pune",
      "price": "\u20b91609 - \u20b93284",
      "description": "Madness - Pune happening live in Pune",
      "image": "https://example.com/event-93.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "94",
      "title": "Tour - Goa",
      "type": "sports",
      "artist": "Coldplay",
      "genre": "punjabi",
      "date": "2025-05-18",
      "time": "7:00 PM",
      "location": "Goa",
      "price": "\u20b9918 - \u20b96932",
      "description": "Tour - Goa happening live in Goa",
      "image": "https://example.com/event-94.jpg",
      "tags": [
        "music",
        "pop"
      ]
    },
    {
      "id": "95",
      "title": "Experience - Delhi",
      "type": "concert",
      "artist": "Various Artists",
      "genre": "pop/rock",
      "date": "2025-05-01",
      "time": "6:00 PM",
      "location": "Delhi",
      "price": "\u20b9746 - \u20b912002",
      "description": "Experience - Delhi happening live in Delhi",
      "image": "https://example.com/event-95.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "96",
      "title": "Extravaganza - Pune",
      "type": "screening",
      "artist": "Arijit Singh",
      "genre": "pop/rock",
      "date": "2025-11-18",
      "time": "12:00 PM",
      "location": "Pune",
      "price": "\u20b91439 - \u20b97397",
      "description": "Extravaganza - Pune happening live in Pune",
      "image": "https://example.com/event-96.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "97",
      "title": "Experience - Chennai",
      "type": "screening",
      "artist": "Virat Kohli",
      "genre": "cricket",
      "date": "2025-09-14",
      "time": "7:00 PM",
      "location": "Chennai",
      "price": "\u20b91751 - \u20b94804",
      "description": "Experience - Chennai happening live in Chennai",
      "image": "https://example.com/event-97.jpg",
      "tags": [
        "sports",
        "cricket"
      ]
    },
    {
      "id": "98",
      "title": "Tour - Goa",
      "type": "festival",
      "artist": "Various Artists",
      "genre": "pop/rock",
      "date": "2026-02-17",
      "time": "4:00 PM",
      "location": "Goa",
      "price": "\u20b91628 - \u20b94377",
      "description": "Tour - Goa happening live in Goa",
      "image": "https://example.com/event-98.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "99",
      "title": "Tour - Ahmedabad",
      "type": "screening",
      "artist": "Coldplay",
      "genre": "kabaddi",
      "date": "2025-09-09",
      "time": "10:00 AM",
      "location": "Ahmedabad",
      "price": "\u20b91488 - \u20b913221",
      "description": "Tour - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-99.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "100",
      "title": "Clash - Ahmedabad",
      "type": "festival",
      "artist": "Arijit Singh",
      "genre": "pop/rock",
      "date": "2025-07-20",
      "time": "4:00 PM",
      "location": "Ahmedabad",
      "price": "\u20b91292 - \u20b912947",
      "description": "Clash - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-100.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "101",
      "title": "Live - Bengaluru",
      "type": "festival",
      "artist": "Virat Kohli",
      "genre": "punjabi",
      "date": "2026-02-01",
      "time": "4:00 PM",
      "location": "Bengaluru",
      "price": "\u20b91093 - \u20b95515",
      "description": "Live - Bengaluru happening live in Bengaluru",
      "image": "https://example.com/event-101.jpg",
      "tags": [
        "expo",
        "tech"
      ]
    },
    {
      "id": "102",
      "title": "Experience - Ahmedabad",
      "type": "concert",
      "artist": "Arijit Singh",
      "genre": "cricket",
      "date": "2025-05-28",
      "time": "8:00 PM",
      "location": "Ahmedabad",
      "price": "\u20b9588 - \u20b99057",
      "description": "Experience - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-102.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "103",
      "title": "Madness - Goa",
      "type": "concert",
      "artist": "Coldplay",
      "genre": "bollywood",
      "date": "2026-03-21",
      "time": "4:00 PM",
      "location": "Goa",
      "price": "\u20b91375 - \u20b95960",
      "description": "Madness - Goa happening live in Goa",
      "image": "https://example.com/event-103.jpg",
      "tags": [
        "festival",
        "edm"
      ]
    },
    {
      "id": "104",
      "title": "Madness - Chennai",
      "type": "screening",
      "artist": "Coldplay",
      "genre": "standup",
      "date": "2025-05-25",
      "time": "10:00 AM",
      "location": "Chennai",
      "price": "\u20b91739 - \u20b96783",
      "description": "Madness - Chennai happening live in Chennai",
      "image": "https://example.com/event-104.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "105",
      "title": "Clash - Jaipur",
      "type": "festival",
      "artist": "Various Artists",
      "genre": "cricket",
      "date": "2025-05-07",
      "time": "4:00 PM",
      "location": "Jaipur",
      "price": "\u20b9508 - \u20b914178",
      "description": "Clash - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-105.jpg",
      "tags": [
        "comedy",
        "standup"
      ]
    },
    {
      "id": "106",
      "title": "Live - Ahmedabad",
      "type": "expo",
      "artist": "Various Artists",
      "genre": "electronic",
      "date": "2025-12-21",
      "time": "7:00 PM",
      "location": "Ahmedabad",
      "price": "\u20b9554 - \u20b914552",
      "description": "Live - Ahmedabad happening live in Ahmedabad",
      "image": "https://example.com/event-106.jpg",
      "tags": [
        "film",
        "screening"
      ]
    },
    {
      "id": "107",
      "title": "Clash - Jaipur",
      "type": "sports",
      "artist": "Various Artists",
      "genre": "cricket",
      "date": "2025-05-27",
      "time": "8:00 PM",
      "location": "Jaipur",
      "price": "\u20b91861 - \u20b97629",
      "description": "Clash - Jaipur happening live in Jaipur",
      "image": "https://example.com/event-107.jpg",
      "tags": [
        "music",
        "pop"
      ]
    }
  ];
  
  module.exports = { eventsList };