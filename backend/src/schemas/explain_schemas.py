from pydantic import BaseModel,validator,Field
from typing import Optional, List

class ExplainRequest(BaseModel):
    query: str = Field(..., description="The query to generate an image for")

    @validator('query')
    def query_must_not_be_empty(cls, v):
        if v == "":
            raise ValueError('query must not be empty')
        return v
    
class Definition(BaseModel):
    id:int = Field(..., description="The id of the definition")
    defined: str = Field(..., description="The word or phrase being defined")
    definition:str = Field(..., description="The definition of the word")
    type:str = Field(..., description="The type of the word eg. abbreviation, noun, verb etc")

class AIDefinitionReponse(BaseModel):
    definitions: List[Definition]