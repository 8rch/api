from bs4 import BeautifulSoup
import requests
#import pandas as pd

url = 'https://coinmarketcap.com/es/currencies/solana/'
page = requests.get(url)
soup= BeautifulSoup(page.content, 'html.parser')
#dataconsult
eq= soup.find_all('div', class_='priceValue')

equipos= list()
for i in  eq:
    equipos.append(i.text)

print(equipos,len(equipos))