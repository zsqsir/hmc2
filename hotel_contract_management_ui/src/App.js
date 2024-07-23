import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelList from './components/HotelList';
import HotelForm from './components/HotelForm';
import RoomList from './components/RoomList';
import RoomRateList from './components/RoomRateList';
import AddRoomRate from './components/AddRoomRate';

const App = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showHotelList, setShowHotelList] = useState(false);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/hotels/`);
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    const addHotel = (newHotel) => {
        setHotels(prevHotels => [...prevHotels, newHotel]);
    };

    const toggleHotelList = () => {
        setShowHotelList(prevState => !prevState);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Hotel and Room Management</h1>

            {/* Flex container for the Hotel Form and Toggle Button */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px' }}>
                <HotelForm addHotel={addHotel} />
                <button  onClick={toggleHotelList}>
                    {showHotelList ? 'Hide Hotel List' : 'Show Hotel List'}
                </button>
            </div>

            {showHotelList && <HotelList hotels={hotels} setHotels={setHotels} />}

            {/* Room Management */}
            <RoomList hotels={hotels} />

            <h1>Room Rate Management</h1>
            <AddRoomRate />
            <RoomRateList />
        </div>
    );
};

export default App;
