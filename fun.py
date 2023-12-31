from pydub import AudioSegment
from filestack import Client
import requests
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
import random
import shutil
import time


folder_path = "C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/service/videoImg/google"

folder_path_leo = "C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/service/videoImg/leornado"

# client = Client("ABEy3bO94RUy5TplZTJ0Fz")

# store_params = {
#     "mimetype": "video/mp4"
# }
# new_filelink = client.upload(filepath="C:/Users/Hp/Documents/youtube_automation/filestackdemo.mp4", store_params=store_params)
# print(new_filelink.url)


# file_name = "C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/1.jpg"
# reponse = requests.get("https://cdn.filestackcontent.com/QxVcY2lkR6ysDCJAkjh2")
# if reponse.status_code == 200:
#     with open(file_name, 'wb') as file:
#         file.write(reponse.content)


def get_audio_length():
    audio = AudioSegment.from_file(
        "C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/audio/narration2.mp3")
    duration = len(audio) / 1000.0  # Convert milliseconds to seconds
    print(duration)


def download_image(url, num, folder_name):
    # write image to file
    reponse = requests.get(url)
    if reponse.status_code == 200:
        with open(os.path.join(folder_name, str(num)+".jpg"), "wb") as file:
            file.write(reponse.content)


def googleImg(Prompts, folder_name_google):
    if len(Prompts) == 0:
        return 1
    driver_path = "C:/Users/Hp/Documents/youtube_automation/web_scraper_edge/msedgedriver.exe"

    driver = webdriver.Edge(executable_path=driver_path)

    t = 0
    
    url2 = "https://images.google.com/"

    driver.get(url2)

        # now will click on the images button

    time.sleep(2)

    search_box = driver.find_element_by_xpath("""/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/textarea""")
    search_box.send_keys(Prompts[0])
    search_box.send_keys(Keys.RETURN)

           # wait for 5 seconds for some element to appear
    try:
        element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located(
            (By.XPATH, """/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[1]/a[1]/div[1]"""))  # first image div
        )
        print("Element appeared before 10 secs!")
    except:
        print("Timed out after 10 seconds waiting for element to appear")
        return 0

    ht = driver.execute_script("return document.body.scrollHeight")
    cmd = """window.scrollTo(0, %s);""" % (ht)

            # this lets the all the images to load on the google images
    driver.execute_script(cmd)
    time.sleep(3)  # wait for the images to load

    driver.execute_script("window.scrollTo(0, 0);")

    i = random.randint(1, 20)


    imgXPATH = """/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[%s]/a[1]/div[1]/img""" % (i)
    previewImageElement = driver.find_element_by_xpath(imgXPATH)
    previewImageURL = previewImageElement.get_attribute("src")

    print(previewImageURL)

    driver.quit()
    return 1


def imageGen2(imagePrompts, googlePrompts, folder_name_google, folder_name):

    opt = Options()

    opt.add_experimental_option("debuggerAddress", "localhost:9222")
    driver_path = "C:/Users/Hp/Documents/youtube_automation/chromedriver_114/chromedriver.exe"

    driver = webdriver.Chrome(driver_path)

    url = "https://app.leonardo.ai/ai-generations"

    driver.get(url)

    try:
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, """/html/body/div[1]/div/div/div/div[2]/div/div/div[3]/div[2]/textarea"""))  # first image div
        )

        i = 1

        for prompt in imagePrompts:

            element.clear()
            element.send_keys(prompt)

            generate = driver.find_element_by_xpath(
                """//*[@id="__next"]/div/div/div/div[2]/div/div/div[3]/div[5]/div[4]/button""")

            generate.click()

            time.sleep(20)

            try:
                imageElement = driver.find_element_by_xpath("""/html/body/div[1]/div/div/div/div[2]/div/div/div[6]/div[2]/div[1]/div[1]/div[3]/div/div[2]/div[1]/div/div/img""")  
                cdnURL = imageElement.get_attribute('src')
                print(cdnURL)
                download_image(cdnURL, i, folder_name)
            except:
                print("element did not appear")

            i += 2

    except:
        exit(0)

    driver.quit()
    return 1


leo = ["tiger in siberia"]

google = ["lion in savannah"]

# imageGen2(leo,folder_path_leo)

# googleImg(google, folder_path)

urlss = {
    "a":{
      google: 'data:image/jpeg;base64,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'... 4187 more characters,
      leornado: 'https://cdn.leonardo.ai/users/227e1e1b-765e-4418-8984-2734c26f12bc/generations/3245197a-0630-4455-b821-a6e85632b823/Default_The_Great_Pyramid_of_GizaA_colossal_limestone_pyramid_0.jpg?w=512'
    },
    "b":{
      google: 'data:image/jpeg;base64,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'... 1903 more characters,
      leornado: 'https://cdn.leonardo.ai/users/227e1e1b-765e-4418-8984-2734c26f12bc/generations/c4fba1cd-401b-4c2c-92ec-3d1bd7cc1ccd/Default_The_Book_of_the_DeadA_papyrus_scroll_containing_a_coll_0.jpg?w=512'
    },
    "c":{
      google: 'data:image/jpeg;base64,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',
      leornado: 'https://cdn.leonardo.ai/users/227e1e1b-765e-4418-8984-2734c26f12bc/generations/d8f12af8-ece3-43ad-ba06-cffb80f131ae/Default_The_Rosetta_StoneA_multilingual_slab_of_stone_containi_0.jpg'
    }
}
