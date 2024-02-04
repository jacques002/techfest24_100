from fastapi import APIRouter, Depends
from src.controllers.explain_controller import ExplainController
from src.schemas.explain_schemas import ExplainRequest, AIDefinitionReponse, AIAnalogyReponse, AIExampleReponse,ImageResponse

explain_router = APIRouter()

@explain_router.get(
    path='/explain/get_image',
    tags=["dictionary"],
    response_model=ImageResponse)
async def get_image(explainRequest:ExplainRequest=Depends()):
    explainController = await ExplainController().get_instance()
    return await explainController.get_image(explainRequest)

@explain_router.get(
    path='/explain/get_definition',
    tags=["dictionary"],
    response_model=AIDefinitionReponse)
async def get_definition(explainRequest:ExplainRequest=Depends()):
    explainController = await ExplainController().get_instance()
    return await explainController.get_definition(explainRequest)

@explain_router.get(
    path='/explain/get_analogy',
    tags=["dictionary"],
    response_model=AIAnalogyReponse)
async def get_analogy(explainRequest:ExplainRequest=Depends()):
    explainController = await ExplainController().get_instance()
    return await explainController.get_analogy(explainRequest)

@explain_router.get(
    path='/explain/get_example',
    tags=["dictionary"],
    response_model=AIExampleReponse)
async def get_example(explainRequest:ExplainRequest=Depends()):
    explainController = await ExplainController().get_instance()
    return await explainController.get_example(explainRequest)