from pydantic import BaseModel,validator,Field
from typing import Optional

class ExplainRequest(BaseModel):
    query: str = Field(..., description="The query to generate an image for")

    @validator('query')
    def query_must_not_be_empty(cls, v):
        if v == "":
            raise ValueError('query must not be empty')
        return v