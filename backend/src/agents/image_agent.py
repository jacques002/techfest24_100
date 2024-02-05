from openai import AsyncOpenAI
from src.schemas.explain_schemas import Status,ImageResponse
class ImageAgent:
    def __init__(self):
        self.client = AsyncOpenAI()
        self.model="dall-e-3"

    async def gen_image(self, query:str):
        # Retry 3 times else return failure
        for i in range(3):
            try:
                print(f'attempt:{i}')
                return await self._gen_image(query)
            except:
                print('failed')
                pass
        return ImageResponse(status=Status.failure.value,url="")
    
    async def _gen_image(self, query:str):
        _prompt= f"Generate an image that encapsulates this word/phrase: {query}"
        response = await self.client.images.generate(
            model=self.model,
            prompt=_prompt,
            size="1024x1024",
            quality="standard",
            n=1,
            )
        image_url = response.data[0].url
        return ImageResponse(status=Status.success.value,url=image_url)