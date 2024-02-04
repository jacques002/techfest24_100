from openai import AsyncOpenAI
from dotenv import load_dotenv
from langchain.output_parsers import PydanticOutputParser
from src.schemas.explain_schemas import AIDefinitionReponse, AIAnalogyReponse, AIExampleReponse, Status
from langchain.prompts import PromptTemplate

class ExplainAgent:
    def __init__(self):
        self.client = AsyncOpenAI()
        self.model='gpt-4'
        self.definition_output_parser = PydanticOutputParser(pydantic_object=AIDefinitionReponse)
        self.analogy_output_parser = PydanticOutputParser(pydantic_object=AIAnalogyReponse)
        self.example_output_parser = PydanticOutputParser(pydantic_object=AIExampleReponse)

    async def gen_definitions(self, query:str):
        prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.definition_output_parser.get_format_instructions()},
        )
        formatted_prompt = prompt.format_prompt(query=query).to_string()
        try:
            response = await self.client.chat.completions.create(
                temperature=0,
                model=self.model,
                messages=[
                    {"role": "system", "content": f"""You are the world's best language professor who loves to teach. 
                    You help define whole words/phrases in as many interpretations as possible.
                    You must only repond with formatting of format_instructions below.
                    If no definitions are found, provide empty list.
                    """},
                    {"role": "user", "content": formatted_prompt},
                ]
            )
            return self.definition_output_parser.parse(response.choices[0].message.content)
        except Exception as e:
            return {"status":Status.failure.value,"content": []}
        
    async def gen_analogy(self, query:str):
        prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.analogy_output_parser.get_format_instructions()},
        )
        formatted_prompt = prompt.format_prompt(query=query).to_string()
        try:
            response = await self.client.chat.completions.create(
                temperature=0,
                model=self.model,
                messages=[
                    {"role": "system", "content": f"""You are the world's best language professor who loves to teach. 
                    You help create analogies based on the word/phrase.
                    You must only repond with formatting of format_instructions below.
                    If the word is not intelligible, provide empty list.
                    """},
                    {"role": "user", "content": formatted_prompt},
                ]
            )
            return self.analogy_output_parser.parse(response.choices[0].message.content)
        except Exception as e:
            return {"status":Status.failure.value,"content": []}
        
    async def gen_example(self, query:str):
        prompt = PromptTemplate(
            template="Answer the user query.\n{format_instructions}\n{query}\n",
            input_variables=["query"],
            partial_variables={"format_instructions": self.example_output_parser.get_format_instructions()},
        )
        formatted_prompt = prompt.format_prompt(query=query).to_string()
        try:
            response = await self.client.chat.completions.create(
                temperature=0,
                model=self.model,
                messages=[
                    {"role": "system", "content": f"""You are the world's best language professor who loves to teach. 
                    You help create examples based on the word/phrase.
                    You must only repond with formatting of format_instructions below.
                    If the word is not intelligible, provide empty list.
                    """},
                    {"role": "user", "content": formatted_prompt},
                ]
            )
            return self.example_output_parser.parse(response.choices[0].message.content)
        except Exception as e:
            return {"status":Status.failure.value,"content": []}