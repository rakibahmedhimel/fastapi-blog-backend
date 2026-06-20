from sqlalchemy import Column, DateTime, Integer, ForeignKey
from app.database import Base
from sqlalchemy.sql import func
class Like(Base):
    __tablename__ = "likes"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True)