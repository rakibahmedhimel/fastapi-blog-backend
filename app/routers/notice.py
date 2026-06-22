from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.notice import NoticeOut, NoticeCreate
from app.database import get_db
from app.routers.user import get_current_user
from app.models import notice as notice_model

router = APIRouter(prefix="/notices", tags=["Notices"])


@router.post("/", response_model=NoticeOut)
def create_notice(
    notice: NoticeCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    if not notice.title and not notice.content and not notice.image_url:
        raise HTTPException(
        status_code=400,
        detail="Notice cannot be empty"
    )

    new_notice = notice_model.Notice(
        title=notice.title,
        content=notice.content,
        image_url=notice.image_url,
        user_id=user_id
    )

    db.add(new_notice)
    db.commit()
    db.refresh(new_notice)

    return new_notice

@router.get("/", response_model=list[NoticeOut])
def get_notices(
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user)
):
    return db.query(
        notice_model.Notice
    ).order_by(
        notice_model.Notice.id.desc()
    ).all()



















