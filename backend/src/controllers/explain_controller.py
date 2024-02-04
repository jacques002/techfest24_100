from src.agents.image_agent import ImageAgent
from src.schemas.explain_schemas import ExplainRequest

class ExplainController:

    instance = None

    def __init__(self):
        pass

    async def get_instance(self):
        if ExplainController.instance is None:
            ExplainController.instance = ExplainController()
        return ExplainController.instance

    async def get_image(self, explainRequest: ExplainRequest):
        return await ImageAgent().gen_image(explainRequest.query)
    