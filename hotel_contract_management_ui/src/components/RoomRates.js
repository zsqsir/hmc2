// src/components/RoomRates.js
import React, { useState } from 'react';
import axios from 'axios';

const RoomRates = () => {
    const [roomId, setRoomId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rates, setRates] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`/api/room_rates`, { params: { room_id: roomId, start_date: startDate, end_date: endDate } })
            .then(response => setRates(response.data));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" required />
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                <button type="submit">Get Rates</button>
            </form>
            <ul>
                {rates.map(rate => (
                    <li key={rate.id}>
                        {rate.start_date} to {rate.end_date} - ${rate.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomRates;
