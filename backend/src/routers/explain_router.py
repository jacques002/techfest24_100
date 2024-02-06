from fastapi import APIRouter, Depends
from src.controllers.explain_controller import ExplainController
from src.schemas.explain_schemas import ExplainRequest, AIDefinitionReponse, AIAnalogyReponse, AIExampleReponse,ImageResponse
from src.controllers.history_controller import HistoryController
from src.dependencies.dependencies import player_jwt_token_checker
from src.schemas.user_schemas import *
from src.schemas.search_schemas import UserSearchHistory

explain_router = APIRouter()

@explain_router.get(
    path='/explain/get_image',
    tags=["dictionary"],
    response_model=ImageResponse)
async def get_image(explainRequest:ExplainRequest=Depends(), user:User = Depends(player_jwt_token_checker)):
    explainController = await ExplainController().get_instance()
    return await explainController.get_image(explainRequest)

@explain_router.get(
    path='/explain/get_definition',
    tags=["dictionary"],
    response_model=AIDefinitionReponse)
async def get_definition(explainRequest:ExplainRequest=Depends()):
    explainController = await ExplainController().get_instance()
    output = await explainController.get_definition(explainRequest)

    # if len(output.content)>0:
    #     historyController = await HistoryController().get_instance()
    #     # Create an instance of UserSearchHistory
    #     first_element = (output.content)[0]
        
    #     search_history = UserSearchHistory(
    #         username= user.username,
    #         article= first_element.article,
    #         definition=first_element.definition,
    #         type=first_element.type,
    #         url=''
    #     )
    #     await historyController.put_history(search_history)

    return output

    # return await explainController.get_definition(explainRequest)

@explain_router.get(
    path='/explain/get_analogy',
    tags=["dictionary"],
    response_model=AIAnalogyReponse)
async def get_analogy(explainRequest:ExplainRequest=Depends(), user:User = Depends(player_jwt_token_checker)):
    explainController = await ExplainController().get_instance()
    return await explainController.get_analogy(explainRequest)

@explain_router.get(
    path='/explain/get_example',
    tags=["dictionary"],
    response_model=AIExampleReponse)
async def get_example(explainRequest:ExplainRequest=Depends(), user:User = Depends(player_jwt_token_checker)):
    explainController = await ExplainController().get_instance()
    return await explainController.get_example(explainRequest)