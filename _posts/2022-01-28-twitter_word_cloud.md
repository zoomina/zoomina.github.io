---
layout: post
title:  "트위터 데이터를 활용한 Word cloud"
date:   2022-01-28
image:  twitter.png
tags:   [Marketing, Data]
sitemap:
    changefreq: daily
    priority: 1.0
---

이번엔 꽤 시간이 지나긴 했지만, 개인 과제에 사용한 Word cloud를 만드는 방법에 대해 소개해보려고 합니다.  

뮤지컬 제작사별로 콘크리트층 고객의 수요를 파악하고, 시각화 하기 위해 이 방법을 사용했는데요, 결과물은 이런식으로 나오게 됩니다.  

<br>

![image](https://github.com/user-attachments/assets/782b7729-07b0-4b4b-807d-ecba4005b608)

<br><br>

# 트위터 크롤링
: scweet  

---

<br>

트위터 크롤링을 위해서는 scweet이라는 라이브러리를 사용했습니다.

[Scweet - PyPI](https://pypi.org/project/Scweet/)

<br>

사실 예전에 사용하던 tweeterscraper가 막혀서 한참 방황하다가 찾은 라이브러리인데요, 사용법은 아주 간단합니다!  

<br>

```
pip install scweet
```

<br>

설치는 당연히 pip를 이용해서 진행합니다.  
​

pypi에 굉장히 간단하게 나와있는 예제가 바로 사용법 그 자체입니다.  

저는 뮤지컬 컴퍼니 이름을 키워드로 2021년부터 가장 최근까지의 데이터를 모두 불러왔고, 이미지는 저장하지 않기 때문에 아래와 같은 코드를 작성했습니다.  

<br>

```python
from Scweet.scweet import scrape

shownote_full = scrape(words=['쇼노트'], since='2021-01-01', until=None, from_account=None, interval=1, headless=False, display_type='Top', save_images=False, filter_replies=True)
```

<br>

그러면 자동화된 창을 통해 (아마 selenium을 사용했겠죠..?) 조건별 검색을 반복하여 트윗을 크롤링한 뒤 `'./output/{keyword_since_until}.csv'` 형태로 저장됩니다.  ​

csv는 아래와 같은 형태로 저장이 되는데, 저에게 필요한 것은 `Embeded_text`에 들어있는 트윗 내용 뿐이기 때문에 이를 활용합니다.  

<br>

![image](https://github.com/user-attachments/assets/caa71b01-3410-4ca9-9755-4179bf02cdf0)

<br><br>

# 어간 분석
: konlpy  

---

<br>

크롤링 된 트윗의 내용 중 광고와 혐오표현, 부적절한 내용(무관한 내용)은 직접 눈으로 보고 골라내는 수 밖에 없습니다..ㅠ  

그래서 저도 엑셀을 보고 전부 수동으로 정리를 해주었는데요, 이때는 트윗 내림차순/오름차순으로 보면서 중복들 위주로 제거해주시면 그나마 편하게 진행하실 수 있습니다.  

전처리를 모두 마친 뒤, 어간 분석을 위해서 konlpy를 이용할 예정입니다.  

미리 stopword를 제거하려고 찾아보았지만, 한국어는 직접 stopword 사전을 정의해야 한다고 해서 그냥 포기했습니다.  

​저는 추출된 어간 중 명사와 형용사에 해당하는 어간들을 count하는 방식으로 분석을 진행했습니다.  

<br>

```
pip install konlpy
```

<br>

konlpy도 마찬가지로 pip를 이용하여 설치합니다.  

<br>

```python
from konlpy.tag import Twitter
import pandas as pd

show_df = pd.read_csv("/content/drive/MyDrive/GMB7/쇼노트_2021-01-01_2022-01-23.csv", encoding='cp949')
```

<br>

저희가 분석할 내용은 Twitter의 내용이기 때문에 konlpy에서도 Twitter를 사용합니다.  

참고로 csv에서 한국어는 utf-8이 아니라 cp949 방식으로 인코딩되어있기 때문에 인코딩을 따로 설정해주셔야합니다.  

따로 설정해주지 않으면 글씨가 모두 깨져요!  

<br>

```python
twitter = Twitter()

noun_adj_list = []

for tweet in show_df['Embedded_text']:
  for s, p in twitter.pos(tweet):
    if p in ['Noun', 'Adjective']:
      noun_adj_list.append(s)
```

<br>

twitter 객체를 생성해주고, `twitter.pos`를 이용해 어간별로 pos taging을 진행합니다.  

`twitter.pos(tweet)`의 output은 어간, 품사이기 때문에 품사가 명사와 형용사인 어간만 리스트에 저장합니다.  

<br>

```python
from collections import Counter

count_df = Counter(noun_adj_list)
```

<br>

collections의 Counter를 이용하면 list에 같은 element가 몇 개 있는지 세어줍니다.  

결과는 아래와 같이 출력됩니다.  

```
Counter({'생각': 311,
         '잠시': 12,
         '놨던': 1,
         '공연': 299,
         '다시': 151,
         '재': 88,
         '예매': 214,
         ...
         '이애': 2,
         '설': 2,
         '콜': 56,
         '커튼': 56,
         '정신차려요': 2,
         ...})
```

<br>

```python
re_df = pd.DataFrame.from_dict(count_df, orient='index')
re_df.to_csv("/content/drive/MyDrive/GMB7/count_shownote.csv")
```

<br>

Counter 객체를 DataFrame 형태로 변환한 뒤, csv형태로 저장합니다.  

<br><br>

# Tableau를 이용한 Word cloud 생성

---

<br>

​![image](https://github.com/user-attachments/assets/d3e1744a-acaf-4c82-bb45-848866ae640f)

<br>

우선 Tableau에서 데이터를 불러온 뒤, 새로운 시트를 생성합니다.  

<br>

![image](https://github.com/user-attachments/assets/718d230b-353c-41ef-b672-93002a35b093)

<br>

어간에 해당하는 속성값을 텍스트 박스로 끌어다 놓으면 우리가 가지고 있는 어간이 모두 나열됩니다.  

<br>

​![image](https://github.com/user-attachments/assets/4b5547d2-2361-4dd4-b33a-9e7296177f5e)

그 다음 count에 해당하는 속성값을 크기 박스에 끌어다 놓으면 이런 형식의 시트가 생성이 되는데요,  

<br>

![image](https://github.com/user-attachments/assets/d42c5254-f591-4e77-8ea9-d211ee212264)

<br>

크기 항목을 텍스트로 변경해주면 자연스럽게 글자의 크기로 변하게 됩니다.  

<br>

![image](https://github.com/user-attachments/assets/d308a5a1-0fdf-4d83-982c-6a65ed7233ff)

<br>

추가적으로 count 항목을 색상 박스에 끌어다놓으면 색의 진하기로 그 강도가 표현되기 때문에 더 가시성이 좋아집니다.  

참고로 폰트는 [서식] - [글꼴] 탭에서 변경이 가능하며, 색상은 우상단의 범례를 더블클릭 하시면 변경 가능합니다.  