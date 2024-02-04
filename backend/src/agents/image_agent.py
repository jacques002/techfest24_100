from openai import AsyncOpenAI
from src.schemas.explain_schemas import Status
class ImageAgent:
    def __init__(self):
        self.client = AsyncOpenAI()
        self.model="dall-e-3"

    async def gen_image(self, query:str):
        try:
            _prompt= f"Generate an image that encapsulates this word/phrase: {query}"
            response = await self.client.images.generate(
                model=self.model,
                prompt=_prompt,
                size="1024x1024",
                quality="standard",
                n=1,
                )
            image_url = response.data[0].url
            return {"status":Status.success.value,"url": image_url }
        except:
            return {"status":Status.failure.value,"url": "" }
