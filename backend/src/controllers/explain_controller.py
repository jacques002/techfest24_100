from src.agents.image_agent import ImageAgent
from src.agents.explain_agent import ExplainAgent
from src.schemas.explain_schemas import ExplainRequest

class ExplainController:

    instance = None

    def __init__(self):
        pass

    @classmethod
    async def get_instance(self):
        if ExplainController.instance is None:
            ExplainController.instance = ExplainController()
        return ExplainController.instance

    async def get_image(self, explainRequest: ExplainRequest):
        return await ImageAgent().gen_image(explainRequest.query)
    
    async def get_definition(self, explainRequest: ExplainRequest):
        return await ExplainAgent().gen_definitions(explainRequest.query)
    
    async def get_analogy(self, explainRequest: ExplainRequest):
        return await ExplainAgent().gen_analogy(explainRequest.query)
    
    async def get_example(self, explainRequest: ExplainRequest):
        return await ExplainAgent().gen_example(explainRequest.query)