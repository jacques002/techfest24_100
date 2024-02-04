from fastapi import APIRouter, Depends
from src.controllers.explain_controller import ExplainController
from src.schemas.explain_schemas import ExplainRequest

explain_router = APIRouter()

@explain_router.get(
    path='/explain/get_image',
    tags=["dictionary"])
async def get_image(explainRequest:ExplainRequest=Depends()):
    explainController = await ExplainController().get_instance()
    return await explainController.get_image(explainRequest)

@explain_router.get(
    path='/explain/get_definition',
    tags=["dictionary"])
async def get_definition(explainRequest:ExplainRequest=Depends()):
    explainController = await ExplainController().get_instance()
    return await explainController.get_definition(explainRequest)