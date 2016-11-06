import requests
import json
import yaml
from bs4 import BeautifulSoup

with open("config.yml", 'r') as config:
  cfg = yaml.load(config)

# Parameters

URL_LOGIN=cfg["is"]["login"]
URL_OVERVIEW=cfg["is"]["overview"]
URL_MYPAGE=cfg["is"]['mypage']

username=cfg["is"]["username"]
password=cfg["is"]["password"]

jsonfile="../private/ice.json"

headers={"User-Agent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36"}

s=requests.Session()
s.headers.update(headers)
r=s.get(URL_LOGIN)

thai=BeautifulSoup(r.content, "html5lib")

VIEWSTATE=thai.find(id="__VIEWSTATE")['value']
EVENTVALIDATION=thai.find(id="__EVENTVALIDATION")['value']

login_data={"__VIEWSTATE":VIEWSTATE,
"__EVENTVALIDATION":EVENTVALIDATION,
"ctl00$ContentPlaceHolder1$tbUserID":username,
"ctl00$ContentPlaceHolder1$tbPIN":password,
"ctl00$ContentPlaceHolder1$btnHiddenSubmit":""}

r=s.post(URL_LOGIN, data=login_data)

# Find bandwidth

k=s.get(URL_OVERVIEW)

ka_data = []

ka=BeautifulSoup(k.content, "html5lib")

ka_data.append(ka.find(id="ctl00_ContentPlaceHolder1_hfUsageLimit")['value'])
ka_data.append(ka.find(id="ctl00_ContentPlaceHolder1_hfUsageUsed")['value'])

# Find information

f=s.get(URL_MYPAGE)

fa_out = []
fa_data = []

fa=BeautifulSoup(f.content, "html5lib")

fa_table = fa.find('table', id=cfg["is"]["table_abo"])
fa_rows = fa_table.findAll('tr')

for tr in fa_rows:
  fa_cols = tr.findAll('td')
  for td in fa_cols:
    fa_text = td.get_text(' ', strip=True)
    fa_out.append(fa_text)

fa_data.append(fa_out[3]);
fa_data.append(fa_out[4]);

obj = {"bandwidth": {"limit": ka_data[0], "usage": ka_data[1]}, "info": {"sim": fa_data[0], "ip": fa_data[1]}}

print (json.dumps(obj))

with open(jsonfile, 'wt') as out:
  out.write(json.dumps(obj))

