from pydantic import BaseModel,Field
from typing import Optional, Literal
from enum import Enum

class Role(str, Enum):
    player = 'player'

class User(BaseModel):
    username: str = Field(...,description="Username of the user")
