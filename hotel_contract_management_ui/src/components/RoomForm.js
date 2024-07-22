import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomForm = ({ roomId, onSuccess, selectedHotelId }) => {
    const [room, setRoom] = useState({
        hotel_id: selectedHotelId,
        room_type: '',
        occupancy_adults: '',
        occupancy_kids: '',
        allocation: '',
        facilities: '',
        board: '',
        kids_supplement: '',
        third_bed_supplement: '',
        fourth_bed_supplement: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (roomId) {
            axios.get(`http://localhost:8000/rooms/${roomId}`)
                .then(response => setRoom(response.data))
                .catch(error => console.error('Error fetching room:', error));
        }
    }, [roomId]);

    const handleChange = (e) => {
        setRoom({ ...room, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiCall = roomId
            ? axios.put(`http://localhost:8000/rooms/${roomId}`, room)
            : axios.post('http://localhost:8000/rooms', { ...room, hotel_id: selectedHotelId });

        apiCall.then(() => {
            onSuccess();
            setSuccessMessage('Room saved successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Hide the message after 3 seconds
            setRoom({
                hotel_id: selectedHotelId,
                room_type: '',
                occupancy_adults: '',
                occupancy_kids: '',
                allocation: '',
                facilities: '',
                board: '',
                kids_supplement: '',
                third_bed_supplement: '',
                fourth_bed_supplement: ''
            });
        }).catch(error => console.error('Error saving room:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            {roomId ? <h3>Edit Room</h3> : <h3>Add Room</h3>}
            {successMessage && <p>{successMessage}</p>}
            <input
                type="text"
                name="room_type"
                value={room.room_type}
                onChange={handleChange}
                placeholder="Room Type"
            />
            <input
                type="number"
                name="occupancy_adults"
                value={room.occupancy_adults}
                onChange={handleChange}
                placeholder="Occupancy Adults"
            />
            <input
                type="number"
                name="occupancy_kids"
                value={room.occupancy_kids}
                onChange={handleChange}
                placeholder="Occupancy Kids"
            />
            <input
                type="text"
                name="allocation"
                value={room.allocation}
                onChange={handleChange}
                placeholder="Allocation"
            />
            <input
                type="text"
                name="facilities"
                value={room.facilities}
                onChange={handleChange}
                placeholder="Facilities"
            />
            <input
                type="text"
                name="board"
                value={room.board}
                onChange={handleChange}
                placeholder="Board"
            />
            <input
                type="number"
                name="kids_supplement"
                value={room.kids_supplement}
                onChange={handleChange}
                placeholder="Kids Supplement"
            />
            <input
                type="number"
                name="third_bed_supplement"
                value={room.third_bed_supplement}
                onChange={handleChange}
                placeholder="Third Bed Supplement"
            />
            <input
                type="number"
                name="fourth_bed_supplement"
                value={room.fourth_bed_supplement}
                onChange={handleChange}
                placeholder="Fourth Bed Supplement"
            />
            <button type="submit">Save Room</button>
        </form>
    );
};

export default RoomForm;
