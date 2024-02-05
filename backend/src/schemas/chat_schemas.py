from pydantic import BaseModel

class ChatAudioRequest(BaseModel):
    text: str
    voice: str

class ChatGreetingRequest(BaseModel):
    language: str
    voice: str

class ChatBuildRequest(BaseModel):
    name: str
    voice: str
    language: str
    personality: str
    atmosphere: str
    location: str