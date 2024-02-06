from src.schemas.story_schemas import StoryStartRequest,StoryContinueRequest
from src.agents.story_agent import StoryAgent
from src.agents.image_agent import ImageAgent
class StoryController:
    instance=None
    def __init__(self):
        pass
    @classmethod
    def get_instance(cls):
        if cls.instance is None:
            cls.instance=StoryController()
        return cls.instance
    
    async def begin_story(self, chatBuildRequest:StoryStartRequest, username:str):
        return await StoryAgent().begin_story(chatBuildRequest, username)
    
    async def gen_story_image(self, query:str):
        return await ImageAgent().gen_story_image(query)
    
    async def get_actions(self, storyContinueRequest:StoryContinueRequest, username):
        return await StoryAgent().get_actions(storyContinueRequest, username)
    
    async def continue_story(self, storyContinueRequest:StoryContinueRequest, username:str):
        return await StoryAgent().continue_story(storyContinueRequest, username)