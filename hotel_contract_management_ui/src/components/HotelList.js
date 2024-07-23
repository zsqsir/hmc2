import React, { useState, useCallback } from 'react';
import axios from 'axios';

const HotelList = ({ hotels = [], setHotels }) => { // Default to empty array if not provided
    const [editingHotelId, setEditingHotelId] = useState(null);
    const [hotelName, setHotelName] = useState('');
    const [hotelFacilities, setHotelFacilities] = useState('');

    const handleDelete = useCallback(async (id) => {
        try {
            // Check if the hotel has rooms
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/hotels/${id}/rooms`);
            if (response.data.length > 0) {
                // If hotel has rooms, show an alert message
                alert('This hotel has rooms and cannot be deleted.');
            } else {
                // If no rooms, proceed with deletion
                await axios.delete(`${process.env.REACT_APP_API_URL}/hotels/${id}`);
                setHotels(prevHotels => prevHotels.filter(hotel => hotel.id !== id));
                console.log(`Deleted hotel with id: ${id}`);
            }
        } catch (error) {
            console.error('Error deleting hotel', error);
        }
    }, [setHotels]);

    const handleEdit = (hotel) => {
        setEditingHotelId(hotel.id);
        setHotelName(hotel.name);
        setHotelFacilities(hotel.facilities);
    };

    const handleSave = async () => {
        try {
            const updatedHotel = { name: hotelName, facilities: hotelFacilities };
            await axios.put(`${process.env.REACT_APP_API_URL}/hotels/${editingHotelId}`, updatedHotel);
            setHotels(prevHotels =>
                prevHotels.map(hotel => hotel.id === editingHotelId ? { ...hotel, ...updatedHotel } : hotel)
            );
            setEditingHotelId(null);
            console.log(`Updated hotel with id: ${editingHotelId}`);
        } catch (error) {
            console.error('Error updating hotel', error);
        }
    };

    const handleCancel = () => {
        setEditingHotelId(null);
    };

    return (
        <div>
            <h2>Hotel List</h2>
            <ul>
                {hotels.length === 0 ? (
                    <p>No hotels available</p>
                ) : (
                    hotels.map(hotel => (
                        <li key={hotel.id}>
                            {editingHotelId === hotel.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={hotelName}
                                        onChange={(e) => setHotelName(e.target.value)}
                                        placeholder="Hotel Name"
                                    />
                                    <input
                                        type="text"
                                        value={hotelFacilities}
                                        onChange={(e) => setHotelFacilities(e.target.value)}
                                        placeholder="Hotel Facilities"
                                    />
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    {hotel.name} - {hotel.facilities}
                                    <button onClick={() => handleEdit(hotel)}>Edit</button>
                                    <button onClick={() => handleDelete(hotel.id)}>Delete</button>
                                </>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default HotelList;
