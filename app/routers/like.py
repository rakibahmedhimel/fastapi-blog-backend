from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.models import like as models
from app.models import post as post_model
from app.database import get_db
from app.routers.user import get_current_user

router = APIRouter(prefix="/likes", tags=["Likes"])

@router.post("/{post_id}")
def like_post(post_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    post = db.query(post_model.Post).filter(post_model.Post.id == post_id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post Not Found")
    
    existing_like = db.query(models.Like).filter(models.Like.post_id==post_id , models.Like.user_id == user_id).first()

    if existing_like:
        db.delete(existing_like)
        db.commit()
        return {"message" : "Unliked"}
    else:
        new_like = models.Like(
            user_id = user_id,
            post_id = post_id
        )
        db.add(new_like)
        db.commit()
        return {"message" : "Liked"}


@router.get("/{post_id}")
def count_like(post_id : int, db: Session = Depends(get_db)):
    count = db.query(models.Like).filter(models.Like.post_id == post_id).count()
    
    return {"post_id" : post_id, "likes" : count}

