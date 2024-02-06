from fastapi import APIRouter, Depends,WebSocket
from src.schemas.story_schemas import StoryStartRequest, StoryContinueRequest
from src.schemas.user_schemas import User
from src.dependencies.dependencies import player_jwt_token_checker
from src.controllers.story_controller import StoryController
import json
import os
story_router = APIRouter()

default_user = os.getenv("DEFAULT_USER")

@story_router.websocket(
        path="/story/begin_story")
async def begin_story(websocket: WebSocket):
    await websocket.accept()
    storyController = StoryController.get_instance()
    json_data = await websocket.receive_text()
    data_dict=json.loads(json_data)
    storyStartRequest = StoryStartRequest(**data_dict)
    stream = await storyController.begin_story(storyStartRequest, username=default_user)
    try:
        async for chunk in await stream:
            if chunk.choices[0].delta.content is not None:
                await websocket.send_text(chunk.choices[0].delta.content)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        await websocket.close()

@story_router.get(
        path="/story/get_image",
        tags=["story"])
async def get_image(query:str, user:User = Depends(player_jwt_token_checker)):
    storyController = StoryController.get_instance()
    return await storyController.gen_story_image(query)

@story_router.post(
        path="/story/get_actions",
        tags=["story"])
async def get_actions(storyContinueRequest:StoryContinueRequest, user:User = Depends(player_jwt_token_checker)):
    storyController = StoryController.get_instance()
    return await storyController.get_actions(storyContinueRequest, default_user)

@story_router.websocket(
        path="/story/continue_story")
async def continue_story(websocket: WebSocket):
    await websocket.accept()
    storyController = StoryController.get_instance()
    json_data = await websocket.receive_text()
    data_dict=json.loads(json_data)
    print(data_dict)
    storyContinueRequest = StoryContinueRequest(**data_dict)
    stream = await storyController.continue_story(storyContinueRequest, username=default_user)
    try:
        async for chunk in await stream:
            if chunk.choices[0].delta.content is not None:
                await websocket.send_text(chunk.choices[0].delta.content)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        await websocket.close()