from src.schemas.search_schemas import UserSearchHistory
from fastapi.responses import JSONResponse
from src.models.search_model import SearchModel

class HistoryController:

    instance = None

    def __init__(self):
        self.search_model = SearchModel()
        pass

    @classmethod
    async def get_instance(self):
        if HistoryController.instance is None:
            HistoryController.instance = HistoryController()
        return HistoryController.instance

    async def put_history(self, userSearchHistory: UserSearchHistory):
        response = await self.search_model.create_history(userSearchHistory)

    async def full_table_scan(self):
        return await self.search_model.ft_scan()

    async def get_specific_history(self, partition_key_value, sort_key_value):
        return await self.search_model.get_specific_history(partition_key_value, sort_key_value)

    async def get_n_most_recent(self, username):
        response = await self.search_model.get_n_most_recent(username)
        
        # Extract values corresponding to the 'article' key
        article_values = [d['article'] for d in response if 'article' in d]

        return article_values