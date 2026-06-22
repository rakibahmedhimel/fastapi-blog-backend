from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Notice(Base):
    __tablename__ = "notices"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=True)
    content = Column(String, nullable=True)
    image_url = Column(String, nullable=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )