from pydantic import BaseModel
from app.schemas.user import UserOut

class CommentCreate(BaseModel):
    content : str


class CommentOut(BaseModel):
    content : str
    user : UserOut

    class Config:
        orm_mode = True