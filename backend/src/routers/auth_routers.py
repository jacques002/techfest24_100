from fastapi import APIRouter, Depends
from src.schemas.user_schemas import *
from src.schemas.auth_schemas import *
from src.controllers.auth_controller import Authoriser
from src.dependencies.dependencies import player_jwt_token_checker
from fastapi.responses import JSONResponse
auth_router = APIRouter()


"""
Unprotected routes
"""
@auth_router.post(
        path="/user/login",
        tags=["auth", "user"])
async def user_login(login_request:LoginRequest):
    authoriser = await Authoriser.get_instance()
    response = await authoriser.authenticate(login_request)
    return response

"""
Protected routes
"""

@auth_router.get(
        path='/user/check_token',
        tags=["auth", "user"]
)
async def check_token(user:User = Depends(player_jwt_token_checker)):
        return JSONResponse(status_code=200, content={'message': f"Success: {user.username} authenticated"})

@auth_router.post(
        path="/user/register",
        tags=["auth", "user"])
async def user_register(register_request:RegisterRequest):
        authoriser = await Authoriser.get_instance()
        response = await authoriser.register(register_request)
        return response


"""
Test routes
"""

# @auth_router.get(
#         path="/delete_all_users",
#         tags=["auth", "user"])
# async def del_test():
#     authoriser = await Authoriser.get_instance()
#     response = await authoriser.delete_all_users()
#     return response

# @auth_router.get(
#         path="/get_all_users",
#         tags=["auth"])
# async def get_test():
#     authoriser = await Authoriser.get_instance()
#     response = await authoriser.get_all_users()
#     return response
