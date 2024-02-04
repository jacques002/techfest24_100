from openai import AsyncOpenAI
class ImageAgent:
    def __init__(self):
        self.client = AsyncOpenAI()
        self.model="dall-e-3"

    async def gen_image(self, query:str):
        response = await self.client.images.generate(
            model=self.model,
            prompt=query,
            size="1024x1024",
            quality="standard",
            n=1,
            )
        image_url = response.data[0].url
        return image_url
