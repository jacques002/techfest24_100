from openai import AsyncOpenAI
from src.schemas.chat_schemas import ChatAudioRequest,ChatBuildRequest,ChatGreetingRequest
class ChatAgent:
    def __init__(self):
        self.client=AsyncOpenAI()
        self.scenario_dict = {}
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
            voice=chatAudioRequest.voice,
            input=chatAudioRequest.text
        )
        return response.content
    
    async def get_greeting(self, chatGreetingRequest:ChatGreetingRequest):
        if chatGreetingRequest.language == "english":
            text = "Hello, how are you?"
        elif chatGreetingRequest.language == "chinese":
            text = "你好，你好吗？"
        elif chatGreetingRequest.language == "malay":
            text = "Hello, apa khabar?"
        elif chatGreetingRequest.language == "tamil":
            text = "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?"
        print(chatGreetingRequest)
        response = await self.client.audio.speech.create(
            model="tts-1",
            voice=chatGreetingRequest.voice,
            input=text
        )
        return response.content
    
    async def stream_scenario(self, chatBuildRequest:ChatBuildRequest,username:str):
        scenario_template={
            'protagonist':{
                'name':username,
                'personality':'blank slate'
            },
            'other_party':{
                'name':chatBuildRequest.name,
                'personality':chatBuildRequest.personality
            },
            'setting':{
                'atmosphere':chatBuildRequest.atmosphere,
                'location':chatBuildRequest.location,
                'language': chatBuildRequest.language
            },
        }

        stream = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": f"""You are a world-class scenario builder who keeps things apt. 
                    You will first set the stage by narrating a very very short opening scene in 2 lines.
                    These are the details of the scenario. You must narrate from the perspective of the protagonist.
                    Pay attention to respond only with the the correct language, {scenario_template['setting']['language']}, found in settings.
                    {
                        scenario_template
                    }
                    """
                }
                ,{"role": "user", "content": f"""Narrate a very very short opening scene in the correct language."""}],
                stream=True
        )
        return stream