from openai import AsyncOpenAI
from src.schemas.story_schemas import StoryStartRequest,StoryContinueRequest,StoryActionResponse
from langchain.output_parsers import PydanticOutputParser
from langchain.prompts import PromptTemplate
class StoryAgent:
    def __init__(self):
        self.client=AsyncOpenAI()
        self.scenario_dict = {}
        self.user_scenario_dict={}
        pass

    async def begin_story(self,storyStartRequest:StoryStartRequest,username:str):
        scenario_template={
            'name of story':storyStartRequest.nameOfStory,
            'protagonist':{
                'name':username,
                'personality':'blank slate'
            },
            'setting':{
                'genre':storyStartRequest.genre,
                'pages':storyStartRequest.length,
                'language': storyStartRequest.language
            },
            'additional_details':storyStartRequest.additions
        }
        stream = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": f"""You are a world-class scenario builder. 
                    You will first set the stage by narrating an opening scene. It should lead to the protagonist's first action.
                    And it should be only 2 lines long.
                    These are the details of the scenario. 
                    Pay attention to respond only with the the correct language, {scenario_template['setting']['language']}, found in settings.
                    {
                        scenario_template
                    }
                    """
                }
                ,{"role": "user", "content": f"""Narrate the opening scene."""}],
                stream=True
        )
        return stream
    
    async def get_actions(self,storyContinueRequest:StoryContinueRequest,username:str):
        try:
            action_output_parser = PydanticOutputParser(pydantic_object=StoryActionResponse)
            prompt = PromptTemplate(
                template="\n{format_instructions}\n Define this: {query}\n",
                input_variables=["query"],
                partial_variables={"format_instructions": action_output_parser.get_format_instructions()},
            )
            formatted_prompt = prompt.format_prompt(query="For now, suggest 3 possible actions for, me, the protagonist to take.").to_string()
            scenario_template={
                'name of story':storyContinueRequest.nameOfStory,
                'protagonist':{
                    'name':username,
                    'personality':'blank slate'
                },
                'setting':{
                    'genre':storyContinueRequest.genre,
                    'pages':storyContinueRequest.length,
                    'language': storyContinueRequest.language
                },
                'additional_details':storyContinueRequest.additions
            }
            messages = [{
                'role': 'system',
                'content': f"""You are the world's best story book writer especially when it comes to {storyContinueRequest.genre}. You make it your utmost priority to keep the story engaging.
                You must continue the story in the situation as described below with the correct language, {scenario_template['setting']['language']}, found in settings.
                You only have {storyContinueRequest.length} pages in total to finish the story. You must only write 2 sentences at a time.
                
                {
                    scenario_template
                }
                For now, suggest 3 possible actions for the protagonist to take.
                """
            }]
            for i in storyContinueRequest.messages:
                messages.append(i)
            response = await self.client.chat.completions.create(
                model="gpt-4",
                messages=messages+[{
                    'role':'user',
                    'content':formatted_prompt
                }]
            )
            return {'status':'success','content':action_output_parser.parse(response.choices[0].message.content)}
        except Exception as e:
            return {"status":"failure","content": {}}
        
    async def continue_story(self,storyContinueRequest:StoryContinueRequest,username:str):
        scenario_template={
            'name of story':storyContinueRequest.nameOfStory,
            'protagonist':{
                'name':username,
                'personality':'blank slate'
            },
            'setting':{
                'genre':storyContinueRequest.genre,
                'pages':storyContinueRequest.length,
                'language': storyContinueRequest.language
            },
            'additional_details':storyContinueRequest.additions
        }
        messages = [{
            'role': 'system',
            'content': f"""You are the world's best story book writer especially when it comes to {storyContinueRequest.genre}. You make it your utmost priority to keep the story engaging.
            You must continue the story in the situation as described below with the correct language, {scenario_template['setting']['language']}, found in settings.
            You only have {storyContinueRequest.length} pages in total to finish the story. You must only write 2 sentences at a time.
            
            {
                scenario_template
            }

Generate the next 2 sentences of the story after protagonist's action.
            """
        }]
        for i in storyContinueRequest.messages:
            messages.append(i)
        stream = self.client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            stream=True
        )
        return stream

    
    
    # async def get_audio(self, chatAudioRequest:ChatAudioRequest):
    #     response = await self.client.audio.speech.create(
    #         model="tts-1",
    #         voice=chatAudioRequest.voice,
    #         input=chatAudioRequest.text
    #     )
    #     return response.content
    
    # async def get_greeting(self, chatGreetingRequest:ChatGreetingRequest):
    #     if chatGreetingRequest.language == "english":
    #         text = "Hello, how are you?"
    #     elif chatGreetingRequest.language == "chinese":
    #         text = "你好，你好吗？"
    #     elif chatGreetingRequest.language == "malay":
    #         text = "Hello, apa khabar?"
    #     elif chatGreetingRequest.language == "tamil":
    #         text = "வணக்கம், நீங்கள் எப்படி இருக்கிறீர்கள்?"
    #     print(chatGreetingRequest)
    #     response = await self.client.audio.speech.create(
    #         model="tts-1",
    #         voice=chatGreetingRequest.voice,
    #         input=text
    #     )
    #     return response.content
    
    # async def set_user_scenario(self,username:str,chatBuildRequest:ChatBuildRequest):
    #     self.user_scenario_dict[username]=chatBuildRequest
    #     return self.user_scenario_dict
    
    # async def stream_scenario(self, chatBuildRequest:ChatBuildRequest,username:str):
    #     scenario_template={
    #         'protagonist':{
    #             'name':username,
    #             'personality':'blank slate'
    #         },
    #         'other_party':{
    #             'name':chatBuildRequest.name,
    #             'personality':chatBuildRequest.personality
    #         },
    #         'setting':{
    #             'atmosphere':chatBuildRequest.atmosphere,
    #             'location':chatBuildRequest.location,
    #             'language': chatBuildRequest.language
    #         },
    #     }

    #     stream = self.client.chat.completions.create(
    #         model="gpt-4",
    #         messages=[
    #             {
    #                 "role": "system",
    #                 "content": f"""You are a world-class scenario builder who keeps things apt. 
    #                 You will first set the stage by narrating a very very short opening scene in 2 lines.
    #                 These are the details of the scenario. You must narrate from the perspective of the protagonist.
    #                 Pay attention to respond only with the the correct language, {scenario_template['setting']['language']}, found in settings.
    #                 {
    #                     scenario_template
    #                 }
    #                 """
    #             }
    #             ,{"role": "user", "content": f"""Narrate a very very short opening scene in the correct language."""}],
    #             stream=True
    #     )
    #     return stream