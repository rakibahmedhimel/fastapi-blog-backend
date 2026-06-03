from pydantic import BaseModel, EmailStr, Field

class User(BaseModel):
  name : str = Field(..., min_length=3, max_length=50)
  email : EmailStr
  password : str

class Login(BaseModel):
  email : EmailStr
  password : str

class UserOut(BaseModel):
  name : str
  
  class Config:
    orm_mode = True

class UserResponse(BaseModel):
  email : EmailStr
  name : str

  class Config:
    orm_mode = True