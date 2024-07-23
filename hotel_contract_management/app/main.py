import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import crud, models, schemas
from database import SessionLocal, engine
import uvicorn
import logging
from models import RoomRate, Room, Hotel
from datetime import date



# Set up logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 添加 CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 允许 React 应用访问
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/hotels/", response_model=schemas.Hotel)
def create_hotel(hotel: schemas.HotelCreate, db: Session = Depends(get_db)):
    return crud.create_hotel(db=db, hotel=hotel)

@app.get("/hotels/", response_model=List[schemas.Hotel])
def read_hotels(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    hotels = crud.get_hotels(db, skip=skip, limit=limit)
    return hotels

@app.get("/hotels/{hotel_id}", response_model=schemas.Hotel)
def read_hotel(hotel_id: int, db: Session = Depends(get_db)):
    db_hotel = crud.get_hotel(db, hotel_id=hotel_id)
    if db_hotel is None:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return db_hotel

@app.put("/hotels/{hotel_id}", response_model=schemas.Hotel)
def update_hotel(hotel_id: int, hotel: schemas.HotelUpdate, db: Session = Depends(get_db)):
    db_hotel = crud.update_hotel(db, hotel_id=hotel_id, hotel_update=hotel)
    if db_hotel is None:
        raise HTTPException(status_code=404, detail="hotel not found")
    return db_hotel

@app.delete("/hotels/{hotel_id}", response_model=schemas.Hotel)
def delete_hotel(hotel_id: int, db: Session = Depends(get_db)):
    db_hotel = crud.delete_hotel(db, hotel_id=hotel_id)
    if db_hotel is None:
        raise HTTPException(status_code=404, detail="hotel not found")
    return db_hotel

@app.post("/rooms/", response_model=schemas.Room)
def create_room(room: schemas.RoomCreate, db: Session = Depends(get_db)):
    return crud.create_room(db=db, room=room)

# @app.get("/rooms/", response_model=List[schemas.Room])
# def read_rooms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     rooms = crud.get_rooms(db, skip=skip, limit=limit)
#     return rooms

@app.get("/rooms/", response_model=List[schemas.Room])
def read_rooms(hotel_id: int= 0, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    if hotel_id:
        rooms = crud.get_rooms_by_hotel(db, hotel_id=hotel_id, skip=skip, limit=limit)
    else:
        rooms = crud.get_rooms(db, skip=skip, limit=limit)
    return rooms

@app.get("/rooms/{room_id}", response_model=schemas.Room)
def read_room(room_id: int, db: Session = Depends(get_db)):
    db_room = crud.get_room(db, room_id=room_id)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room

@app.put("/rooms/{room_id}", response_model=schemas.Room)
def update_room(room_id: int, room: schemas.RoomUpdate, db: Session = Depends(get_db)):
    db_room = crud.update_room(db, room_id=room_id, room_update=room)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room

@app.delete("/rooms/{room_id}", response_model=schemas.Room)
def delete_room(room_id: int, db: Session = Depends(get_db)):
    db_room = crud.delete_room(db, room_id=room_id)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room

@app.post("/room_rates/", response_model=schemas.RoomRate)
def create_room_rate(room_rate: schemas.RoomRateCreate, db: Session = Depends(get_db)):
    return crud.create_room_rate(db=db, room_rate=room_rate)

# @app.get("/room_rates/", response_model=List[schemas.RoomRate])
# def read_room_rates(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     room_rates = crud.get_room_rates(db, skip=skip, limit=limit)
#     return room_rates

@app.get("/room_rates/{room_rate_id}", response_model=schemas.RoomRate)
def read_room_rate(room_rate_id: int, db: Session = Depends(get_db)):
    db_room_rate = crud.get_room_rate(db, room_rate_id=room_rate_id)
    if db_room_rate is None:
        raise HTTPException(status_code=404, detail="Room Rate not found")
    return db_room_rate

@app.post("/room_rates/", response_model=schemas.RoomRate)
def create_room_rate(room_rate: schemas.RoomRateCreate, db: Session = Depends(get_db)):
    return crud.create_room_rate(db=db, room_rate=room_rate)

# @app.get("/room_rates/", response_model=List[schemas.RoomRate])
# def read_room_rates(
#     check_in_date: str = None,
#     check_out_date: str = None,
#     occupancy_adults: int = None,
#     occupancy_kids: int = None,
#     sort_field: str = 'price',
#     sort_order: str = 'asc',
#     skip: int = 0,
#     limit: int = 100,
#     db: Session = Depends(get_db)
# ):
#     room_rates = crud.get_room_rates(
#         db, check_in_date, check_out_date, occupancy_adults, occupancy_kids, sort_field, sort_order, skip, limit
#     )
#     return room_rates

@app.get("/room_rates/", response_model=List[schemas.RoomRateResponse])
def read_room_rates(
        # hotel_id: Optional[int] = None,
        # room_id: Optional[int] = None,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None,
        min_price: Optional[str] = None,
        max_price: Optional[str] = None,
        occupancy_adults: Optional[str] = None,
        occupancy_kids: Optional[str] = None,
        sort_by: Optional[str] = None
):
    db: Session = SessionLocal()
    try:
        # query = db.query(RoomRate).join(Room).join(Hotel)
        query = db.query(
            models.RoomRate.id,
            models.RoomRate.room_id,
            models.RoomRate.start_date,
            models.RoomRate.end_date,
            models.RoomRate.price,
            models.Hotel.name.label('hotel_name'),
            models.Room.room_type,
            models.Room.occupancy_kids,
            models.Room.occupancy_adults
        ).join(models.Room, models.RoomRate.room_id == models.Room.id).join(models.Hotel,
                                                                            models.Room.hotel_id == models.Hotel.id)

        # Handle date conversion
        if start_date:
            try:
                start_date_obj = date.fromisoformat(start_date)
                query = query.filter(RoomRate.start_date <= start_date_obj)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid start_date format")

        if end_date:
            try:
                end_date_obj = date.fromisoformat(end_date)
                query = query.filter(RoomRate.end_date >= end_date_obj)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid end_date format")

        # Handle price conversion
        if min_price:
            try:
                min_price_value = float(min_price)
                query = query.filter(RoomRate.price >= min_price_value)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid min_price format")

        if max_price:
            try:
                max_price_value = float(max_price)
                query = query.filter(RoomRate.price <= max_price_value)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid max_price format")

        # Handle occupancy conversion
        if occupancy_adults:
            try:
                occupancy_adults_value = int(occupancy_adults)
                query = query.filter(Room.occupancy_adults == occupancy_adults_value)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid occupancy_adults format")

        if occupancy_kids:
            try:
                occupancy_kids_value = int(occupancy_kids)
                query = query.filter(Room.occupancy_kids == occupancy_kids_value)
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid occupancy_kids format")

        # Apply filters
        # if hotel_id:
        #     query = query.filter(Room.hotel_id == hotel_id)
        # if room_id:
        #     query = query.filter(RoomRate.room_id == room_id)

        # Sorting
        if sort_by:
            if sort_by == 'price':
                query = query.order_by(RoomRate.price)
            elif sort_by == '-price':
                query = query.order_by(RoomRate.price.desc())

        # Execute query
        # room_rates = query.all()
        results = query.all()
        print('results=', results)
        room_rates = [
            schemas.RoomRateResponse(
                id=row.id,
                room_id=row.room_id,
                start_date=row.start_date,
                end_date=row.end_date,
                price=row.price,
                hotel_name=row.hotel_name,
                room_type=row.room_type,
                occupancy_kids=row.occupancy_kids,
                occupancy_adults =row.occupancy_adults
            ) for row in results
        ]
    finally:
        db.close()

    print('room_rates=', room_rates)
    return room_rates


@app.get("/room_rates/{room_rate_id}", response_model=schemas.RoomRate)
def read_room_rate(room_rate_id: int, db: Session = Depends(get_db)):
    db_room_rate = crud.get_room_rate(db, room_rate_id=room_rate_id)
    if db_room_rate is None:
        raise HTTPException(status_code=404, detail="Room rate not found")
    return db_room_rate



@app.put("/room_rates/{room_rate_id}", response_model=schemas.RoomRate)
def update_room_rate(room_rate_id: int, room_rate: schemas.RoomRateUpdate, db: Session = Depends(get_db)):
    return crud.update_room_rate(db=db, room_rate_id=room_rate_id, room_rate=room_rate)

@app.delete("/room_rates/{room_rate_id}", response_model=schemas.RoomRate)
def delete_room_rate(room_rate_id: int, db: Session = Depends(get_db)):
    return crud.delete_room_rate(db=db, room_rate_id=room_rate_id)


# Route to get rooms by hotel ID
@app.get("/hotels/{hotel_id}/rooms", response_model=List[schemas.RoomResponse])
def get_rooms_by_hotel(hotel_id: int, db: Session = Depends(get_db)):
    # Query to get rooms for the given hotel ID
    rooms = db.query(Room).filter(Room.hotel_id == hotel_id).all()
    return rooms

@app.get("/rooms/{room_id}/room_rates", response_model=List[schemas.RoomRateResponseId])
def get_room_rates_by_room(room_id: int, db: Session = Depends(get_db)):
    room_rates = db.query(RoomRate).filter(RoomRate.room_id == room_id).all()
    return room_rates

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
