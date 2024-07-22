import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddRoomRate = () => {
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [roomRate, setRoomRate] = useState({
        room_id: '',
        start_date: '',
        end_date: '',
        price: ''
    });

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

    const handleHotelChange = async (e) => {
        const hotelId = e.target.value;
        setRoomRate({ ...roomRate, room_id: '' });
        try {
            const response = await axios.get('http://localhost:8000/rooms/', { params: { hotel_id: hotelId } });
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomRate({ ...roomRate, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/room_rates/', roomRate);
            alert('Room rate added successfully');
        } catch (error) {
            console.error('Error adding room rate', error);
        }
    };

    return (
        <div>
            <h1>Add Room Rate</h1>
            <form onSubmit={handleSubmit}>
                <select name="hotel_id" onChange={handleHotelChange}>
                    <option value="">Select Hotel</option>
                    {hotels.map(hotel => (
                        <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                    ))}
                </select>
                <select name="room_id" onChange={handleChange} value={roomRate.room_id}>
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                        <option key={room.id} value={room.id}>{room.room_type}</option>
                    ))}
                </select>
                <input type="date" name="start_date" placeholder="Start Date" onChange={handleChange} required />
                <input type="date" name="end_date" placeholder="End Date" onChange={handleChange} required />
                <input type="number" step="0.01" name="price" placeholder="Price" onChange={handleChange} required />
                <button type="submit">Add Room Rate</button>
            </form>
        </div>
    );
};

export default AddRoomRate;
