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

folder_name = "pics"

imagePrompts = ["An image depicting the ruins of what could have been Mumbai if the terror attack was successful.", "An image depicting a beachhead under heavy enemy fire, representing the potential chaos and destruction caused by the terror attack.","An image depicting the chaos and destruction caused by terrorists, representing the potential destruction of the city if successful","An image depicting the path of destruction that terrorists could have caused in India if the attack was successful.","An image depicting a clock which has come to a standstill, representing the potential effects of a successful terror attack.","An image depicting violence in India, representing the potential of extreme communal violence if successful.","An image depicting a distraught businessman, representing the potential economic crisis of a successful attack.","India-Pakistan War Scene","An image depicting a family in despair, representing the potential struggle and despair faced as a result of a successful attack.","World in Turmoil","An image depicting a raging storm, representing the potential worldwide turmoil caused by a successful terror attack in India.","An image depicting a calm beach, representing the potential peace and security of the country.","Aftermath of War","An image depicting hands of hope, representing the strength and perseverance of the nation despite a successful attack."]


def download_image(url,num):
    # write image to file
    reponse = requests.get(url)
    if reponse.status_code==200:
        with open(os.path.join(folder_name, str(num)+".jpg"), "wb") as file:
            file.write(reponse.content)

opt = Options()

opt.add_experimental_option("debuggerAddress","localhost:9222")  #this debuggerAddress refers to the port the newly created instance is running on 9222

def imageGen(imagePrompts):

    driver_path = "C:/Users/Hp/Documents/youtube_automation/short_story_ai_art/chrome_driver/chromedriver.exe"

    driver = webdriver.Chrome(driver_path,options=opt)

    url = "https://app.leonardo.ai/ai-generations"

    driver.get(url)


    try:

        element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH,"""//*[@id="__next"]/div/div/div/div[2]/div/div/div[3]/div[2]/textarea""")) #first image div
        )

        

        i = 1

        for prompt in imagePrompts:

            element.clear()
            element.send_keys(prompt)
        
            generate = driver.find_element_by_xpath("""//*[@id="__next"]/div/div/div/div[2]/div/div/div[3]/div[5]/div[4]/button""")

            generate.click()

            time.sleep(15)         

            try:
                imageElement = driver.find_element_by_xpath("""/html/body/div[1]/div/div/div/div[2]/div/div/div[6]/div[2]/div[1]/div/div[3]/div/div[2]/div[1]/div/div/img""") #first image div
                cdnURL= imageElement.get_attribute('src')
                download_image(cdnURL, i)
                i+=1
            except:
                print("element did not appear")

    except:
        exit()
    driver.quit()
    return 1

