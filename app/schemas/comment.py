from datetime import datetime
from pydantic import BaseModel

class CommentCreate(BaseModel):
    content: str

class CommentOut(BaseModel):
    id: int
    content: str
    user_id: int
    post_id: int
    author: str   # ✅ NEW
    created_at: datetime
    class Config:
        from_attributes = True