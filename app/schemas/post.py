from typing import List
from pydantic import BaseModel

class PostCreate(BaseModel):
    title : str
    content : str

class PostOut(BaseModel):
    id: int
    title: str
    content: str
    user_id: int
    author: str   # ✅ NEW
    likes: int

    class Config:
        from_attributes = True

class PostListResponse(BaseModel):
    total : int
    page : int
    limit : int
    data : List[PostOut]

    class Config:
        from_attributes = True