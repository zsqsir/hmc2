import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomRateForm = ({ roomRateId, onSuccess }) => {
    const [roomRate, setRoomRate] = useState({
        price: '',
        check_in_date: '',
        check_out_date: '',
        occupancy_adults: '',
        occupancy_kids: ''
    });

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (roomRateId) {
            axios.get(`${process.env.REACT_APP_API_URL}/room_rates/${roomRateId}`)
                .then(response => setRoomRate(response.data))
                .catch(error => console.error('Error fetching room rate:', error));
        }
    }, [roomRateId]);

    const handleChange = (e) => {
        setRoomRate({ ...roomRate, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiCall = roomRateId
            ? axios.put(`${process.env.REACT_APP_API_URL}/room_rates/${roomRateId}`, roomRate)
            : axios.post('${process.env.REACT_APP_API_URL}/room_rates', roomRate);

        apiCall.then(() => {
            onSuccess();
            setSuccessMessage('Room rate saved successfully!');
            setTimeout(() => setSuccessMessage(''), 3000); // Hide the message after 3 seconds
            setRoomRate({
                price: '',
                check_in_date: '',
                check_out_date: '',
                occupancy_adults: '',
                occupancy_kids: ''
            });
        }).catch(error => console.error('Error saving room rate:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            {roomRateId ? <h3>Edit Room Rate</h3> : <h3>Add Room Rate</h3>}
            {successMessage && <p>{successMessage}</p>}
            <input
                type="number"
                name="price"
                value={roomRate.price}
                onChange={handleChange}
                placeholder="Price"
            />
            <input
                type="date"
                name="check_in_date"
                value={roomRate.check_in_date}
                onChange={handleChange}
                placeholder="Check-in Date"
            />
            <input
                type="date"
                name="check_out_date"
                value={roomRate.check_out_date}
                onChange={handleChange}
                placeholder="Check-out Date"
            />
            <input
                type="number"
                name="occupancy_adults"
                value={roomRate.occupancy_adults}
                onChange={handleChange}
                placeholder="Occupancy Adults"
            />
            <input
                type="number"
                name="occupancy_kids"
                value={roomRate.occupancy_kids}
                onChange={handleChange}
                placeholder="Occupancy Kids"
            />
            <button type="submit">Save Room Rate</button>
        </form>
    );
};

export default RoomRateForm;
