import React from 'react';
import RoomRateList from './components/RoomRateList';
import AddRoomRate from './components/AddRoomRate';

function App() {
    return (
        <div className="App">
            <h1>Room Rate Management</h1>
            <AddRoomRate />
            <RoomRateList />
        </div>
    );
}

export default App;
