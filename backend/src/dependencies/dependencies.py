from fastapi import Header, HTTPException
from jose import jwt, JWTError
from src.controllers.auth_controller import Authoriser
from src.schemas.user_schemas import User
import os
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM") 

async def player_jwt_token_checker(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated or invalid token format")

    token = authorization.split(" ")[1]
    try:
        # Validate the token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Add more checks if needed
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    authoriser = await Authoriser.get_instance()
    # if not await authoriser.authenticate_user_uuid(payload['username'],payload['uuid']):
    #     raise HTTPException(status_code=401, detail="Invalid token")
    return User(**payload)
