from bs4 import BeautifulSoup
import requests
#import pandas as pd
import json


url = 'https://coinmarketcap.com/es/currencies/solana/'
page = requests.get(url)
soup= BeautifulSoup(page.content, 'html.parser')
#dataconsult
eq= soup.find_all('div', class_='priceValue')

equipos= list()
for i in  eq:
    equipos.append(i.text)

##print(equipos,len(equipos))

jsonString = json.dumps(equipos)

print(jsonString)
with open('results.json', 'w') as f:
    json.dump(equipos, f, indent=2)
    print("The json file is created")