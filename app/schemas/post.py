from datetime import datetime
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
    author: str
    likes: int
    liked_by_user: bool   
    created_at: datetime
    
    class Config:
        from_attributes = True

class PostListResponse(BaseModel):
    total : int
    page : int
    limit : int
    data : List[PostOut]

    class Config:
        from_attributes = True

class UserPostOut(BaseModel):
    id: int
    title: str
    content: str
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True