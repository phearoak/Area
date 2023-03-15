import os

directory = "web/src/testsSelenium"

for filename in os.listdir(directory):
    if os.path.isfile(os.path.join(directory, filename)):
        name = "\033[32m" + filename + "\033[0m"
        print(name)
        os.system('python3.10 web/src/testsSelenium/' + filename)
        print("---------------------------------")
