from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import desc, func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import post as models
from app.models import like as like_model
from app.models import user as user_model
from app.schemas.post import PostCreate, PostOut, PostListResponse
from app.routers.user import get_current_user

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.get("/", response_model=PostListResponse)
def get_all_posts(page: int = 1, limit: int = 10, db: Session = Depends(get_db)):
    skip = (page - 1) * limit

    total = db.query(models.Post).count()

    posts = db.query(
        models.Post,
        user_model.User.name,
        func.count(like_model.Like.post_id).label("likes")
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

    for post, username, likes in posts:
        result.append({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "user_id": post.user_id,
            "author": username,   # ✅ NEW
            "likes": likes
        })

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "data": result
    }


@router.post("/createpost")
def create_post(post: PostCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    new_post = models.Post(
        title=post.title,
        content=post.content,
        user_id=user_id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post


@router.get("/me", response_model=list[PostOut])
def get_users_posts(db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    user_posts = db.query(models.Post).filter(models.Post.user_id == user_id).all()
    return user_posts


@router.put("/{id}")
def edit_user_post(id: int, updated_post: PostCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
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