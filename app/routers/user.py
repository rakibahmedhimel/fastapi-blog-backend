from typing import List

from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from app.auth.token import create_access_token
from app.config import SECRET_KEY, ALGORITHM
from app.schemas.user import UserResponse, User, Login
from app.database import get_db
from app.auth.hashing import hash_password, verify_password
from app.models import user as models
from app.models import post as post_model
from app.models import comment as comment_model
from app.models import like as like_model

router = APIRouter()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
def get_current_user(token: str = Depends(oauth2_scheme)):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    user_id = payload.get("user_id")

    if user_id is None:
      raise HTTPException(status_code=401, detail="Invalid Token!")
    
    return user_id
  except JWTError:
    raise HTTPException(status_code=401, detail="Token expired or invalid!")


@router.get("/")
def homepage():
  return {"message": "API is working"}

@router.post('/register', response_model=UserResponse)
def create_user(user : User, db : Session = Depends(get_db)):
  hashed_pwd = hash_password(user.password)

  existing_email = db.query(models.User).filter(models.User.email == user.email).first()
  if existing_email:
    raise HTTPException(status_code=409, detail="User Already Exists!")
  

  existing_name = db.query(models.User).filter(models.User.name == user.name).first()
  if existing_name:
    raise HTTPException(status_code=400, detail="Username is already taken")
  
  new_user = models.User(
    name = user.name,
    email = user.email,
    password = hashed_pwd
  )
  db.add(new_user)
  db.commit()
  db.refresh(new_user)
  return {
    "email" : new_user.email,
    "name" : new_user.name
  }

@router.post("/login")
def user_login(user: Login, db: Session = Depends(get_db)):
  db_user = db.query(models.User).filter(models.User.email == user.email).first()
  if not db_user:
    raise HTTPException(status_code=404, detail="User Not Registered!")
  if not verify_password(user.password, db_user.password):
    raise HTTPException(status_code=401, detail="Wrong Password!")
  
  access_token = create_access_token({"user_id": db_user.id})

  return {"access_token" : access_token, "token_type" : "bearer"}


@router.get("/users", response_model=List[UserResponse])
def all_user(db: Session = Depends(get_db)):
  return db.query(models.User).all()

@router.get("/users/me")
def get_me(
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    post_count = db.query(post_model.Post).filter(
        post_model.Post.user_id == user_id
    ).count()

    comment_count = db.query(comment_model.Comment).filter(
        comment_model.Comment.user_id == user_id
    ).count()

    likes_count = db.query(like_model.Like)\
        .filter(like_model.Like.user_id == user_id)\
        .count()

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "avatar_url": user.avatar_url,
        "post_count": post_count,
        "comment_count": comment_count,
        "likes_count": likes_count
    }


@router.put("/users/avatar")
def update_avatar(
    avatar_url: str,
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    user.avatar_url = avatar_url

    db.commit()

    return {"message": "Avatar updated"}


@router.get("/users/count")
def user_count(db: Session = Depends(get_db)):
  count = db.query(models.User).count()
  return {"Total_users" : count}


@router.get("/users/gmail", response_model=List[UserResponse])
def gmail_users(db: Session = Depends(get_db)):
  filtered_users = db.query(models.User).filter(models.User.email.like("%@gmail.com")).all()
  return filtered_users


@router.get("/users/yahoo", response_model=List[UserResponse])
def yahoo_users(db: Session = Depends(get_db)):
  filtered_users = db.query(models.User).filter(models.User.email.like("%@yahoo.com")).all()
  return filtered_users


@router.get("/users/search/{name}", response_model=List[UserResponse])
def search_by_name(name : str, db: Session = Depends(get_db)):
  filtered_users = db.query(models.User).filter(models.User.name.ilike(f"%{name}%")).all()
  if not filtered_users:
    raise HTTPException(status_code=404, detail="No user found for this name")
  return filtered_users
  

@router.get("/users/{id}", response_model=List[UserResponse])
def get_user_by_id(id: int, db: Session = Depends(get_db)):
  filtered_user = db.query(models.User).filter(models.User.id == id).first()
  if not filtered_user:
    raise HTTPException(status_code=404, detail="User not found!")
  return filtered_user
  

@router.delete("/users/{id}")
def delete_user(id : int, db: Session = Depends(get_db)):
    filtered_user = db.query(models.User).filter(models.User.id == id).first()
    if not filtered_user:
      raise HTTPException(status_code=404, detail="User not found!")
    db.delete(filtered_user)
    db.commit()
    return {"message": "Successfully deleted"}
  

@router.put("/users/{id}")
def update_user(id : int, updated_user: User, db: Session = Depends(get_db)):
  filtered_user = db.query(models.User).filter(models.User.id == id).first()
  if not filtered_user:
    raise HTTPException(status_code=404, detail="User not found!")
  filtered_user.name = updated_user.name
  filtered_user.email = updated_user.email
  db.commit()
  db.refresh(filtered_user)
  return {"message": "Successfully Updated"}
  