from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class RoomRateBase(BaseModel):
    room_id: int
    start_date: date
    end_date: date
    price: float

class RoomRateCreate(RoomRateBase):
    pass

class RoomRateUpdate(RoomRateBase):
    pass

class RoomRate(RoomRateBase):
    id: int
    class Config:
        from_attributes = True  # 修改这里

class RoomRateResponse(BaseModel):
    id: int
    room_id: int
    start_date: date
    end_date: date
    price: float
    hotel_name: str
    room_type: str
    occupancy_adults: int
    occupancy_kids: int

    class Config:
        from_attributes = True

class RoomRateResponseId(BaseModel):
    id: int

    class Config:
        from_attributes = True

class RoomRateOut(BaseModel):
    id: int
    room_id: int
    start_date: str
    end_date: str
    price: float

    class Config:
        from_attributes = True


class RoomBase(BaseModel):
    hotel_id: int
    room_type: str
    occupancy_adults: Optional[int]
    occupancy_kids: Optional[int]
    allocation: Optional[str]
    facilities: Optional[str]
    board: Optional[str]
    kids_supplement: Optional[float]
    third_bed_supplement: Optional[float]
    fourth_bed_supplement: Optional[float]

class RoomCreate(RoomBase):
    pass

class RoomResponse(RoomBase):
    pass

class RoomUpdate(BaseModel):
    hotel_id: Optional[int] = None
    room_type: Optional[str] = None
    occupancy_adults: Optional[int] = None
    occupancy_kids: Optional[int] = None
    allocation: Optional[str] = None
    facilities: Optional[str] = None
    board: Optional[str] = None
    kids_supplement: Optional[float] = None
    third_bed_supplement: Optional[float] = None
    fourth_bed_supplement: Optional[float] = None

class Room(RoomBase):
    id: int
    room_rates: List[RoomRate] = []
    class Config:
        from_attributes = True  # 修改这里

class HotelBase(BaseModel):
    name: str
    facilities: Optional[str]

class HotelCreate(HotelBase):
    pass

class Hotel(HotelBase):
    id: int
    rooms: List[Room] = []
    class Config:
        from_attributes = True  # 修改这里

class HotelUpdate(HotelBase):
    pass
