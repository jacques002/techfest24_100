from fastapi import APIRouter,WebSocket, Depends
from fastapi.responses import Response
from src.controllers.chat_controller import ChatController
from src.schemas.chat_schemas import ChatAudioRequest, ChatBuildRequest,ChatGreetingRequest
from src.schemas.user_schemas import User
from src.dependencies.dependencies import player_jwt_token_checker
import json
chat_router = APIRouter()
import os
default_user = os.getenv("DEFAULT_USER")

@chat_router.websocket(
    path="/chat/stream_response")
async def stream_response(websocket: WebSocket):
    await websocket.accept()
    chatController = ChatController.get_instance()
    json_data = await websocket.receive_text()
    data_dict=json.loads(json_data)
    print(data_dict)
    stream = await chatController.stream_response(data_dict, default_user)
    try:
        async for chunk in await stream:
            if chunk.choices[0].delta.content is not None:
                await websocket.send_text(chunk.choices[0].delta.content)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        await websocket.close()


@chat_router.get(
    path="/chat/get_audio",
    tags=["chat"])
async def get_audio(chatAudioRequest: ChatAudioRequest = Depends(), user:User = Depends(player_jwt_token_checker)):
    chatController = ChatController.get_instance()
    return Response(content=await chatController.get_audio(chatAudioRequest), media_type="audio/mpeg")

@chat_router.get(
    path="/chat/get_greeting",
    tags=["chat"])
async def get_greeting(chatGreetingRequest: ChatGreetingRequest = Depends(), user:User = Depends(player_jwt_token_checker)):
    chatController = ChatController.get_instance()
    return Response(content=await chatController.get_greeting(chatGreetingRequest), media_type="audio/mpeg")

@chat_router.websocket(
    path="/chat/stream_scenario")
async def stream_scenario(websocket:WebSocket,chatBuildRequest: ChatBuildRequest=Depends()):
    await websocket.accept()
    chatController = ChatController.get_instance()
    stream = await chatController.stream_scenario(chatBuildRequest, default_user)
    try:
        async for chunk in await stream:
            if chunk.choices[0].delta.content is not None:
                await websocket.send_text(chunk.choices[0].delta.content)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        await websocket.close()
