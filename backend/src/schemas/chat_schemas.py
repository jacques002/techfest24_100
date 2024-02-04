from pydantic import BaseModel

class ChatAudioRequest(BaseModel):
    id: int
    text: str