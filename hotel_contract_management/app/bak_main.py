from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List  # 添加这一行
import crud, models, schemas
from database import SessionLocal, engine
import uvicorn

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

@app.post("/rooms/", response_model=schemas.Room)
def create_room(room: schemas.RoomCreate, db: Session = Depends(get_db)):
    return crud.create_room(db=db, room=room)

@app.get("/rooms/", response_model=List[schemas.Room])
def read_rooms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    rooms = crud.get_rooms(db, skip=skip, limit=limit)
    return rooms

@app.get("/rooms/{room_id}", response_model=schemas.Room)
def read_room(room_id: int, db: Session = Depends(get_db)):
    db_room = crud.get_room(db, room_id=room_id)
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    return db_room

@app.post("/room_rates/", response_model=schemas.RoomRate)
def create_room_rate(room_rate: schemas.RoomRateCreate, db: Session = Depends(get_db)):
    return crud.create_room_rate(db=db, room_rate=room_rate)

@app.get("/room_rates/", response_model=List[schemas.RoomRate])
def read_room_rates(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    room_rates = crud.get_room_rates(db, skip=skip, limit=limit)
    return room_rates

@app.get("/room_rates/{room_rate_id}", response_model=schemas.RoomRate)
def read_room_rate(room_rate_id: int, db: Session = Depends(get_db)):
    db_room_rate = crud.get_room_rate(db, room_rate_id=room_rate_id)
    if db_room_rate is None:
        raise HTTPException(status_code=404, detail="Room Rate not found")
    return db_room_rate

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
