from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy import case, desc, func
from sqlalchemy.orm import Session
import os
import shutil
import cloudinary.uploader
import app.utils.cloudinary

from app.database import get_db
from app.models import post as models
from app.models import like as like_model
from app.models import user as user_model
from app.schemas.post import PostCreate, PostOut, PostListResponse, PostUpdate, UserPostOut
from app.routers.user import get_current_user

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.get("/", response_model=PostListResponse)
def get_all_posts(page: int = 1, limit: int = 10, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    skip = (page - 1) * limit

    total = db.query(models.Post).count()

    posts = db.query(
        models.Post,
        user_model.User.name,
        func.count(like_model.Like.post_id).label("likes"),
        func.count(
            case(
                (like_model.Like.user_id == user_id, 1)
            )
        ).label("liked_by_user")
    ).join(
        user_model.User, user_model.User.id == models.Post.user_id
    ).outerjoin(
        like_model.Like, like_model.Like.post_id == models.Post.id
    ).group_by(
        models.Post.id, user_model.User.name
    ).order_by(
        desc(models.Post.id)
    ).offset(skip).limit(limit).all()

    result = []

    for post, username, avatar_url, likes, liked_by_user in posts:
        result.append({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "user_id": post.user_id,
            "author": username,
            "avatar_url": avatar_url,
            "likes": likes,
            "liked_by_user": liked_by_user > 0,
            "created_at": post.created_at,
            "post_url" : post.post_url
        })

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": result
    }


@router.post("/createpost")
async def create_post(
    title: str = Form(""),
    content: str = Form(""),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    
    post_url = None

    if image:
        result = cloudinary.uploader.upload(
            image.file,
            folder="batchbook/posts"
        )

        post_url = result["secure_url"]

    new_post = models.Post(
        title=title,
        content=content,
        post_url=post_url,
        user_id=user_id
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post


@router.get("/me", response_model=list[UserPostOut])
def get_users_posts(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    return db.query(models.Post)\
             .filter(models.Post.user_id == user_id)\
             .all()


@router.put("/{id}")
def edit_user_post(id: int, updated_post: PostUpdate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if post.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not Authorized")
    
    post.title = updated_post.title
    post.content = updated_post.content


    db.commit()
    db.refresh(post)
    
    return {"message": "Post Successfully Updated"}


@router.delete("/{id}")
def delete_user_post(id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    post = db.query(models.Post).filter(models.Post.id == id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post Not Found")
    
    if post.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not Authorized")
    
    db.delete(post)
    db.commit()

    return {"message": "Successfully Deleted"}


