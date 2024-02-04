from fastapi import FastAPI
import os 
from dotenv import load_dotenv
from src.routers.explain_router import explain_router
load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

app = FastAPI()
app.include_router(explain_router)


@app.get(
        path="/",
        tags=["root"])
async def root():
    return {"message": "Hello Techfest24!"}