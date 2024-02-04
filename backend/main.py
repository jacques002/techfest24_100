from fastapi import FastAPI
app = FastAPI()

@app.get(
        path="/",
        tags=["root"])
async def root():
    return {"message": "Hello Techfest24!"}