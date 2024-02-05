from pydantic import BaseModel,Field,validator
from typing import List

class UserSearchHistory(BaseModel):
    username: str = None #Field(..., description="Username")
    article: str = Field(..., description="The word or phrase being defined")
    definition:str = Field(..., description="The definition of the word")
    type:str = Field(..., description="The type of the word eg. abbreviation, noun, verb etc")
    url: str = Field(..., description="The url of the image")

    @validator('article')
    def article_must_not_be_empty(cls, v):
        if v == "":
            raise ValueError('article must not be empty')
        return v