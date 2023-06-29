from pydub import AudioSegment
from pydub.silence import split_on_silence
import shutil
import os
import random


bgm = ["hip_hop","dance","classical","ambient","cinematic"]

effects = ["action_explosive","comic","magical"]

processedAudioPath = "C:/Users/Hp/Documents/youtube_automation/python_service/services/finalAudio"

processedAudioPathPython = "C:/Users/Hp/Documents/youtube_automation/python_service/services/finalAudioPython"

audioDir = "C:/Users/Hp/Documents/youtube_automation/chatgpt/myOpenAI/audio"

audioDir2 = "C:/Users/Hp/Documents/youtube_automation/python_service/audio"

audio_files  =  []

audio_files2 = []

for file_name in os.listdir(audioDir):
    file_path = os.path.join(audioDir, file_name)
    file_path = file_path.replace('\\', '/')
    # Add the file path to the list
    audio_files.append(file_path)

effect_files = []
bgm_files = []
before_music_files = []
after_music_files = []

script_files = []

for file_name in os.listdir(audioDir2):
    file_path = os.path.join(audioDir2, file_name)
    file_path = file_path.replace('\\', '/')
    # Add the file path to the list
    if file_name.startswith("effect"):
        effect_files.append(file_path)
    # Check if the filename starts with "bgm"
    elif file_name.startswith("bgm"):
        bgm_files.append(file_path)
    # Check if the filename starts with "before_music"
    elif file_name.startswith("before_music"):
        before_music_files.append(file_path)
    elif file_name.startswith("after_music"):
        after_music_files.append(file_path)
    else:
        script_files.append(file_path)
        
def audioProcess():
    processed_segments = []
    if os.path.isdir(processedAudioPath):
        # first remove the directory with older pics for previous  video geeration and keep fresh pictures in the folder now
        shutil.rmtree(processedAudioPath)
    os.makedirs(processedAudioPath)

    # Iterate over each audio file
    for file_path in audio_files:
        print(file_path)
        # Load audio segment
        audio = AudioSegment.from_file(file_path, format="mp3")
    
        # Normalize the audio segment
        normalized_audio = audio.normalize()
    
        # Split normalized audio on silence
        segments = split_on_silence(normalized_audio, min_silence_len=500, silence_thresh=-35)
    
        # Process each segment
        for segment in segments:
            # Remove noise or apply desired processing to the segment
        
            # Add segment to the list of processed segments
            processed_segments.append(segment)
        
                # Add 1.5 seconds of silence between segments
        silence = AudioSegment.silent(duration=1500)
        processed_segments.append(silence)

    # Concatenate processed segments
    output = processed_segments[0]
    for segment in processed_segments[1:]:
        output += segment

    # Export the merged and processed audio
    output.export("final_audio.mp3", format="mp3")
    shutil.move("final_audio.mp3", processedAudioPath+"/final_audio.mp3")
    return 1


def audioProcess2():
    if os.path.isdir(processedAudioPathPython):
        # first remove the directory with older pics for previous  video geeration and keep fresh pictures in the folder now
        shutil.rmtree(processedAudioPathPython)
    os.makedirs(processedAudioPathPython)
    
    processed_segments = []

    for i in range(0,len(before_music_files)):
        # Load audio segment
        before_audio = AudioSegment.from_file(before_music_files[i], format="wav")
        after_audio = AudioSegment.from_file(after_music_files[i], format="wav")
        effect_audio = AudioSegment.from_file(effect_files[i],format="mp3")
        bgm_audio = AudioSegment.from_file(bgm_files[i],format="mp3")
        duration = 1500  # 2 seconds
        # Trim the audio to the desired duration
        trimmed_effect = effect_audio[:duration]

        # Normalize the audio segment
        normalized_before = before_audio.normalize()
        normalized_after = after_audio.normalize()
        normalized_effect = trimmed_effect.normalize()
        normalized_effect = normalized_effect.fade_in(300).fade_out(300)
        
        normalized_audio = normalized_before + normalized_effect + normalized_after

        silence = AudioSegment.silent(duration=1200)

        normalized_audio = normalized_audio+silence
        

        dur = normalized_audio.duration_seconds * 1000
    

        
        ducking_factor = 3  # Adjust the ducking factor as needed

        ducked_bgm = bgm_audio.apply_gain(- ducking_factor * (bgm_audio.max_dBFS - normalized_audio.max_dBFS))

        normalized_audio = normalized_audio.apply_gain(- normalized_audio.max_dBFS)

        print("Max DBs:",bgm_audio.max_dBFS)

        normalized_bgm = ducked_bgm.normalize()[:int(dur)]

        normalized_bgm = normalized_bgm.fade_in(300).fade_out(300)

        #we will equalize the loudness of all audio files and then test

        merged_audio = normalized_audio.overlay(normalized_bgm)

        processed_segments.append(merged_audio)

    print(processed_segments)
    # Concatenate processed segments
    output = processed_segments[0]
    for segment in processed_segments[1:]:
        output += segment
    
    #add the intro and outro
    l1 = random.choice([1, 2])
    l2 = random.choice([1, 2])
    intro = AudioSegment.from_file("C:/Users/Hp/Documents/youtube_automation/python_service/musicEffects/intro/"+f"{l1}.mp3",format="mp3")
    outro = AudioSegment.from_file("C:/Users/Hp/Documents/youtube_automation/python_service/musicEffects/outro/"+f"{l2}.mp3",format="mp3")
    intro = intro.normalize()[:5000].fade_in(900).fade_out(1000)
    outro = outro.normalize()[:4000].fade_in(900).fade_out(1000)
    output = intro + output + outro
    # Export the merged and processed audio
    output.export("final_audio_pttsx.mp3", format="mp3")
    shutil.move("final_audio_pttsx.mp3", processedAudioPathPython+"/final_audio_pttsx.mp3")

def audioProcess3():
    if os.path.isdir(processedAudioPathPython):
        # first remove the directory with older pics for previous  video geeration and keep fresh pictures in the folder now
        shutil.rmtree(processedAudioPathPython)
    os.makedirs(processedAudioPathPython)
    
    processed_segments = []

    for i in range(0,len(script_files)):

        script_audio = AudioSegment.from_file(script_files[i], format="wav")
        effect_audio = AudioSegment.from_file(effect_files[i],format="mp3")
        bgm_audio = AudioSegment.from_file(bgm_files[i],format="mp3")
        duration = 1500  # 2 seconds
        # Trim the audio to the desired duration
        trimmed_effect = effect_audio[:duration]

        # Normalize the audio segment
        normalized_script = script_audio.normalize()
        normalized_effect = trimmed_effect.normalize()
        normalized_effect = normalized_effect.fade_in(300).fade_out(300)
        
        normalized_audio = normalized_script + normalized_effect

        silence = AudioSegment.silent(duration=900)

        normalized_audio = normalized_audio+silence

        dur = normalized_audio.duration_seconds * 1000
        
        ducking_factor = 5  # Adjust the ducking factor as needed

        ducked_bgm = bgm_audio.apply_gain(- ducking_factor * (bgm_audio.max_dBFS - normalized_audio.max_dBFS))

        normalized_audio = normalized_audio.apply_gain(- normalized_audio.max_dBFS)

        print("Max DBs:",bgm_audio.max_dBFS)

        normalized_bgm = ducked_bgm.normalize()[:int(dur)]

        normalized_bgm = normalized_bgm.fade_in(300).fade_out(300)

        #we will equalize the loudness of all audio files and then test

        merged_audio = normalized_audio.overlay(normalized_bgm)

        processed_segments.append(merged_audio)

    print(processed_segments)
    # Concatenate processed segments
    output = processed_segments[0]
    for segment in processed_segments[1:]:
        output += segment
    
    #add the intro and outro
    l1 = random.choice([1, 2])
    l2 = random.choice([1, 2])
    intro = AudioSegment.from_file("C:/Users/Hp/Documents/youtube_automation/python_service/musicEffects/intro/"+f"{l1}.mp3",format="mp3")
    outro = AudioSegment.from_file("C:/Users/Hp/Documents/youtube_automation/python_service/musicEffects/outro/"+f"{l2}.mp3",format="mp3")
    intro = intro.normalize()[:5000].fade_in(900).fade_out(1000)
    outro = outro.normalize()[:4000].fade_in(900).fade_out(1000)
    output = intro + output + outro
    # Export the merged and processed audio
    output.export("final_audio_pttsx.mp3", format="mp3")
    shutil.move("final_audio_pttsx.mp3", processedAudioPathPython+"/final_audio_pttsx.mp3")

def musicMix(b,a,t):   #just saves the audio effect and the bgm
    if t==0:
        i = random.choice([1, 2, 3])
        audio = AudioSegment.from_file("C:/Users/Hp/Documents/youtube_automation/python_service/musicEffects/tunes/"+effects[b]+f"/{i}.mp3", format="mp3")
        # Normalize the audio segment
        normalized_audio = audio.normalize()   
        normalized_audio.export("C:/Users/Hp/Documents/youtube_automation/python_service/effect.mp3", format="mp3")
        shutil.move("C:/Users/Hp/Documents/youtube_automation/python_service/effect.mp3", f"C:/Users/Hp/Documents/youtube_automation/python_service/audio/effect{a}.mp3")
    else:
        i = random.choice([1, 2])
        audio = AudioSegment.from_file("C:/Users/Hp/Documents/youtube_automation/python_service/musicEffects/bgm/"+bgm[b]+f"/{i}.mp3", format="mp3")
        # Normalize the audio segment
        normalized_audio = audio.normalize()   
        normalized_audio.export("C:/Users/Hp/Documents/youtube_automation/python_service/bgm.mp3", format="mp3")
        shutil.move("C:/Users/Hp/Documents/youtube_automation/python_service/bgm.mp3", f"C:/Users/Hp/Documents/youtube_automation/python_service/audio/bgm{a}.mp3")         
