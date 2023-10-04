import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import requests
from bs4 import BeautifulSoup

#Firebase database 인증 및 앱 초기화
cred = credentials.Certificate('mykey.json')
firebase_admin.initialize_app(cred,{
    'databaseURL' : 'https://python-firebase-practice-39795-default-rtdb.firebaseio.com/' 
})



#윤찬 블로그 크롤링 + firebase update
#select가 아니라 select_one으로 바꿔도 무방하긴 함
for i in range(2,5):
    response = requests.get(f"https://yoonchan1121.tistory.com/{i}")
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    
    ref = db.reference(f"윤찬/블로그{i-1}페이지")

    titles = soup.select('.title_view')
    for title in titles:
        title_text = title.text
        ref.update({'제목' : title_text})
        print(title_text)
        
        
    details = soup.select('#main > div > div > ul > li > div > div > div.article_view > div.tt_article_useless_p_margin.contents_style')
    for detail in details:
        detail_text = detail.text.strip()
        ref.update({'내용' : detail_text})
        print(detail_text)

    dates= soup.select('.date')
    for date in dates:
        date_text = date.text
        ref.update({'날짜' : date_text})
        print(date_text)
        

    link = f"https://yoonchan1121.tistory.com/{i}"
    ref.update({'링크' : link}) 
    print(link)
    
        
#유덕 블로그 크롤링 + firebase update

for i in range(3,10):
    response = requests.get(f"https://ps5045.tistory.com/{i}")
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    
    ref = db.reference(f"유덕/블로그{i-2}페이지")

    titles = soup.select('.title-article')
    for title in titles:
        title_text = title.text.strip()
        ref.update({'제목' : title_text})
        print(title_text)
        
    details = soup.select('#container > main > div > div.area-view > div.article-view > div.tt_article_useless_p_margin.contents_style')
    for detail in details:
        detail_text = detail.text.strip()
        ref.update({'내용' : detail_text})
        print(detail_text)
        

    dates= soup.select('.date')
    for date in dates:
        date_text = date.text.strip()
        ref.update({'날짜' : date_text})
        print(date_text)
        

    link = f"https://ps5045.tistory.com/{i}"
    ref.update({'링크' : link}) 
    print(link)