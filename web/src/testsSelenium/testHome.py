from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

driver.get("http://localhost:8082/home")

newApplet = driver.find_element(By.ID, "newAppletSel")
newApplet.click()

time.sleep(1)

assert "http://localhost:8082/actions" in driver.current_url

home = driver.find_element(By.ID, "logo")
home.click()

time.sleep(1)

assert "http://localhost:8082/home" in driver.current_url

driver.quit()
