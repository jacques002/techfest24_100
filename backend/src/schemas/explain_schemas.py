from pydantic import BaseModel,validator,Field
from typing import Optional, List
from enum import Enum

class Status(str, Enum):
    success = "success"
    failure = "failure"

class ExplainRequest(BaseModel):
    query: str = Field(..., description="The query to generate an image for")

    @validator('query')
    def query_must_not_be_empty(cls, v):
        if v == "":
            raise ValueError('query must not be empty')
        return v
class ImageResponse(BaseModel):
    status: Status = Field(..., description="The status of the response")
    url: str = Field(..., description="The url of the image")
class Definition(BaseModel):
    id:int = Field(..., description="The id of the definition")
    article: str = Field(..., description="The word or phrase being defined")
    definition:str = Field(..., description="The definition of the word")
    type:str = Field(..., description="The type of the word eg. abbreviation, noun, verb etc")

class AIDefinitionReponse(BaseModel):
    status: Status = Field(..., description="The status of the response")
    content: List[Definition]

class Analogy(BaseModel):
    id:int = Field(..., description="The id of the analogy")
    article: str = Field(..., description="The word or phrase being used to create the analogy")
    analogy:str = Field(..., description="The analogy of the word")

class AIAnalogyReponse(BaseModel):
    status: Status = Field(..., description="The status of the response")
    content: List[Analogy]

class Example(BaseModel):
    id:int = Field(..., description="The id of the example")
    article: str = Field(..., description="The word or phrase being used to create the example")
    example:str = Field(..., description="The example of the word")

class AIExampleReponse(BaseModel):
    status: Status = Field(..., description="The status of the response")
    content: List[Example]