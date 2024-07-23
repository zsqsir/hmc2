import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import RoomForm from './RoomForm';

const RoomList = ({ hotels }) => {
    const [rooms, setRooms] = useState([]);
    const [selectedHotelId, setSelectedHotelId] = useState('');
    const [editingRoomId, setEditingRoomId] = useState(null);

    useEffect(() => {
        if (selectedHotelId) {
            axios.get(`${process.env.REACT_APP_API_URL}/rooms?hotel_id=${selectedHotelId}`)
                .then(response => setRooms(response.data))
                .catch(error => console.error('Error fetching rooms:', error));
        } else {
            setRooms([]); // Clear rooms if no hotel is selected
        }
    }, [selectedHotelId]);

    const handleDelete = useCallback(async (id) => {
        try {
            // Check if the room has rates
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/rooms/${id}/room_rates`);
            if (response.data.length > 0) {
                // If the room has rates, show an alert message
                alert('This room has rates and cannot be deleted.');
            } else {
                // If no rates, proceed with deletion
                await axios.delete(`${process.env.REACT_APP_API_URL}/rooms/${id}`);
                setRooms(prevRooms => prevRooms.filter(room => room.id !== id));
                console.log(`Deleted room with id: ${id}`);
            }
        } catch (error) {
            console.error('Error deleting room', error);
        }
    }, []);

    const handleEdit = (id) => {
        setEditingRoomId(id);
    };

    const handleSuccess = () => {
        setEditingRoomId(null);
        if (selectedHotelId) {
            axios.get(`${process.env.REACT_APP_API_URL}/rooms?hotel_id=${selectedHotelId}`)
                .then(response => setRooms(response.data))
                .catch(error => console.error('Error fetching rooms:', error));
        }
    };

    return (
        <div>
            <h2>Rooms</h2>
            <select
                onChange={(e) => setSelectedHotelId(e.target.value)}
                value={selectedHotelId}
            >
                <option value="">Select Hotel</option>
                {hotels.map(hotel => (
                    <option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                    </option>
                ))}
            </select>
            <RoomForm roomId={editingRoomId} onSuccess={handleSuccess} selectedHotelId={selectedHotelId} />
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        {room.room_type} - {room.facilities}
                        <button onClick={() => handleEdit(room.id)}>Edit</button>
                        <button onClick={() => handleDelete(room.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;
