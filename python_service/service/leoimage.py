from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import os
import requests
import time
import requests
import random
import shutil
import time


def download_image(url, num, folder_name):
    # write image to file
    reponse = requests.get(url)
    if reponse.status_code == 200:
        with open(os.path.join(folder_name, str(num)+".jpg"), "wb") as file:
            file.write(reponse.content)


opt = Options()

# this debuggerAddress refers to the port the newly created instance is running on 9222
opt.add_experimental_option("debuggerAddress", "localhost:9222")


def googleImg(Prompts, folder_name_google):
    if len(Prompts) == 0:
        return 1
    driver_path = "C:/Users/Hp/Documents/youtube_automation/chromedriver_114/chromedriver.exe"

    driver = webdriver.Chrome(driver_path)

    try:
        t = 0
        for prompt in Prompts:
            url2 = "https://images.google.com/"

            driver.get(url2)

            # now will click on the images button

            search_box = driver.find_element_by_xpath(
                """/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/textarea""")
            search_box.send_keys(prompt)
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

            divXPath = """/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[%s]""" % (
                i)
            previewImageXPath = """/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[%s]/a[1]/div[1]/img""" % (
                i)
            previewImageElement = driver.find_element_by_xpath(
                previewImageXPath)
            previewImageURL = previewImageElement.get_attribute("src")
            driver.find_element_by_xpath(divXPath).click()
            timeStarted = time.time()
            cdnURL = ""
            while True:
                imageElement = driver.find_element_by_xpath(
                    """/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div[2]/div/div[2]/div[2]/div[2]/c-wiz/div/div/div/div[3]/div[1]/a/img[1]""")
                cdnURL = imageElement.get_attribute('src')

                if cdnURL != previewImageURL:
                    # print("actual URL", imageURL)
                    # Downloading image
                    try:
                        download_image(cdnURL, t, folder_name_google)
                        print("Downloaded element %s out of %s total. URL: %s" % (
                            t, 5, cdnURL))
                        break
                    except:
                        print(
                            "Couldn't download an image %s, taking the screenshot instead" % (i))

                    imageElement.screenshot(
                        """C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/service/videoImg/google/%s.jpg""" % (t))
                    break
                else:
                    # making a timeout if the full res image can't be loaded
                    currentTime = time.time()
                    if currentTime - timeStarted > 10:
                        print(
                            "Timeout! Will download a lower resolution image and move onto the next one")
                        imageElement.screenshot(
                            """C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/python_service/service/videoImg/google/%s.jpg""" % (t))
                        break
            t += 1
    except:
        exit(0)
    driver.quit()
    return 1


def imageGen2(imageObj):

    audioObj = []

    try:

        driver_path = "C:/Users/Hp/Documents/youtube_automation/chromedriver_114/chromedriver.exe"

        driver = webdriver.Chrome(driver_path, options=opt)

        driver2 = webdriver.Chrome(driver_path)

        for prompt in imageObj:

            obj = {
                "leornado": "",
                "google": ""
            }

            url = "https://app.leonardo.ai/ai-generations"

            driver.get(url)

            element = WebDriverWait(driver, 10).until(EC.presence_of_element_located(
                (By.XPATH, """/html/body/div[1]/div/div/div/div[2]/div/div/div[3]/div[2]/textarea""")))

            leoPrompt = prompt["leornado"]
            element.clear()
            # leoPrompt["title"]+":"+leoPrompt["description"]

            element.send_keys(
                str(prompt["leornado"]["title"])+":"+str(prompt["leornado"]["description"]))

            generate = driver.find_element_by_xpath(
                """//*[@id="__next"]/div/div/div/div[2]/div/div/div[3]/div[5]/div[4]/button""")

            generate.click()

            time.sleep(20)

            try:
                imageElement = driver.find_element_by_xpath(
                    """/html/body/div[1]/div/div/div/div[2]/div/div/div[6]/div[2]/div[1]/div/div[3]/div/div[2]/div[1]/div/div/img""")  # first image div
                cdnURL = imageElement.get_attribute('src')
                obj["leornado"] = cdnURL

            except:
                print("element did not appear")

            if prompt["google"] != "":

                url2 = "https://images.google.com/"

                driver2.get(url2)

                # now will click on the images button

                time.sleep(2)


                search_box = driver2.find_element_by_xpath("""/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/textarea""")
                search_box.send_keys(prompt["google"])
                search_box.send_keys(Keys.RETURN)

                time.sleep(3)

                ht = driver2.execute_script("return document.body.scrollHeight")
                cmd = """window.scrollTo(0, %s);""" % (ht)

                # this lets the all the images to load on the google images
                driver2.execute_script(cmd)
                time.sleep(3)  # wait for the images to load

                driver2.execute_script("window.scrollTo(0, 0);")

       

                previewImageElement = driver2.find_element_by_xpath("""/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[4]/a[1]""")
                previewImageElement.click()

                time.sleep(3)

                url = previewImageElement.get_attribute('href')

                parent_element = driver2.find_element_by_xpath('/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[2]/c-wiz/div/div/div/div[3]/div[1]/a')
                image_elements = parent_element.find_elements_by_tag_name('img')

                image_sources = []
                for image_element in image_elements:
                    image_sources.append(image_element.get_attribute('src'))

    

                print(image_sources)

                if 'http' in image_sources[0]:
                    obj["google"] = image_sources[0]
                else:
                    driver2.get(url)
                    time.sleep(5)
                    imageElement = driver2.find_element_by_xpath("""/html/body/c-wiz/div/div[1]/div/div[1]/div[2]/div[2]/div[2]/c-wiz/div/div/div/div[2]/div/a/img""")  
                    obj["google"] = imageElement.get_attribute('src')

                # except:
                #     print("Timed out after 10 seconds waiting for element to appear")
                #     return 0

            audioObj.append(obj)
    except:
        exit(0)

    driver.quit()
    driver2.quit()
    return audioObj


testObj = [
    {
        "google": 'Zahi Hawass Former Minister of Antiquities of Egypt',
        "leornado": {
            "title": 'The Great Pyramid of Giza',
            "description": 'A colossal limestone pyramid located in Giza, Egypt.'
        }
    },
    {
        "google": 'James Henry Breasted American Egyptologist',
        "leornado": {
            "title": 'The Book of the Dead',
            "description": 'A papyrus scroll containing a collection of funerary texts.'
        }
    },
    {
        "google": 'Jean-François Champollion French Egyptologist',
        "leornado": {
            "title": 'The Rosetta Stone',
            "description": 'A multilingual slab of stone containing a decree issued by the pharaoh Ptolemy V in three languages.'
        }
    }
]

print(imageGen2(testObj))
