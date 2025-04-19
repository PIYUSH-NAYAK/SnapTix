import React, { useState } from 'react';

const SeatSelector = ({ onSelectSeat, selectedSeat }) => {
  // Seat categories
  const categories = ['Premium', 'Standard', 'Economy'];
  
  // Seat rows and numbers
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  // Generate available seats
  const generateSeats = (category) => {
    let seats = [];
    
    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        // Randomly mark some seats as taken
        const isTaken = Math.random() < 0.3;
        if (!isTaken) {
          seats.push(`${category}-${row}${i}`);
        }
      }
    });
    
    return seats;
  };

  // Generate available seats for each category
  const availableSeats = {};
  categories.forEach(category => {
    availableSeats[category] = generateSeats(category);
  });

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSeatSelect = (seat) => {
    onSelectSeat(seat);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-4">Select Your Seat</h3>
      
      {/* Category selection */}
      <div className="flex mb-6 border-b">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 ${
              activeCategory === category 
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Seat legend */}
      <div className="flex items-center justify-start gap-6 mb-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
          <span>Selected</span>
        </div>
      </div>
      
      {/* Stage */}
      <div className="w-full bg-gray-800 text-white text-center py-2 rounded-lg mb-6">
        STAGE
      </div>
      
      {/* Seats */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {availableSeats[activeCategory].slice(0, 20).map(seat => (
          <button
            key={seat}
            onClick={() => handleSeatSelect(seat)}
            className={`p-2 text-xs rounded ${
              selectedSeat === seat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {seat.split('-')[1]}
          </button>
        ))}
      </div>
      
      {selectedSeat && (
        <div className="text-center p-2 bg-blue-50 border border-blue-200 rounded">
          Selected: <span className="font-medium">{selectedSeat}</span>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;