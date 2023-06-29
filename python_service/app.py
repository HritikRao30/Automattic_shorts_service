from flask import Flask, jsonify, request
import json
import pyttsx3
import re
import os
import shutil
from service.googleimage import imageGen
from service.leoimage import imageGen2
from filestack import Client
from service.audio_processing import audioProcess, audioProcess2, musicMix, audioProcess3
from service.imageTS import get_word_timestamp, get_word_timestamp2
from service.videoGen import videoGen
from pytrends.request import TrendReq
from pydub import AudioSegment
from Bard import Chatbot

token = "YAjRJqVxIfk5VivqUZ_4P8pdCuMn9q5A-j8KR6xXJ60p25sK7DxyxD83wT5nQ4cd-f9QcQ."

bot = Chatbot(token)

pytrends = TrendReq(hl='en-US', tz=360)

# Create PyTrends API object


genre = ["hip_hop", "dance", "classical", "ambient", "cinematic"]

moods = ["dramatic", "romantic", "dark", "fun"]


app = Flask(__name__)

absolute_directory_path = os.path.dirname(os.path.abspath(__file__))

folder_name_google = 'service/videoImg/google'
folder_name_leo = 'service/videoImg/leornado'

folder_path = os.path.join(absolute_directory_path, folder_name_google)

folder_path_leo = os.path.join(absolute_directory_path, folder_name_leo)


@app.route('/', methods=['POST'])
def process():
    return jsonify({"success": 1})


@app.route('/trends', methods=['POST'])
def trend():
    print("recieved")
    trending_topics_df = pytrends.trending_searches(pn="india")
    trending_topics = trending_topics_df[0].values.tolist()
    print(trending_topics)
    return jsonify({"data": trending_topics})


@app.route('/shorts', methods=['POST'])
def shortsAI():
    print("recieved for bard again")
    prompt = json.loads(request.json.get('prompt'))
    output = bot.ask(prompt["prompt"])["content"]
    print(output)
    return jsonify({"bard": output})


@app.route('/relatedQueries', methods=['POST'])
def related():
    print("recieved again")
    orig = json.loads(request.json.get('categoryObj'))
    keywords = [val["value"] for val in orig]
    pytrends.build_payload(kw_list=keywords)

    related_queries = pytrends.related_queries()
    print(related_queries)
    i = 0
    resp = {}
    for keyword in related_queries:
        resp[orig[i]["category"]] = related_queries[keyword]['top'].values.tolist()[
            0][0]
        i += 1
    return jsonify({"data": resp})

@app.route('/textToSpeech', methods=['POST'])
def tts():
    print("TTS")
    client = Client("ABEy3bO94RUy5TplZTJ0Fz")

    store_params = {
        "mimetype": "audio/mp3"
    }

    audioObj = [];



    for file in os.listdir("C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio"):
        file_path = "C:/Users/Hp/Documents/youtube_automation/python_service/audio"+"/"+file;
        if os.path.isfile(file_path):
            os.remove(file_path)

    engine = pyttsx3.init()

    engine.setProperty('rate', 130)  # Adjust speech rate
    engine.setProperty('volume', 1.0)  # Adjust volume
    engine.setProperty('pitch', 1.4)  # Adjust pitch

    print("recieved text to speech")
    pts = json.loads(request.json.get('points'))
    i = 0
    for pt in pts:
        narration = pt["narration"]
        obj = {
            "narration":"",
            "lenNarration":0,
            "quote":"",
            "lenQuote":0,
        }
        if pt["quote"] and pt["quote"]["quote"]:
            quote = pt["quote"]["person"] + " an " + pt["quote"]["designation"]+ " "
            quote += pt["quote"]["quote"]
            engine.save_to_file(quote, f'quote{i}.mp3')
            engine.runAndWait()
            if os.path.exists(f'C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/quote{i}.mp3'):
                shutil.move(f'C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/quote{i}.mp3', "C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio/"+f'quote{i}.mp3')
            else:
                shutil.move(f'C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/audiooutput{i}.mp3',"C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio/"+f'quote{i}.mp3')
            new_filelink = client.upload(filepath="C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio/"+f'quote{i}.mp3', store_params=store_params)
            obj["quote"] = new_filelink.url
            audio = AudioSegment.from_file("C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio/"+f'quote{i}.mp3')
            duration = len(audio) / 1000.0  # Convert milliseconds to seconds
            obj["lenNarration"] = int(duration)+1

        engine.save_to_file(narration, f'narration{i}.mp3')
        engine.runAndWait()
        
        if os.path.exists(f'C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/narration{i}.mp3'):
            shutil.move(f'C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/narration{i}.mp3', "C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio/"+f'narration{i}.mp3')
        else:
            shutil.move(f'C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/audiooutput{i}.mp3',"C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio/"+f'narration{i}.mp3')
    
        new_filelink = client.upload(filepath="C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio/"+f'narration{i}.mp3', store_params=store_params)
        obj["narration"] = new_filelink.url
        audio = AudioSegment.from_file("C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio/"+f'narration{i}.mp3')
        duration = len(audio) / 1000.0  # Convert milliseconds to seconds
        obj["lenQuote"] = int(duration)+1

        audioObj.append(obj)
        i+=1  

    return jsonify({"data": audioObj})


@app.route('/imageGen2', methods=['POST'])
def process_image2():
    imageObj = json.loads(request.json.get('imageObj'))
    # iterate the paragraphs and take the subjecs out and that will be used by image gen
    
    
    resp2 = imageGen2(imageObj)  # google service

    # Return a success flag
    return jsonify({'success': resp2})


if __name__ == '__main__':
    app.run()
