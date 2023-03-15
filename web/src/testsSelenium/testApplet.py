from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()

driver.get("http://localhost:8082/")

goToLogin = driver.find_element(By.ID, "loginSel")
goToLogin.click()

time.sleep(2)

email_field = driver.find_element(By.ID, "emailSel")
email_field.clear()
email_field.send_keys("demo@area.com")

password_field = driver.find_element(By.ID, "pswdSel")
password_field.clear()
password_field.send_keys("demodemo")

button = driver.find_element(By.ID, "buttonSel")
button.click()

time.sleep(1)


goToActions = driver.find_element(By.ID, "newAppletSel")
goToActions.click()

assert "http://localhost:8082/actions" in driver.current_url

driver.quit()
