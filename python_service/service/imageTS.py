import re

script = "<image:image 1> Number 3 on our list is 3 Idiots. [MUSIC EFFECT] <image:image  2> Released in 2009, this coming-of-age comedy follows the story of three college friends and their journey to find their true calling. <image:image3> 3 Idiots was a commercial success and was praised for its social message and unique blend of humor, drama, and romance."

def get_word_timestamp(script, speech_rate):
    imagepattern = r"<(?:[^>]*)>"
    musicpattern = r"\[([^\]]*)\]"
    result = re.split(imagepattern, script)
    timestamps = [0]
    total_duration = 0
    prev_duration = 0

    for para in script:
        for parts in result:
            parts = re.sub(musicpattern, "", parts)
            words = parts.split()  # Split the script into words     
            for word in words:
                word_duration = (len(word) / speech_rate) * 6000  # Calculate duration based on speech rate
                total_duration += int(word_duration)  #this will give us times in milliseconds
            if prev_duration != total_duration:
                timestamps.append(total_duration)
                prev_duration = total_duration
        # If the target word is not found, return None
        return timestamps[:-1]
    
def get_word_timestamp2(script, speech_rate):
    timestamps = [0]
    total_duration = 0

    for para in script:  
        script = para["script"]
        words = script.split() 
        for word in words:
            word_duration = (len(word) / speech_rate) * 6000  # Calculate duration based on speech rate
            total_duration += int(word_duration)  #this will give us times in milliseconds
        timestamps.append(int(total_duration/1000))
    print(timestamps)
    return timestamps[:-1]