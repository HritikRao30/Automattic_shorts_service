import os
from Bard import Chatbot

token = "YAjRJqVxIfk5VivqUZ_4P8pdCuMn9q5A-j8KR6xXJ60p25sK7DxyxD83wT5nQ4cd-f9QcQ."

topic = "spartans"

prompt = """write youtube shorts script of on ${topic} and give 3 tags for it in the following json parsable format avoid using unexpected tokens and add punctuation marks wherever needed and the background music id will correspond to the index of the music genre suitable for theme from among ["high octane","epic","ambient","sad","emotional","nostalgic","suspense","drama"] only index starts from 0 ensure you give different quotes of experts or the person involved in the fact
    {
  "title": ${topic},
  "image": {
    "title": "title",
    "description": "generic artistic description for ai art generator",
  },
  "context":"short introduction to the ${topic} keep it below 40 words",
  "script": [
    {
      "part": 1,
      "title":"INTRO",
      "context": "context",
      "narration":"short intro to the topic",
      "background music": "music genre id",
      "specific_image": [{
        "title": "title",
        "description": "generic artistic description for ai generator",
      } ,...],
      "youtub_clip":{
        "title":"title of the clip",
        "description":"keyword or description to earch on youtube"
      }
    },
    {
      "part":2,
      "title":"KEY POINTS",
      "points":[
        {
          "title": "FACT Number {i}",
          "narration": "actual fact or content",
          "background music": "music genre id",
          "quote":{
            "quote":"quote",
            "person":"name of the person quoting",
            "designation":"designation"
          },
          "person": {
            "name":"name of person image involved in the point",  
            "image":"keyword for his image"
          },
          "specific_image": [{
            "title": "title",
            "description": "generic artistic description for ai generator",
          } ,...]
        },...
      ]
    },
    {
      "part": 3,
      "title":"OUTRO",
      "narration": "breif summary followed by outro to the shorts video",
      "background music": "music genre id",
      "generic_image": {
        "title": "title",
        "description": "generic artistic description for ai generator",
      }
    }
    ],
        "description": "description for youtube shorts",
        "tags": "tags"
    }"""

introPrompt = """write youtube shorts script of on ancient egypt and give 3 tags for it in the following json parsable format avoid using unexpected tokens and add punctuation marks wherever needed and the background music id will correspond to the index of the music genre suitable for theme from among ["high octane","epic","ambient","sad","emotional","nostalgic","suspense","drama"] only index starts from 0 ensure you give different quotes of experts or the person involved in the fact
    {
  "title": "topic",
  "image": {
    "title": "title",
    "description": "generic artistic description for ai art generator",
  },
  "context":"short introduction to the topic keep it below 40 words",
  "script": [
    {
      "part": 1,
      "title":"INTRO",
      "context": "context",
      "narration":"short intro to the topic",
      "background music": "music genre id",
      "specific_image": [{
        "title": "title",
        "description": "generic artistic description for ai generator",
      } ,...],
      "youtub_clip":{
        "title":"title of the clip",
        "description":"keyword or description to earch on youtube"
      }
    },
    {
      "part": 2,
      "title":"OUTRO",
      "narration": "breif summary followed by outro to the shorts video",
      "background music": "music genre id",
      "generic_image": {
        "title": "title",
        "description": "generic artistic description for ai generator",
      }
    }
    ],
    "opinions":[
        {
            "opinion":"quote or opinion of person on the topic",
            "person":"name of the person quoting",
            "designation":"designation"
        },...
    ]
        "description": "description for youtube shorts",
        "tags": "tags"
    }"""

Pointsprompt = """write youtube shorts script of on the Ancient and give 3or 4 key events or points or facts (brief and crisp) for it in the following json parsable format avoid using unexpected tokens and add punctuation marks wherever needed and the background music id will correspond to the index of the music genre suitable for theme from among ["high octane","epic","ambient","sad","emotional","nostalgic","suspense","drama"] only index starts from 0 ensure you give different quotes of experts or the person involved in the fact
    {
  "script": 
    {
      "part":2,
      "title":"KEY POINTS",
      "points":[
        {
          "title": "title",
          "narration": "actual fact or content",
          "background music": "music genre id",
          "quote":{
            "quote":"quote",
            "person":"name of the person quoting",
            "designation":"designation"
          },
          "person": {
            "name":"name of person image involved in the point",  
            "image":"keyword for his image"
          },
          "specific_image": [{
            "title": "title",
            "description": "generic artistic description for ai generator",
          } ,...]
        },...
      ]
    }
    }"""



bot = Chatbot(token)

test = """return a news article of 100 words in the following json parsabloe format {
  "source":"source",
  "category":"category",
  "news":"news"
} just return the json nothing else.i am repeating nothing else only json start your response with { and end with }"""

# output = bot.ask(test)["content"]

# print(output)


import json

def get_json_response():
  response1 = bot.ask(introPrompt)["content"]
  print(response1)

  

  print("////////////////////////////")

  response2 = bot.ask(Pointsprompt)["content"]
  print(response2)
  
  # json_response = json.loads(response)
  # return json_response

get_json_response()

# print(result['result'])