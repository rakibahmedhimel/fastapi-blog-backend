from sqlalchemy import DateTime, Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database import Base

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, index=True, primary_key=True)
    content = Column(String, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="comments")
    post = relationship("Post", back_populates="comments")
