from fastapi import APIRouter, Depends
from src.controllers.history_controller import HistoryController
from src.schemas.search_schemas import UserSearchHistory
from src.schemas.user_schemas import *
from src.dependencies.dependencies import player_jwt_token_checker

history_router = APIRouter()

@history_router.post(
        path="/history/add",
        tags=["dictionary"])
async def add_history(userSearchHistory:UserSearchHistory, user:User = Depends(player_jwt_token_checker)):
        historyController = await HistoryController().get_instance()
        userSearchHistory.username = user.username
        response = await historyController.put_history(userSearchHistory)
        return response

@history_router.get(
    path='/history/fullScan',
    tags=["dictionary"]
    )
async def fullScan():
    historyController = await HistoryController().get_instance()
    return await historyController.full_table_scan()

@history_router.get(
    path='/history/getNMostRecent',
    tags=["dictionary"]
    )
async def get_all(user:User = Depends(player_jwt_token_checker)):
    historyController = await HistoryController().get_instance()
    return await historyController.get_n_most_recent(user.username)

@history_router.get(
    path='/history/getSpecific',
    tags=["dictionary"]
    )
async def get_specific_history(article:str, user:User = Depends(player_jwt_token_checker)):
    historyController = await HistoryController().get_instance()
    return await historyController.get_specific_history(user.username, article)