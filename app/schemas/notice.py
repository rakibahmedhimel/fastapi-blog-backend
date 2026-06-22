from datetime import datetime
from pydantic import BaseModel


class NoticeCreate(BaseModel):
    title: str | None = None
    content: str | None = None
    image_url: str | None = None

class NoticeOut(BaseModel):
    id: int
    title: str | None
    content: str | None
    image_url: str | None
    created_at: datetime

    class Config:
        from_attributes = True