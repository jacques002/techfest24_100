from openai import AsyncOpenAI
from dotenv import load_dotenv
from langchain.output_parsers import PydanticOutputParser
from src.schemas.explain_schemas import AIDefinitionReponse,Definition, AIAnalogyReponse, AIExampleReponse, Status
from langchain.prompts import PromptTemplate
import requests
from urllib.parse import quote

class ExplainAgent:
    def __init__(self):
        self.client = AsyncOpenAI()
        self.model='gpt-4'
        self.definition_output_parser = PydanticOutputParser(pydantic_object=AIDefinitionReponse)
        self.analogy_output_parser = PydanticOutputParser(pydantic_object=AIAnalogyReponse)
        self.example_output_parser = PydanticOutputParser(pydantic_object=AIExampleReponse)

    async def gen_definitions(self, query:str):
        # check the dict api before generating using openai
        encoded_phrase = quote(query)
        url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{encoded_phrase}"
        response = requests.get(url)
        
        if response.ok:
            json_data=response.json()
            definitions=[]
            indexer=1
            for i in range(len(json_data)):
                for j in range(len(json_data[i]['meanings'])):
                    for k in range(len(json_data[i]['meanings'][j]['definitions'])):
                        definitions.append(Definition(id=indexer,article=query,type=json_data[i]['meanings'][j]['partOfSpeech'],definition=json_data[i]['meanings'][j]['definitions'][k]['definition']))
                        indexer+=1
            return AIDefinitionReponse(status=Status.success,content=definitions)
        else:
            pass
        prompt = PromptTemplate(
            template="\n{format_instructions}\n Define this: {query}\n",
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
                    If it is a phrase, you must explain it as a whole and place in id:1 before defining the words.
                    You must only repond with formatting of format_instructions below.
                    If no definitions are found, provide empty list.
                    You can assume that every word/phrase given to you is meant to be defined,
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