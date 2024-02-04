from openai import AsyncOpenAI
from dotenv import load_dotenv
from langchain.output_parsers import PydanticOutputParser
from src.schemas.explain_schemas import AIDefinitionReponse
from langchain.prompts import PromptTemplate

class ExplainAgent:
    def __init__(self):
        self.client = AsyncOpenAI()
        self.model='gpt-4'
        self.definition_output_parser = PydanticOutputParser(pydantic_object=AIDefinitionReponse)

    async def gen_definitions(self, query:str):
        prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.definition_output_parser.get_format_instructions()},
        )
        formatted_prompt = prompt.format_prompt(query=query).to_string()

        response = await self.client.chat.completions.create(
            temperature=0,
            model=self.model,
            messages=[
                {"role": "system", "content": f"""You are the world's best language professor who loves to teach. 
                 You help define whole words/phrases in as many interpretations as possible.
                 You must only repond with formatting of format_instructions below.
                 If the word/phrase is not in the dictionary, respond with "I don't know" and move on to the next word/phrase.
                 """},
                {"role": "user", "content": formatted_prompt},
            ]
        )
        return self.definition_output_parser.parse(response.choices[0].message.content)