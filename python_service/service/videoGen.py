from moviepy.editor import *

import os
import shutil
import random

imageDir = "C:/Users/Hp/Documents/youtube_automation/python_service/services/videoImg"

processedVideoPathPython = "C:/Users/Hp/Documents/youtube_automation/python_service/services/finalVideo"

audioPath = "C:/Users/Hp/Documents/youtube_automation/python_service/services/finalAudioPython/final_audio_pttsx.mp3"

def videoGen(timestamp):
    print("RUNNING")
    width = 640
    height = 480
    if os.path.isdir(processedVideoPathPython):
        # first remove the directory with older pics for previous  video geeration and keep fresh pictures in the folder now
        shutil.rmtree(processedVideoPathPython)
    os.makedirs(processedVideoPathPython)
    t = 0
    tt = 1
    audio_clip = AudioFileClip(audioPath)
    timestamp.append(int(audio_clip.duration))
    image_clips = []
    while (t < len(os.listdir(imageDir))):
        try:
            image_clip = ImageClip(imageDir+f"/{t}.jpg", duration=timestamp[tt] - timestamp[tt-1])
            resized_clip = image_clip.resize((width,height))
            image_clips.append(resized_clip)
        except:
            print("error reading the file")
        t+=1
        tt+=1
    #Load the audio as a clip

    # Concatenate the image clips with transitions
    video = concatenate_videoclips(image_clips)

    video = video.set_audio(audio_clip)

    # Write the final video
    video.write_videofile('finalVideonnna.mp4', codec='libx264',fps=30)


# videoGen([0,7,16])


