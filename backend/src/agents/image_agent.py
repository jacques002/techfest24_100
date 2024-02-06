from openai import AsyncOpenAI
from src.schemas.explain_schemas import Status,ImageResponse

class ImageAgent:
    def __init__(self):
        self.client = AsyncOpenAI()
        self.model="dall-e-3"
        self.size="1024x1024"

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
        try:
            _prompt= f"Generate an image that encapsulates this word/phrase: {query}"
            response = await self.client.images.generate(
                model=self.model,
                prompt=_prompt,
                size=self.size,
                quality="standard",
                n=1,
                )
        except Exception as e:
            print(e)
            raise Exception("Failed to generate image")
        image_url = response.data[0].url
        print(image_url)
        return ImageResponse(status=Status.success.value,url=image_url)
    

    async def gen_story_image(self, query:str):
        # Retry 3 times else return failure
        for i in range(3):
            try:
                print(f'attempt:{i}')
                return await self._gen_story_image(query)
            except:
                print('failed')
                pass
        return ImageResponse(status=Status.failure.value,url="")
    
    async def _gen_story_image(self, query:str):
        try:
            _prompt= f"Generate an image gives this vibe: {query}"
            response = await self.client.images.generate(
                model=self.model,
                prompt=_prompt,
                size=self.size,
                quality="standard",
                n=1,
                )
        except Exception as e:
            print(e)
            raise Exception("Failed to generate image")
        image_url = response.data[0].url
        print(image_url)
        return ImageResponse(status=Status.success.value,url=image_url)
    