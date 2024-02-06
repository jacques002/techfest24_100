from pydantic import BaseModel
from typing import Optional,List,Dict
class StoryStartRequest(BaseModel):
    typeOfStory: str
    nameOfStory: str
    narratorVoice: str
    language: str
    genre: str
    length: int
    additions:Optional[str]


class StoryContinueRequest(BaseModel):
    typeOfStory: str
    nameOfStory: str
    narratorVoice: str
    language: str
    genre: str
    length: int
    additions:Optional[str]
    messages:List[Dict[str,str]]


class StoryActionResponse(BaseModel):
    action1:str
    action2:str
    action3:str