from src.agents.chat_agent import ChatAgent
from src.schemas.chat_schemas import ChatAudioRequest
class ChatController:
    instance=None
    def __init__(self):
        self.chatAgent = ChatAgent()
        pass
    @classmethod
    def get_instance(cls):
        if cls.instance is None:
            cls.instance=ChatController()
        return cls.instance
    
    async def stream_response(self, new_message:str):
        return await self.chatAgent.stream_response(new_message)
    
    async def get_audio(self, chatAudioRequest:ChatAudioRequest):
        return await self.chatAgent.get_audio(chatAudioRequest)