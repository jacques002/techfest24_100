from src.models.user_model import UserModel
from src.schemas.user_schemas import *
from src.schemas.auth_schemas import *
from fastapi.responses import JSONResponse
import bcrypt
import os
from jose import jwt
from datetime import datetime, timedelta
import uuid

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM") 

class Authoriser:
    instance = None

    def __init__(self):
        self.user_model = UserModel()
        self.username_uuid_map = {}
        pass

    @classmethod
    async def get_instance(cls):
        if cls.instance is None:
            cls.instance = Authoriser()
        return cls.instance
    async def authenticate(self, login_request: LoginRequest) -> JSONResponse:
        """
        Authenticates a user.
        """
        response = await self.user_model.get_user(login_request.username)
        if response and bcrypt.checkpw(login_request.password.encode('utf-8'), response['password'].encode('utf-8')):
            print("test")
            return await self._issue_jwt(User(**response))
        return JSONResponse(status_code=401, content={'message': f"Error: {login_request.username} not authenticated"})
    
    async def register(self, register_request:RegisterRequest) -> JSONResponse:
        """
        Registers a new user.
        """
        existence = await self.user_model.check_user_exists(register_request.username)
        if existence:
            return JSONResponse(status_code=400, content={'message': f"Error: {register_request.username} already exists"})
        register_request.password = bcrypt.hashpw(register_request.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        response = await self.user_model.create_user(register_request)
        if response['ResponseMetadata']['HTTPStatusCode'] != 200:
            return JSONResponse(status_code=400, content={'message': f"Error: {register_request.username} not created"})
        return JSONResponse(status_code=200, content={'message': f"Success: {register_request.username} created"})

    async def _issue_jwt(self,user:User) -> JSONResponse:
        """
        Issues a jwt token to user
        """
        # makes sure that only one token is valid for a user at a time
        uuid_str = str(uuid.uuid4())
        payload = {
            'uuid': uuid_str,
            'username': user.username,
            "exp": datetime.utcnow() + timedelta(hours=12) # 12 hours
        }
        self.username_uuid_map[user.username] = uuid_str
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM,)
        return JSONResponse(status_code=200, content={'token': token})

    async def authenticate_user_uuid(self, username, uuid):
        """
        Authenticates a user using a uuid.
        """
        if self.username_uuid_map.get(username,None)==uuid:
            return True
        return False

    async def get_all_users(self) -> JSONResponse:
        """
        Gets all users.
        """
        response = await self.user_model.get_all_users()
        return response