---
layout: post
title:  "colab부터 시작하는 어간분석"
date:   2022-02-05
image:  colab.png
tags:   [Data]
sitemap:
    changefreq: daily
    priority: 1.0
---

# 나도 편하게 크롤링 하고싶어!
---

<br>

![image](https://github.com/user-attachments/assets/ef4245ce-f5ec-4ccb-8b91-12a8dd082866)

colab은 구글신이 제공하는 서비스로, python에서 지원하는 대부분(최소한 제가 아는 모든)의 모듈을 지원하며, 무료로 연구용 **GPU**를 제공하는 서비스 입니다.  ​

안드로이드를 사용하지 않는 분이라도 요즘은 대부분 구글 계정을 가지고 계실거라고 감히 생각하는데요, 구글 드라이브에서 아주 쉽게 colab에 접근할 수 있습니다.  

![image](https://github.com/user-attachments/assets/4316056a-8b90-4152-80d3-35f232693c7e)

바로 구글 드라이브에서 [우클릭]-[더보기]-[Google Colaboratory]를 선택하면 colab 파일이 생성이 됩니다.  
구글 colab 파일은 .ipynb 파일로, 아는 분은 모두 알고 계실 주피터 노트북 파일입니다.  
여기서는 블록의 실행과 동시에 코드를 실행하고, 그 상태(state)를 저장하기 때문에 입문자에게 매우 유용한 플랫폼입니다!  
심지어 초기 셋팅의 어려움도 겪을 필요가 없지요!!  

![image](https://github.com/user-attachments/assets/6f5a2aa1-fb41-4b92-ab45-594345f68cf3)

첫 실행 화면은 이렇게 휑한 모습인데요, 여기서 폴더 이미지를 클릭한 뒤 [드라이브 마운트]를 해준다면 자신의 구글 드라이브에 연결이 된답니다.  

![image](https://github.com/user-attachments/assets/d54850c6-6302-44bc-8e23-9f7530676b96)

앞으로 우리의 경로는 '/content/drive/MyDrive' 입니다.  

<br><br>

# colab에서 twitter 크롤링
---

<br>

생각보다 크롤링에 관심을 갖는 분이 많으신데, 솔직히 커뮤니티 크롤링은 저도 매번 크롬 개발자 도구 들어가서 하드코딩으로 작성하기 때문에 알려드리기 어려워요.  
AI 관련 인턴 근무할 때, 대리님이나 차장님도 웹 소스 직접 뜯어서 보려고 하셨거든요.  
물론 그런 잡일은 제가 했지만..ㅎ  
​

하지만 트위터 크롤링은 입문자의 토이 프로젝트로도 많이 사용되는만큼 관련 라이브러리가 많기 때문에 키워드 기반 트위터 크롤링만 다루려고 합니다.  
무우울론 이것도 이미 예전 포스팅으로 다룬 적 있지만, 이번에는 정말 기본부터 시작한다는 느낌으로 진행해보겠습니다.  

<br>

```
!pip install scweet
```

<br>

크롤링에 사용되는 모듈은 scweet입니다.  
원래 사용하던 모듈은 막혀서 새롭게 찾은 모듈이예요.  
이건 언제 막힐지 모르겠지만, 공식 api는 최근 일주일 데이터밖에 불러올 수 없기 때문에 scweet을 이용합니다.  
​

참고로 colab에서 '!'를 덧붙일 경우 리눅스 명령어를 실행시킬 수 있습니다. (그냥 그렇다구요)  

그리고 python 관련 모듈을 설치할 때에는 대부분 'pip install'라는 명령어를 이용합니다.  

![image](https://github.com/user-attachments/assets/8e0681c5-e509-44aa-84d2-74199c5f7b42)

> 여기부터 실행 화면이 제공되지 않습니다.  
> 대신 여러분은 이걸 그대로 붙여넣으시면 됩니다.  

<br>

```python
from Scweet.scweet import scrape

keyword = 'input_keyowrd'
since = 'input_start_date'  # 'YYYY-MM-DD'
until = 'input_end_date'    # 'YYYY-MM-DD' or None

crowl_df = scrape(words=keyword, since=since, until=until, from_account=None, interval=1, headless=False, display_type='Top', save_images=False, filter_replies=True)
```

<br>

keyowrd 옆의 input_keyword 부분에 (작은따옴표 안쪽에!!) 여러분이 검색하고자 하는 키워드를 입력하세요!  
​

since 부분에는 여러분이 긁어오고 싶은 날짜의 시작지점을 작성합니다.  
참고로 python에서 '#' 이후의 텍스트는 실행되지 않으며, 주석이라고 불립니다.  
저는 보통 이 부분에 입력 포멧을 작성하는 편인데, 여기에 날짜는 '연도4자리-달-일자'를 입력하시면 됩니다.  
​

until 부분에는 여러분이 긁어오고 싶은 날짜의 끝지점을 작성합니다.  
입력 포멧은 since와 똑같이 작성하면 됩니다.  
​

참고로 변수명에 해당하는 keyword, since, until은 변경하시면 안돼요.  
아래의 명령어에 영향을 주거든요  
​

이 명령을 실행하시면 구글 드라이브에 output이라는 이름의 폴더가 생성될거예요.  
그리고 그 폴더 안에 생성된 excel 파일을 이용해 다음에 이어질 어간분석을 진행할 수 있습니다.  

<br><br>

# 엑셀파일에서 어간 분석하기
---
<br>

```
! pip install konlpy
```

<br>

konlpy는 한국어 어간분석을 도와줄 수 있는 모듈입니다.  
아까와 같은 방법으로 모듈을 설치합니다.  

<br>

```python
from konlpy.tag import Twitter
import pandas as pd

file_name = 'file_name'

my_df = pd.read_csv(f"/content/drive/MyDrive/output/{file_name}.csv", encoding='cp949')
my_df = pd.read_excel(f"/contetn/drive/MyDrive/output/{file_name}.xlsx")
```

<br>

우리는 트위터를 긁어왔으니 konlpy 중에서도 Twitter를 활용합니다.  
pandas는 우리가 엑셀 파일을 불러오고 저장하는 데에 도움을 줄거예요.  
​

다만 우리가 불러올 파일이 csv일 때와 xlsx일 때는 조금 구분을 해주셔야 해요.  
만약 위의 방법으로 트위터 크롤링을 진행한 csv 파일일 경우 아래서 두 번째 줄의 read_csv를 이용합니다.  
다른 방법으로 수집한 데이터라 xlsx로 시작하는 파일이라면 맨 마지막 줄의 read_excel을 이용합니다.  
​

참고로 큰 따옴표 앞에 붙은 'f'는 우리가 작성한 file_name라는 변수에 할당된 값을 문자열에 전달하는 역할을 합니다.  
그리고 보통 utf-8 인코딩을 사용하는데, MS에서 용량을 줄이기 위해 csv 파일에서 cp949 방식의 인코딩을 사용하기 때문에 csv 파일에서만 인코딩을 따로 설정해주었습니다.  
이해 안되셨다구요? 상관 없습니다. 그냥 둘 중 하나 파일 확장자 보고 선택하신 뒤 나머지 지우시면 돼요.  

<br>

```python
twitter = Twitter()

col_name = 'col_name'   # 분석하려는 열의 제목을 작성해주세요.
noun_adj_list = []

for tweet in my_df[col_name]:
  for s, p in twitter.pos(tweet):
    if p in ['Noun', 'Adjective']:
      noun_adj_list.append(s)
```

<br>

이 코드는 엑셀의 파일 내에서 원하는 데이터에서 명사와 형용사를 골라내주는 친구입니다.  
엑셀에서 원하는 데이터의 열을 복사해서 `col_name`에 입력해주세요.  
따옴표 모양은 크게 관계 없지만 되도록이면 코드 안에 있는 작은 따옴표 안에 적어주세요. 안그러면 그냥 제가 불편해요.  

<br>

```python
from collections import Counter

count_df = Counter(noun_adj_list)

re_df = pd.DataFrame.from_dict(count_df, orient='index')
re_df.to_excel("/content/drive/MyDrive/output/count_result.xlsx")
```

<br>

이제 드디어 저장된 단어들 수를 세어 저장할 타이밍입니다.  
저는 개인적으로 csv를 선호하지만, 여러분은 저처럼 불편하지 마시라고 xlsx로 저장하는 코드로 수정해봤어요.  

