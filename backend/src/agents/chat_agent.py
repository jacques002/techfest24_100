from openai import AsyncOpenAI
from src.schemas.chat_schemas import ChatAudioRequest
class ChatAgent:
    def __init__(self):
        self.client=AsyncOpenAI()
        pass

    async def stream_response(self, new_message: str):
        stream = self.client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": f"{new_message}"}],
            stream=True,
        )
        return stream
    
    async def get_audio(self, chatAudioRequest:ChatAudioRequest):
        response = await self.client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=chatAudioRequest.text
        )
        return response.content
