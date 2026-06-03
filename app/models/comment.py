from sqlalchemy import Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, index=True, primary_key=True)
    content = Column(String, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="comments")
    post = relationship("Post", back_populates="comments")
