from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

import random
import os
import shutil
import time
from bs4 import BeautifulSoup
import requests
# import the pytrends service or video topic service


def giveQ():
    lst = ["films", "politics", "india vs pak",
           "cricket", "games", "rock", "sci-fi films"]
    return random.choice(lst)






def download_image(url, folder_name, num):
    # write image to file
    reponse = requests.get(url)
    if reponse.status_code == 200:
        with open(os.path.join(folder_name, str(num)+".jpg"), 'wb') as file:
            file.write(reponse.content)

def imageGen(t,searchQ,foldername):

    driver_path = "C:/Users/Hp/Documents/youtube_automation/chrome_driver/chromedriver.exe"

    driver = webdriver.Chrome(driver_path)

    url = "https://images.google.com/"

    driver.get(url)

    # now will click on the images button

    search_box = driver.find_element_by_xpath("""/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/textarea""")
    search_box.send_keys(searchQ)
    search_box.send_keys(Keys.RETURN)


    # /html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[*]/a[1]/div[1]/img xpath of the images as * gives all images out there


    # wait for 5 seconds for some element to appear
    try:
        element = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located(
                (By.XPATH, """/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[2]/a[1]/div[1]/img"""))  # first image div
        )
        print("Element appeared before 5 secs!")
    except:
        print("Timed out after 5 seconds waiting for element to appear")
        return 0

    ht = driver.execute_script("return document.body.scrollHeight")
    cmd = """window.scrollTo(0, %s);""" % (ht)

    # this lets the all the images to load on the google images
    driver.execute_script(cmd)
    time.sleep(3)  # wait for the images to load

    driver.execute_script("window.scrollTo(0, 0);")

    i = random.randint(1, 20)

    divXPath = """/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[%s]""" % (i)
    previewImageXPath = """/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[%s]/a[1]/div[1]/img""" % (i)
    previewImageElement = driver.find_element_by_xpath(previewImageXPath)
    previewImageURL = previewImageElement.get_attribute("src")
    driver.find_element_by_xpath(divXPath).click()
    timeStarted = time.time()
    cdnURL = ""
    while True:
        imageElement = driver.find_element_by_xpath("""/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div[2]/div/div[2]/div[2]/div[2]/c-wiz/div/div/div/div[3]/div[1]/a/img[1]""")
        cdnURL = imageElement.get_attribute('src')

        if cdnURL != previewImageURL:
            # print("actual URL", imageURL)
            # Downloading image
            try:
                download_image(cdnURL, foldername, t)
                print("Downloaded element %s out of %s total. URL: %s" %(t, 5, cdnURL))
                break
            except:
                print("Couldn't download an image %s, taking the screenshot instead" % (i))
          
                imageElement.screenshot("""C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/service/videoImg/google/%s.jpg""" % (t))
                break
        else:
            # making a timeout if the full res image can't be loaded
            currentTime = time.time()
            if currentTime - timeStarted > 10:
                print("Timeout! Will download a lower resolution image and move onto the next one")
                imageElement.screenshot("""C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/service/videoImg/google/%s.jpg""" % (t))
                break
    driver.quit()
    return 1