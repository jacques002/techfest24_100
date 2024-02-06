from src.databases.database import Database
from fastapi.responses import JSONResponse
from src.schemas.search_schemas import UserSearchHistory
import os
from boto3.dynamodb.conditions import Key

HISTORY_TABLE = os.getenv("HISTORY_TBLE_NAME")

class SearchModel:
    table_name = ""

    def __init__(self):
        self.df = Database()
        self.table_name = HISTORY_TABLE

    async def create_history(self, userSearchHistory:UserSearchHistory)->dict:
        payload = userSearchHistory.dict()
        payload['username'] = payload['username'].lower()
        payload['article'] = payload['article'].lower()

        response = await self.df.put_item(self.table_name, payload)
        return response
    
    async def get_specific_history(self, partition_key_value :str, sort_key_value:str)->dict:
        response = await self.df.get_item_partition_sort_key(
            self.table_name, partition_key_value, sort_key_value
        )
        
        return response

    async def get_n_most_recent(self, username:str):
        keyCond = Key("username").eq(username)
        response = await self.df.query_n_most_recent(
            self.table_name, keyCond
        )
        return response

    async def ft_scan(self)->dict:
        response = await self.df.full_table_scan(self.table_name)
        print(response)

        return response

