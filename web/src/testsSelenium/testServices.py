from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

driver.get("http://localhost:8082/home")


ServicesButton = driver.find_element(By.ID, "ServicesButtonSel")
ServicesButton.click()

time.sleep(1)

assert "http://localhost:8082/services" in driver.current_url

driver.quit()
