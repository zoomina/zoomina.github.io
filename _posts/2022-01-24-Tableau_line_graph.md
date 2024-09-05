---
layout: post
title:  "Tableau로 간단하게 라인 그래프 만들기"
date:   2022-01-24
image:  Tableau.png
tags:   [Data]
sitemap:
    changefreq: daily
    priority: 1.0
---

이번에 시각화 툴로 Tableau를 사용해봤는데, 굉장히 간편하고 사용하기 좋은 것 같습니다.  
Tableau를 이용하면 간단한 시각화 및 분석이 가능합니다.  
저는 이번에 라인 그래프를 예쁘게 그리기 위해 사용했기 때문에 이 내용을 다루고자 합니다.  

​<br>​<br>

# 데이터 불러오기
---

<br>

저는 작업하던 환경에서 바로 예시용 캡쳐를 했기 때문에 아래 여러개 열려있는 탭은 신경쓰지 말아주세요.  
우선 첫 화면에서 하늘색 박스로 표시된 추가버튼을 이용해 데이터를 불러옵니다.  
저는 csv 파일을 불러올 예정이기 때문에 텍스트 파일을 선택했지만 엑셀 파일을 불러오실 경우 제일 위의 엑셀 항목으로 불러오시면 됩니다.  


![image](https://github.com/user-attachments/assets/5a21f077-0373-4e5a-9e47-a646b0469db2)

데이터를 불러오시면 아래쪽 탭을 통해서 데이터의 구조를 확인할 수 있습니다.  
아래쪽 빨간 네모를 보시면 시트를 추가하는 버튼과 시트 탭을 통해 그래프를 그리는 화면으로 이동이 가능합니다.  

> 위쪽 탭에서는 여러 파일들 간에 관계를 설정해줄 수 있는데, 저는 이번에 이 기능을 이용하지 않을 예정이므로 자세한 내용은 다루지 않겠습니다.  

<br><br>

# 간단 그래프 그리기
---

<br>

![image](https://github.com/user-attachments/assets/bb6854a5-a8fa-4000-aac4-c968614c6492)

시트로 넘어오시면 테이블 파일의 column들을 확인하실 수 있습니다.  
그리고 우측 상단에 표현 방식을 통해 적합한 그래프를 추천받을 수 있습니다.  


![image](https://github.com/user-attachments/assets/ccf95237-e69b-4b5d-b96b-45a2ebf38c88)


ctrl 키를 누른 상태로 여러 column을 선택하시면, 해당 항목을 이용해 그릴 수 있는 그래프가 진하게 표시됩니다.  
저는 일자별 판매량을 라인 그래프로 표현해보려고 합니다.  

![image](https://github.com/user-attachments/assets/41133f57-1767-4c86-a701-e8246d162c90)

그래프가 이상하게 보일텐데, 위쪽 열 설정을 들여다보시면 Date가 년단위로 설정된 것을 확인할 수 있습니다.  

![image](https://github.com/user-attachments/assets/2c6b6d2e-faf1-4ff1-9af3-5aa9a41cfcbd)
![image](https://github.com/user-attachments/assets/0cf49dd8-0cbd-453c-843d-8e01440ecaa7)


여기서 날짜를 일단위로 변경해주면 그래프가 변경되는 모습을 확인할 수 있습니다.  
하지만 그래프상에서 수치가 너무 크게 표시되고 있네요.  
제가 불러온 자료의 다회차 공연에 대한 표현 특성(?) 때문인데요,

![image](https://github.com/user-attachments/assets/60fa4fa6-50ce-492f-9da9-1ef134ca998f)

공연 데이터에서 회차별 정보 불러오기가 불가능했기 때문에 일간 관객 수 평균을 구한 뒤 회차만큼 복제해주었습니다.  
그렇기 때문에 행에서 Avg가 합계로 표시되면서 너무 큰 값이 나타나게 된 것입니다.  

![image](https://github.com/user-attachments/assets/3ce9d39e-229f-4d13-9ff7-a8f88f637134)
![image](https://github.com/user-attachments/assets/0317b046-9841-4761-b35b-4fdaf1a39e02)


이제 행에서 Avg를 합계가 아닌 평균으로 변경해줍니다.  
이제야 값이 제대로 표시되는군요.  

<br><br>

# 다중선 그래프 그리기
---

<br>

제가 불러온 데이터에는 회차별 주연(몬티 나바로)의 캐스트가 포함되어 있습니다.  
이번에는 캐스트별 좌석 점유율 추이를 확인해보려고 합니다.  

![image](https://github.com/user-attachments/assets/060a98d8-c6d8-4e1e-8543-763f0dd679fd)
![image](https://github.com/user-attachments/assets/ba52c3cb-f848-4d48-b284-4debcd5c6d95)



캐스트 정보가 들어있는 monti 항목을 색상 탭으로 드래그&드롭 해주면 캐스트별로 다른 색상의 그래프가 그려집니다.  
우측 상단에서 색상별로 어떤 캐스트의 정보인지 확인해볼 수 있습니다.  

​<br><br>

# 이벤트 주석 추가
---
<br>

제가 불러온 그래프에는 공연 중 좌석 점유율에 영향을 줄 수 있을 것으로 예상되는 이벤트가 포함되어 있습니다.  
이제 이 이벤트들을 그래프 위에 표시해주겠습니다.  

![image](https://github.com/user-attachments/assets/45064626-1282-4acd-aae0-a6defca5dfd3)

이벤트 정보가 포함된 event 항목을 세부 정보 탭으로 드래그&드롭합니다.  
그 뒤에 event 앞에 있는 아이콘을 클릭하여 [도구 설명] → [레이블] 순서로 변경해줍니다.  
정확히 어떤 이유인지는 모르겠지만, 이 순서대로 해야 제가 원하는대로 그래프 위에 표현이 되더라구요.  

​![image](https://github.com/user-attachments/assets/52310e00-a2c3-49e4-a8cd-ae35b5e6bff9)

이렇게 제가 원하던 정보를 모두 포함한 라인 그래프가 완성되었습니다!  

<br>

---

<br>

​Tableau의 경우 GUI가 굉장히 직관적으로 구성되어있기 때문에 별다른 강의 없이도 이것저것 클릭하다보면 원하는 시각화가 가능하다고 느꼈습니다.  
물론 보다 심화된 분석을 이용하기 위해서는 어느 정도 공부를 해보면 좋긴 하겠지요.  
엑셀로 표현하기 힘들던 그래프를 그려보고 싶으신 분들은 Tableau를 이용해보시는 것을 매우 추천드려요!  
​

저는 무료버전인 Tableau Public 버전을 이용했습니다.  
다운로드는 아래 링크를 이용해주세요.  


https://public.tableau.com/en-us/s/