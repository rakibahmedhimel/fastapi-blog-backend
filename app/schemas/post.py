from typing import List
from pydantic import BaseModel
from app.schemas.user import UserOut
class PostCreate(BaseModel):
    title : str
    content : str

class PostOut(BaseModel):
    id: int
    title: str
    content: str
    user_id: int
    likes: int

    class Config:
        orm_mode = True 

class PostListResponse(BaseModel):
    total : int
    page : int
    limit : int
    data : List[PostOut]

    class Config:
        orm_mode = True