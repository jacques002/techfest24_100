from src.agents.chat_agent import ChatAgent
from src.schemas.chat_schemas import ChatAudioRequest,ChatBuildRequest,ChatGreetingRequest
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
    
    async def stream_response(self, data_dict:dict, username:str):
        return await self.chatAgent.stream_response(data_dict, username)
    
    async def get_audio(self, chatAudioRequest:ChatAudioRequest):
        return await self.chatAgent.get_audio(chatAudioRequest)
    
    async def get_greeting(self, chatGreetingRequest:ChatGreetingRequest):
        return await self.chatAgent.get_greeting(chatGreetingRequest)
    
    async def stream_scenario(self, chatBuildRequest:ChatBuildRequest, username:str):
        return await self.chatAgent.stream_scenario(chatBuildRequest, username)