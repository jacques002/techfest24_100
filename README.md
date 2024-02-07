## For techfest 24 (GenAI Theme)

## Inspiration
We were inspired by how language is thought to us as we grow.

When we were babies, our parents would point at tangible objects so we can associate them to words.

When we were kids and teenagers, we read, heard and shared stories that engaged us and tingled our imaginations, spurring our growth in vocabulary through imaginative and 3rd person lenses.

As we aged, relationships became more and more important; and speaking to each other directly makes us better orators as language changes over time.

Stephen Krashen Input Hypothesis theorised that input through storybooks was more effective than copy pasting from a textbook as you seek meaning from the work (An internal driver). Merrill Swain's Output Hypothesis theorised that the drive to communicate complex information is another internal driver of language learning and that would require interaction.

This is why we feel that the run off the mill daily Active Recall apps such as DuoLingo is insufficient to language learning. It lacks interaction and words lack context when not part of a larger body of text.
## What it does
We present EverLingo. Inspired by how we learnt languages as we grow, we have 3 key features

1. An image-based dictionary: Learn complex words and ideas by AI generated visual aid. For example: The feeling of anger will be represented by a red painting, growth represented by a sapling and passion by a burning heart. Associate new words with these images.

2. Choose your own adventure story generator: Insert yourself into stories and entertain your inner child. You may provide details about yourself and a retrieval augmented generation model (RAG) will fetch relevant data quickly so you can read the next riveting arch. Visualise passages of the text with imagery.

3. Scenario Practice: Talk to another person directly speaking the language you are trying to learn or improve at. AI generated text-to-speech is used to add gravity to words and to improve intonations; this is so you can grasp how a native speaker actually sounds like. Adjust the difficulty, the settings and change your speaking partner. 
## How we built it
Frontend: Javascript React.js deployed on github pages: React is used for speed of development

Backend: Python FastAPI deployed on Render: FastAPI asynchronous calls is perfect for our I/O heavy operations

Database: AWS DynamoDB

Cloud Platforms Used: AWS and Render.

Other APIs Used:
1. OpenAI: Made use of gpt, Dalle, embedder and Text To Speech Capabilities
2. HuggingFace: Explored models

## Accomplishments that we're proud of
1. Deployment on github pages and render as well as jwt token implementation.

2. Tenacity by picking up new things and coming to agreements

## What we learned
1. Effective JWT Tokens
2. Effective Ascynhronous calls
3. Websocket connections
4. TTS from llm models
5. Translation from llm models
6. Image generation from llm models

## What's next for EverLingo
1. Centralise cloud resources in one provider. For example, choosing AWS and using AWS Kendra instead of Azure CS for retrieval in RAG.
2. Upgrade server instances and cloud resources. 
3. Internalise some LLM functionality through LLAMA models.
4. Fine-tuning AI for higher quality output
5. Inviting more users
