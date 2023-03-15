from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import random

driver = webdriver.Chrome()

driver.get("http://localhost:8082/")

assert "Area" in driver.title

email_field = driver.find_element(By.NAME, "email")
email_field.clear()
randomName = "demo" + str(random.randint(0, 10000)) + str(random.randint(10000, 1000000)) + "@area.com"
email_field.send_keys(randomName)

password_field = driver.find_element(By.NAME, "pswd")
password_field.clear()
password_field.send_keys("demodemo")

button = driver.find_element(By.CSS_SELECTOR, "button")
button.click()

time.sleep(1)
assert "http://localhost:8082/home" in driver.current_url

driver.quit()
