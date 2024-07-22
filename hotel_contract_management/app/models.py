from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class Hotel(Base):
    __tablename__ = 'hotels'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    facilities = Column(String(500))


class Room(Base):
    __tablename__ = 'rooms'
    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey('hotels.id'), nullable=False)
    room_type = Column(String(100), nullable=False)
    occupancy_adults = Column(Integer)
    occupancy_kids = Column(Integer)
    allocation = Column(String(50))
    facilities = Column(String(500))
    board = Column(String(50))
    kids_supplement = Column(Float)
    third_bed_supplement = Column(Float)
    fourth_bed_supplement = Column(Float)

    hotel = relationship("Hotel", back_populates="rooms")
    room_rates = relationship("RoomRate", back_populates="room")


class RoomRate(Base):
    __tablename__ = 'room_rates'
    id = Column(Integer, primary_key=True, index=True)
    room_id = Column(Integer, ForeignKey('rooms.id'), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    price = Column(Float, nullable=False)

    room = relationship("Room", back_populates="room_rates")


Hotel.rooms = relationship("Room", order_by=Room.id, back_populates="hotel")
