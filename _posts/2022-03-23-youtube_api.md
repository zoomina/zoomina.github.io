---
layout: post
title:  "Youtube API를 이용한 고객 반응 분석"
date:   2022-03-23
image:  youtube.jpg
tags:   [Marketing, Data]
sitemap:
    changefreq: daily
    priority: 1.0
---

# YouTube Data API v3
: Google Cloud Platform
---

우선 유튜브 API를 사용하기 위해서는 Google Cloud Platform(GCP)에서 개발자 등록이 돼있어야 할 거예요(아마..?)  
저는 꽤 오래 전에 챗봇 프로젝트를 진행하면서 등록을 마쳤기 때문에 바로 새 프로젝트를 생성하고 API 사용 신청만 했습니다.  

<br>

![image](https://github.com/user-attachments/assets/d5d9ad02-b772-4523-8f31-c21de8177ae5)

<br>

이번에 사용할 API는 YouTube Data API v3입니다.  
지금 관리라고 적힌 파란 버튼이 원래는 사용 버튼인데, 클릭하면 바로 사용할 수 있어요.  

<br>

![image](https://github.com/user-attachments/assets/bbfcec13-bb69-457c-82cc-542a99fcbd06)

<br>

이후 관리 탭으로 들어가 사용자 인증 정보 만들기를 통해 API키를 생성하시면 됩니다.  ​

일별 할당량이 1만 쿼터(?)라고 알고 있는데, 제가 하루만에 6개 채널에 대한 분석을 진행하고 싶어서 최대한 계산을 많이 하고 최적화를 시키기 위한 노력을 해봐야 할 것 같습니다.  

[![image](https://github.com/user-attachments/assets/986e606b-cb77-44ee-bc1c-e5aaf2b7c4ce)](​https://developers.google.com/youtube/v3/getting-started?hl=ko)

자세한 내용은 Data API 문서에 서술되어 있으므로, 저는 이번에 사용한 기능들 위주의 코드만 소개할 예정입니다.  

## Python으로 YouTube Data API 사용하기

```
pip install google-api-python-client
```

Python에서 YouTube Data API를 사용하기 위해서는 google-api-python-client라는 라이브러리를 설치하셔야 합니다.  

크롤링 과정은 아래에서 단계별로 서술할 예정입니다.  

<br><br>

# 대시보드 구성
---

데이터를 가져오기 전, 어떤 스토리보드를 작성할 지 먼저 고민해야 할 필요가 있습니다.  

무작정 모든 데이터를 긁어오기에는 시간과 할당량 제한이 있기 때문이예요.  

<br>

![image](https://github.com/user-attachments/assets/6750a241-f9ff-4941-a369-e16ff5056cc7)

<br>

지금까지는 거의 스토리보드를 작성하지 않고 그래프만 그렸지만, 이번에는 채널 별 반응을 한 눈에 확인할 수 있도록 세로형 스토리보드를 작성할 예정입니다.  

​

1. 팀에서 정성적으로 분석을 진행한 6개 채널에 대해 분석을 진행할 예정입니다.

2. 경쟁 채널은 어떤 카테고리 구성을 선택했으며, 이에 대한 반응은 어떠한지 시각화를 진행합니다.

    - 도넛 그래프 : 영상 별 플레이리스트 정보

    - 라인 그래프 : 영상 별 플레이리스트 정보, 조회수, 업로드 날짜

3. 고객 유입을 부추기는 제목을 분석하기 위해 조회수 별 제목 분석을 진행합니다.

    - 랭킹 차트 : 제목, 조회수

    - Word cloud : 제목, 조회수

4. 영상에 대한 고객의 반응을 확인하기 위해 댓글 수 기반으로 선정한 영상의 댓글 분석을 진행합니다.

    - 랭킹 차트 : 제목, 댓글 수

    - Word cloud : 상위 영상의 댓글, 댓글 좋아요 수

<br><br>

# 데이터 스키마 작성
---

<br>

요청 쿼리 수가 제한되어 있기 때문에, 최대한 적은 요청만으로 데이터 구성하고자 하였습니다.  

짤막하게나마 배운 SQL 스키마 작성 + 유튜브 API docs에서 소개된 함수들 인풋 아웃풋을 엄청 분석해서 작성한 최종 데이터 스키마입니다.  

<br>

![image](https://github.com/user-attachments/assets/f6b8f3a6-2b05-4b66-af28-d89fd766e82d)

<br>

- 채널명을 바탕으로 채널 ID를 추출합니다.

- 채널 ID를 key로 잡고, 크리에이터가 설정한 플레이리스트의 정보를 수집합니다.

- 저는 플레이리스트를 카테고리로 설정하고 분석을 진행할 예정입니다.

- 플레이리스트 ID를 기준으로 플레이리스트에 포함된 영상 목록을 정리합니다.

- 참고로 유튜브에는 업로드된 동영상 이라는 기본 플레이리스트가 있기 때문에 여기서 전체 영상 목록을 확인할 수 있습니다.

- 영상 ID를 기준으로 두 가지의 테이블이 생성됩니다.

- 첫 번째는 영상의 통계정보입니다.

- 두 번째는 영상의 댓글 정보입니다.

​<br>

![image](https://github.com/user-attachments/assets/31bc8c65-9f5a-4d6f-85a7-0147c41451ab)

<br>

추출된 모든 테이블을 Tableau에서 연결한 최종 스키마입니다.  

댓글은 워드 클라우드 생성을 위해 따로 처리할 예정이므로 본 스키마에 포함되지 않습니다.  

<br><br>

# 유튜브 크롤링 프로그램
---

이게 생각보다 길고 복잡한 과정이었(?)어서 설명을 하기엔 시간이 너무 오래 걸릴 것 같습니다...  

결론만 말씀드리면, 저와 남자친구가 같이 유튜브 크롤링 프로그램을 작성했는데요,  

<br>

[![image](https://github.com/user-attachments/assets/92c12de6-2bb6-41b9-90fb-afc8b7f660f4)](https://github.com/zoomina/youtube_crawl)

<br>

README에 사용법이 자세히 적혀있지 않기 때문에 간단한 설명을 덧붙이고자 합니다.  

​<br>

1. config.yaml 파일과 main.py 파일 두 가지를 다운받습니다.

2. main.py 파일은 수정하지 않습니다.

```python
# config
# youtube api token
DEVELOPER_KEY:    ## 발급받은 유튜브 API 토큰을 입력합니다. ex) "123456"

# EXACT channel names want to find. 
channel_names:    ## 채널명을 입력합니다. ex) ['리니비니']

playlists: 'uploaded'  ##"uploaded", "all", or [] any playlists of any channel names above

save: 'csv'       ## json or csv - json은 tree 구조, csv는 table 구조입니다.

top_n:
  based_on: views         ## 상위 영상 선정 기준을 views, likes, comments로 선택합니다.
  how_many_videos: 5      ## top_n 영상 개수를 정수로 입력합니다 -1 for all
  include_comments: True  ## 댓글 수집 여부를 True, False로 입력합니다.
```

<br><br>

# Tableau를 이용한 그래프 작성
---

안타깝게도 도넛 그래프를 찾지 못해서 원형 그래프로 그리게 되었는데..  

제가 작성한 대시보드는 아래의 링크를 참고해주세요!  

<br>

[![image](https://github.com/user-attachments/assets/a253b288-ff9f-4de2-a582-d36e72c34da8)](https://public.tableau.com/app/profile/.36647703/viz/youtube_hanzzan/1)

<br>

태블로 작성에 대해서는 여러차례 포스팅 한 적이 있기 때문에 참고 부탁드려요!  

<br>

- Tableau 그래프 작성

[Tableau로 간단하게 라인 그래프 만들기](./2022-01-24-Tableau_line_graph.md)

<br>

- 워드 클라우드 생성

[colab부터 시작하는 어간분석](./2022-02-05-colab_wordcrowd.md)  

[트위터 데이터를 활용한 Word cloud](./2022-01-28-twitter_word_cloud.md)  
