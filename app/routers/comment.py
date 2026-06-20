from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import comment as models, post as post_model
from app.models import user as user_model
from app.schemas.comment import CommentCreate, CommentOut
from app.routers.user import get_current_user

router = APIRouter(prefix="/comments", tags=["Comments"])


@router.post("/{post_id}", response_model=CommentOut)
def create_comment(
    post_id: int,
    comment: CommentCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    post = db.query(post_model.Post).filter(post_model.Post.id == post_id).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post Not Found")

    # 🔥 create comment
    new_comment = models.Comment(
        content=comment.content,
        user_id=user_id,
        post_id=post_id
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    # 🔥 get username (IMPORTANT FIX)
    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()

    # 🔥 return SAME FORMAT as GET
    return {
        "id": new_comment.id,
        "content": new_comment.content,
        "user_id": new_comment.user_id,
        "post_id": new_comment.post_id,
        "author": user.name
    }


@router.get("/{post_id}")
def get_comments(post_id: int, db: Session = Depends(get_db)):

    comments = db.query(
        models.Comment,
        user_model.User.name
    ).join(
        user_model.User, user_model.User.id == models.Comment.user_id
    ).filter(
        models.Comment.post_id == post_id
    ).all()

    result = []

    for comment, username in comments:
        result.append({
            "id": comment.id,
            "content": comment.content,
            "user_id": comment.user_id,
            "post_id": comment.post_id,
            "author": username,
            "created_at": comment.created_at
        })

    return result



@router.delete("/{id}")
def delete_comment(id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user)):
    
    comment = db.query(models.Comment).filter(models.Comment.id == id).first()

    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    if comment.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(comment)
    db.commit()

    return {"message": "Comment deleted"}