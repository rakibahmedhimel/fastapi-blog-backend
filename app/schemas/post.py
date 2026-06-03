from typing import List
from pydantic import BaseModel
from app.schemas.user import UserOut
class PostCreate(BaseModel):
    title : str
    content : str

class PostOut(BaseModel):
    title : str
    content : str
    owner : UserOut
    
    class Config:
        orm_mode = True 

class PostListResponse(BaseModel):
    total : int
    page : int
    limit : int
    data : List[PostOut]

    class Config:
        orm_mode = True