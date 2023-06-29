from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import requests
import io
from PIL import Image
import time

PATH = "C:/Users/Hp/Documents/youtube_automation/chromedriver_114/chromedriver.exe"

wd = webdriver.Chrome(PATH)

url2 = "https://images.google.com/"

wd.get(url2)

time.sleep(2)

search_box = wd.find_element_by_xpath("""/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[2]/textarea""")
search_box.send_keys("zahir hawas egypt")
search_box.send_keys(Keys.RETURN)

time.sleep(3)

ht = wd.execute_script("return document.body.scrollHeight")
cmd = """window.scrollTo(0, %s);""" % (ht)

# this lets the all the images to load on the google images
wd.execute_script(cmd)
time.sleep(3)  # wait for the images to load

wd.execute_script("window.scrollTo(0, 0);")

previewImageElement = wd.find_element_by_xpath("""/html/body/div[2]/c-wiz/div[3]/div[1]/div/div/div/div/div[1]/div[1]/span/div[1]/div[1]/div[4]/a[1]""")
previewImageElement.click()

time.sleep(2)

# print(previewImageElement.get_attribute('href'))

url = previewImageElement.get_attribute('href')

parent_element = wd.find_element_by_xpath('/html/body/div[2]/c-wiz/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[2]/c-wiz/div/div/div/div[3]/div[1]/a')
image_elements = parent_element.find_elements_by_tag_name('img')


# Iterate over the image elements and retrieve the image sources
image_sources = []
for image_element in image_elements:
    image_sources.append(image_element.get_attribute('src'))

print(image_sources)

wd.get(url)

time.sleep(5)

imageElement = wd.find_element_by_xpath("""/html/body/c-wiz/div/div[1]/div/div[1]/div[2]/div[2]/div[2]/c-wiz/div/div/div/div[2]/div/a/img""")  
print(imageElement.get_attribute('src'))

reponse = requests.get(imageElement.get_attribute("src"))
if reponse.status_code == 200:
    with open("C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/hardwork.jpg", "wb") as file:
        file.write(reponse.content)
