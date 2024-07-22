import React from 'react';

const HotelList = ({ hotels }) => {
  return (
    <div>
      <h2>Hotel List</h2>
      <ul>
        {hotels.map(hotel => (
          <li key={hotel.id}>
            {hotel.name} - {hotel.facilities}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
