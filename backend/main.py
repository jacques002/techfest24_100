from fastapi import FastAPI
import os 
from dotenv import load_dotenv
from src.routers.explain_router import explain_router
from src.routers.chat_router import chat_router
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(explain_router)
app.include_router(chat_router)

@app.get(
        path="/",
        tags=["root"])
async def root():
    return {"message": "Hello Techfest24!"}