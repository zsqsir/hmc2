from sqlalchemy.orm import Session
import models, schemas
# from models import Room
# from schemas import RoomCreate, RoomUpdate

def get_hotel(db: Session, hotel_id: int):
    return db.query(models.Hotel).filter(models.Hotel.id == hotel_id).first()

def get_hotels(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Hotel).offset(skip).limit(limit).all()

def create_hotel(db: Session, hotel: schemas.HotelCreate):
    db_hotel = models.Hotel(name=hotel.name, facilities=hotel.facilities)
    db.add(db_hotel)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel

def update_hotel(db: Session, hotel_id: int, hotel_update: schemas.HotelUpdate):
    db_hotel = db.query(models.Hotel).filter(models.Hotel.id == hotel_id).first()
    if db_hotel is None:
        return None
    for key, value in hotel_update.dict(exclude_unset=True).items():
        setattr(db_hotel, key, value)
    db.commit()
    db.refresh(db_hotel)
    return db_hotel

def delete_hotel(db: Session, hotel_id: int):
    db_hotel = db.query(models.Hotel).filter(models.Hotel.id == hotel_id).first()
    if db_hotel is None:
        return None
    db.delete(db_hotel)
    db.commit()
    return db_hotel


def get_room(db: Session, room_id: int):
    return db.query(models.Room).filter(models.Room.id == room_id).first()

def get_rooms(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Room).offset(skip).limit(limit).all()

def create_room(db: Session, room: schemas.RoomCreate):
    db_room = models.Room(**room.dict())
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

def update_room(db: Session, room_id: int, room_update: schemas.RoomUpdate):
    db_room = db.query(models.Room).filter(models.Room.id == room_id).first()
    if db_room is None:
        return None
    for key, value in room_update.dict(exclude_unset=True).items():
        setattr(db_room, key, value)
    db.commit()
    db.refresh(db_room)
    return db_room

def delete_room(db: Session, room_id: int):
    db_room = db.query(models.Room).filter(models.Room.id == room_id).first()
    if db_room is None:
        return None
    db.delete(db_room)
    db.commit()
    return db_room

def get_room_rate(db: Session, room_rate_id: int):
    return db.query(models.RoomRate).filter(models.RoomRate.id == room_rate_id).first()

def get_room_rates(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.RoomRate).offset(skip).limit(limit).all()

def create_room_rate(db: Session, room_rate: schemas.RoomRateCreate):
    db_room_rate = models.RoomRate(**room_rate.dict())
    db.add(db_room_rate)
    db.commit()
    db.refresh(db_room_rate)
    return db_room_rate

def delete_room_rate(db: Session, room_rate_id: int):
    db_room_rate = db.query(models.RoomRate).filter(models.RoomRate.id == room_rate_id).first()
    if db_room_rate is None:
        return None
    db.delete(db_room_rate)
    db.commit()
    return db_room_rate

def get_rooms_by_hotel(db: Session, hotel_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Room).filter(models.Room.hotel_id == hotel_id).offset(skip).limit(limit).all()

def get_room_rates(
    db: Session,
    check_in_date: str = None,
    check_out_date: str = None,
    occupancy_adults: int = None,
    occupancy_kids: int = None,
    sort_field: str = 'price',
    sort_order: str = 'asc',
    skip: int = 0,
    limit: int = 100
):
    query = db.query(models.RoomRate)
    if check_in_date:
        query = query.filter(models.RoomRate.check_in_date >= check_in_date)
    if check_out_date:
        query = query.filter(models.RoomRate.check_out_date <= check_out_date)
    if occupancy_adults:
        query = query.filter(models.RoomRate.occupancy_adults >= occupancy_adults)
    if occupancy_kids:
        query = query.filter(models.RoomRate.occupancy_kids >= occupancy_kids)

    if sort_field and sort_order:
        if sort_order == 'asc':
            query = query.order_by(getattr(models.RoomRate, sort_field).asc())
        else:
            query = query.order_by(getattr(models.RoomRate, sort_field).desc())

    return query.offset(skip).limit(limit).all()
