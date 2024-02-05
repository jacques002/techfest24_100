from fastapi import APIRouter,WebSocket, Depends
from fastapi.responses import Response
from src.controllers.chat_controller import ChatController
from src.schemas.chat_schemas import ChatAudioRequest, ChatBuildRequest,ChatGreetingRequest
chat_router = APIRouter()

@chat_router.websocket(
    path="/chat/stream_response")
async def stream_response(websocket: WebSocket,new_message: str):
    await websocket.accept()
    chatController = ChatController.get_instance()
    stream = await chatController.stream_response(new_message)
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
async def get_audio(chatAudioRequest: ChatAudioRequest = Depends()):
    chatController = ChatController.get_instance()
    return Response(content=await chatController.get_audio(chatAudioRequest), media_type="audio/mpeg")

@chat_router.get(
    path="/chat/get_greeting",
    tags=["chat"])
async def get_greeting(chatGreetingRequest: ChatGreetingRequest = Depends()):
    chatController = ChatController.get_instance()
    return Response(content=await chatController.get_greeting(chatGreetingRequest), media_type="audio/mpeg")

@chat_router.websocket(
    path="/chat/stream_scenario")
async def stream_scenario(websocket:WebSocket,chatBuildRequest: ChatBuildRequest=Depends()):
    await websocket.accept()
    chatController = ChatController.get_instance()
    stream = await chatController.stream_scenario(chatBuildRequest, "jacques")
    try:
        async for chunk in await stream:
            if chunk.choices[0].delta.content is not None:
                await websocket.send_text(chunk.choices[0].delta.content)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        await websocket.close()
