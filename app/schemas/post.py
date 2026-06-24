from datetime import datetime
from typing import List
from pydantic import BaseModel

class PostCreate(BaseModel):
    title : str
    content : str
    post_url: str | None = None

class PostUpdate(BaseModel):
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
    post_url: str | None 

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
    post_url: str | None = None

    class Config:
        from_attributes = True