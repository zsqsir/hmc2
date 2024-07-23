import React, { useState } from 'react';
import axios from 'axios';

const HotelForm = ({ addHotel }) => {
    const [hotel, setHotel] = useState({
        name: '',
        facilities: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHotel(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/hotels/`, hotel);
            addHotel(response.data);
            setHotel({ name: '', facilities: '' }); // Reset form fields
        } catch (error) {
            console.error('Error adding hotel:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={hotel.name}
                onChange={handleChange}
                placeholder="Hotel Name"
                required
            />
            <input
                name="facilities"
                value={hotel.facilities}
                onChange={handleChange}
                placeholder="Facilities"
            />
            <button type="submit">Add Hotel</button>
        </form>
    );
};

export default HotelForm;
