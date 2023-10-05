#데이터 크롤링
import requests
from bs4 import BeautifulSoup

response = requests.get("https://usagi0012.tistory.com")
html = response.text
soup = BeautifulSoup(html, "html.parser")

titles = soup.select('.title')
blog_title = []
for title in titles:
  blog_title.append(title.text.strip())

dates = soup.select('.date')
blog_date = []
for date in dates:
  blog_date.append(date.text)

articles = soup.select('.article-content .link-article')
blog_article = []
for article in articles:
  blog_article.append("https://usagi0012.tistory.com" + article['href'])


#파이어베이스에 데이터 저장
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

#Firebase database 인증 및 앱 초기화
cred = credentials.Certificate({
  "type": "service_account",
  "project_id": "sparta5-65934",
  "private_key_id": "68caeb2e49540727187247d30aeb9dbfa3bb1bc0",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDGK3h0qZcMZ2x3\nNHYAF5pT7WWZ7ut50jGU+S1kZaqBGKRmaWwmFkBuCVGBV0bj3OlB5GS33i0raWZA\n8txlzPcwd+N6X655cveleOeeYblalqn+gkWokeXsFCXA8OJANmCD3VTJi4dC4Vjy\nrgbT2F6k9eWnKiPYFuH12BB6cbE13Isxm8+Z8PujeA7BDvUFB1r9ZJk9RTqJwttJ\n1a14fgYK8Gh13s37kxCxG49Fq4Jd9vPSCchzTHSrdYiTLOFBoLq/zn/QryXKhI06\nmUIFWnXWHDj/3T6nKpLsNTrW9UXzKA/CAdNn9F/34Q3sPBiaF/fRFL/hk2zVfQWk\noQR9L+9xAgMBAAECggEAAeyoxZ3Cv7ImrJDt6y3vf8yGs8AtKVyCIqGpmB+wYGLx\nUEUKccN+Lk9g+zACOkriOUOG+p3hy4nRTlTJcQPku+PTKcRhevCT0PefzLMDYDrF\ntXj1hRe/H0v6CqHQOapJhUhORyuHpY2vjeJEotSnZSPV7knXiaT9vmPh85V0cIri\njls6j7fs64ZCXcXd41q/tMxbykA1BR0qKz6kYD0rXUEvMyz7pBmmTgS6SpwzZCzQ\nzjpVRn791YskxjMmcawuQgIrEnG1QxV9+sBIs6GKcVe7Uy558YfZvMUEvyqtpXSJ\nI8KQ/3dJh3ifD8qGPQ18m8/oOCLNsuL/7EuRfNinQQKBgQDrpIyQFMLRDzg7n+ur\niURQendrJQkibgwiRJ+qqT8eXbYiT234RDj2HgUA0PljM4QsLDMzbAGdUqG5jG7P\nLeZANvj5yLlCdC62rNyXaVxdgfEpXxBGMJLxJxOh1HvMZs0EiSZJ0lGpDxlY96PZ\ndtL3vqZqP37GPAgUbVEj18jOQQKBgQDXSixePMHoiA9MXc6tOaOXei1GydMNF/Gj\nNc6ctr2+p1m3nNoLNKiA05WKEkA8uuUGBxLxHAA3/vYFpJn2SxYxJn3AtnhIB+wS\n8Ukka+CzsLA8PHJQ4KpHSxl+/aCkgk1HfUGAeIjY8gV2ZGheR8HuYQMZm1WAvNME\nWsm3s801MQKBgEjrCnQreH2o8AXDXvId7/3XZ8zIESOOWkLgaWguJ1IGPa4wVh9V\nPSsr7vBpukJwVp40r0NiUL2WLGV2h3OlCHMmj7T74BgoS6xLoZdZCzQEWdQrjqWp\nsk7dgL27OvPte9PDfQ2q/4oJGhblytYoZvAzFtwZ+ejt+rIXgdxNkd4BAoGATP2k\nokreGZdWyTue5sn/G/PAb1lL1ZnjezeJ3PdpId5dMlGwlGNPg0qnZsoiGNXJg39S\nIdGermfKebgkqzStCgS24g0fNLtIjHmna5P8tqYQUGpZg1zk6DwOMSDoqwxCMLe1\njgkM/3CFzZIY1OaajvI4lpa7XB+q4xrImp59W3ECgYAUfkwc6cvrReopvS7vuhPW\n7b7e98f8mjo8sZSUcDtajIQE0g2muQh5s6KzJYF753c3mB6is1adJ6/K1PB/aeps\n5UUdPl6nVMkOag9JjrpVqKiv5QjZqpYejEJyAmkUA/cOTbLkyB5VOEdXmxUnhwEs\nxZcaVsqm/G6eaz4JFLM5Vw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-9qbjz@sparta5-65934.iam.gserviceaccount.com",
  "client_id": "112733297341927066339",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9qbjz%40sparta5-65934.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
})
firebase_admin.initialize_app(cred,{
    'databaseURL' : 'https://sparta5-65934-default-rtdb.firebaseio.com/'
})

for i in range(1,4):
  ref = db.reference(f'member4/{i}')
  ref.update({'제목':blog_title[i-1]})
  ref.update({'날짜':blog_date[i-1]})
  ref.update({'링크':blog_article[i-1]})