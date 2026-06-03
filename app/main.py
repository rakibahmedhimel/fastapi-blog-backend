from fastapi import FastAPI
from app.database import engine, Base
from app.routers import user, post, comment, like
from app import models
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user.router)
app.include_router(post.router)
app.include_router(comment.router)
app.include_router(like.router)


