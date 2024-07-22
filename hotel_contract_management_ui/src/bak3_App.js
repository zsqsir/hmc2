// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelList from './components/HotelList';
import HotelForm from './components/HotelForm';
import RoomList from './components/RoomList';
//import RoomRates from './components/RoomRates';
import RoomRateList from './components/RoomRateList';
import AddRoomRate from './components/AddRoomRate';

const App = () => {
    const [hotels, setHotels] = useState([]);

//    useEffect(() => {
//        // Fetch hotels
//        axios.get('http://localhost:8000/hotels/')
//            .then(response => setHotels(response.data))
//            .catch(error => console.error('Error fetching hotels:', error));
//    }, []);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:8000/hotels/');
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels', error);
            }
        };
        fetchHotels();
    }, []);
    // Add a hotel and refresh the hotel list
//    const addHotel = (hotel) => {
//        axios.post('http://localhost:8000/hotels/', hotel)
//            .then(response => setHotels([...hotels, response.data]))
//            .catch(error => console.error('Error adding hotel:', error));
//    };

    const addHotel = (newHotel) => {
        console.log('Adding hotel:', newHotel); // Log new hotel data
        setHotels(prevHotels => {
            const isDuplicate = prevHotels.some(hotel => hotel.name === newHotel.name);
            if (!isDuplicate) {
                return [...prevHotels, newHotel];
            }
            return prevHotels;
        });
    };


    return (
        <div>
            <h1>Hotel and Room Management</h1>

            {/* Hotel Management */}
            <HotelForm addHotel={addHotel} />
            <HotelList hotels={hotels} setHotels={setHotels} />

            {/* Room Management */}
            <RoomList hotels={hotels} />
            <RoomRates />
            <h1>Room Rate Management</h1>
            <AddRoomRate />
            <RoomRateList />
        </div>
    );
};

export default App;
