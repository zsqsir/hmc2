import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomRateList.css';

const RoomRateList = () => {
    const [roomRates, setRoomRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [filters, setFilters] = useState({
        hotel_id: '',
        room_id: '',
        start_date: '',
        end_date: '',
        min_price: '',
        max_price: '',
        occupancy_adults: '',
        occupancy_kids: '',
        sort_by: '',
    });

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('${process.env.REACT_APP_API_URL}/hotels/');
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels', error);
            }
        };

        const fetchRooms = async (hotelId) => {
            try {
                const response = await axios.get('${process.env.REACT_APP_API_URL}/rooms/', { params: { hotel_id: hotelId } });
                setRooms(response.data);
            } catch (error) {
                console.error('Error fetching rooms', error);
            }
        };

        if (filters.hotel_id) {
            fetchRooms(filters.hotel_id);
        } else {
            setRooms([]);
        }

        fetchHotels();
    }, [filters.hotel_id]);

    useEffect(() => {
        const fetchRoomRates = async () => {
            try {
                const response = await axios.get('${process.env.REACT_APP_API_URL}/room_rates/', { params: filters });
                console.log("Fetched data:", response.data); // Log the response data
                setRoomRates(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching room rates', error);
                setLoading(false);
            }
        };
        fetchRoomRates();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleDelete = async (id) => {
        // Logic to handle delete
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/room_rates/${id}`);
            setRoomRates(roomRates.filter(rate => rate.id !== id));
            console.log(`Deleted room rate with id: ${id}`);
        } catch (error) {
            console.error('Error deleting room rate', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    // Create a formatter for the Euro currency
    const euroFormatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });

    return (
        <div>
            <h1>Room Rates</h1>
            <form>
                <select name="hotel_id" onChange={handleFilterChange} value={filters.hotel_id}>
                    <option value="">Select Hotel</option>
                    {hotels.map(hotel => (
                        <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                    ))}
                </select>
                <select name="room_id" onChange={handleFilterChange} value={filters.room_id}>
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                        <option key={room.id} value={room.id}>{room.room_type}</option>
                    ))}
                </select>
                <input type="date" name="start_date" placeholder="Start Date" onChange={handleFilterChange} value={filters.start_date} />
                <input type="date" name="end_date" placeholder="End Date" onChange={handleFilterChange} value={filters.end_date} />
                <input type="number" name="min_price" placeholder="Min Price" onChange={handleFilterChange} value={filters.min_price} />
                <input type="number" name="max_price" placeholder="Max Price" onChange={handleFilterChange} value={filters.max_price} />
                <input type="number" name="occupancy_adults" placeholder="Occupancy Adults" onChange={handleFilterChange} value={filters.occupancy_adults} />
                <input type="number" name="occupancy_kids" placeholder="Occupancy Kids" onChange={handleFilterChange} value={filters.occupancy_kids} />
                <select name="sort_by" onChange={handleFilterChange} value={filters.sort_by}>
                    <option value="">Sort By</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="-price">Price (High to Low)</option>
                </select>
                <button type="button" onClick={() => setFilters({...filters})}>Search</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Hotel Name</th>
                        <th>Room Type</th>
                        <th>Price</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Occupancy Adults</th>
                        <th>Occupancy Kids</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roomRates.map(rate => (
                        <tr key={rate.id}>
                            <td>{rate.hotel_name}</td>
                            <td>{rate.room_type}</td>
                            <td>{euroFormatter.format(rate.price)}</td>
                            <td>{new Date(rate.start_date).toLocaleDateString()}</td>
                            <td>{new Date(rate.end_date).toLocaleDateString()}</td>
                            <td className="right-align">{rate.occupancy_adults}</td>
                            <td className="right-align">{rate.occupancy_kids}</td>
                            <td>
                                <button onClick={() => handleDelete(rate.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomRateList;
