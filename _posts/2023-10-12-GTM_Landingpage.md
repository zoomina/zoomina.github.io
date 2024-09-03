---
layout: post
title:  "아임웹으로 제작된 랜딩페이지의 전환분석을 위한 GTM 설계"
date:   2023-10-12
image:  GTM.jpg
tags:   [Marketing, Data]
sitemap:
    changefreq: daily
    priority: 1.0
---

## 포스트 목차
1. [아임웹 랜딩페이지 작성 구조](#1-아임웹-랜딩페이지-작성-구조)  
2. [예약페이지 트래킹 설계](#2-예약페이지-트래킹-설계)  
    1) [트리거 구성](#1-트리거-구성)  
    2) [element visibility 설정](#2-element-visibility-설정)  
    3) [예약 버튼 클릭 설정](#3-예약-버튼-클릭-설정)  

<br>

---

<br>

# 1. 아임웹 랜딩페이지 작성 구조


일반적으로 웹 페이지 소스코드를 열어보면 크게 `<head>`와 `<body>`로 나뉘어져 있는 것을 확인할 수 있습니다. 주로 `<head>`에는 SEO를 위한 페이지 정보가 포함되어 있고, `<body>`에는 웹페이지를 구성하는 요소들이 포함되어 있습니다. 따라서 GTM 이벤트를 작성하는 우리는 `<body>` 구성요소들을 주로 열어보게 될 거예요. 참고로 소스코드는 구글 크롬에서 `Ctrl`+`Shift`+`I` 단축키로 확인할 수 있습니다.  

이번 포스팅에서 다루게 될 페이지는 아임웹으로 작성된 상품 소개 페이지로, 상당히 긴 페이지였습니다. 아임웹으로 작성된 페이지는 `<body>` 내에서 PC버전과 Mobile 버전을 위한 element들이 번갈아가며 배치되어 있습니다. 구조를 대략적으로 그려보자면 이렇게 표현할 수 있겠네요.  


![Untitled](https://github.com/user-attachments/assets/1f0f2fd8-97c0-44ce-aadc-99bbe623bb5b)


각각의 블록은 디바이스 환경에 맞추어 화면에 표시됩니다. PC로 접속할 경우 PC 블록만 활성화되고 MO 블록은 hide처리가 됩니다. 반대로 모바일 환경에서는 MO 블록만 활성화가 되는 구조이죠. 따라서 GTM에서 이벤트를 설정할 때에 각 블록에 대한 이벤트를 별도로 작성해야 할 필요가 있었습니다.

특히 데이터 누락 이슈를 추적하던 과정에서 블록 뿐만 아니라 영상, 이미지, 버튼을 포함한 모든 요소들이 PC버전, 모바일버전이 나뉘어있어 이벤트 측정을 하고자 할 때에는 꼼꼼하게 확인해야 할 필요가 있습니다. 하지만 끝까지 해결하지 못한 이슈는 **모바일 버전 버튼**이 모두 동일한 Class name을 사용하며 ID는 설정되어 있지 않아 특정 버튼을 짚어서 트래킹할 수 없다는 점이었습니다.  

<br><br>

# 2. 예약페이지 트래킹 설계


해당 프로젝트의 목적은 랜딩페이지 개선을 위한 기존 페이지 어느 정보에 사람들이 반응하는지, 어느 지점에서 이탈이 발생하는지 최대한 디테일하게 측정하는 것이었습니다. 일반적으로 페이지 visibility 측정을 할 때에는 스크롤 depth를 이용하는 경우가 많은데, 앞서 언급했듯이 해당 페이지는 상당히 긴 페이지였고, 모든 정보가 블록 단위로 이루어져있어 다른 접근법을 선택했습니다.  

제가 선택한 방법은 각 element별로 visibility를 측정하여 이탈 및 전환 시점을 슬라이드와 1:1로 매칭시키는 것이었습니다. 다만 저에게 GA 권한이 온전히 있는 것은 아니었고, 아직 GA4로 넘어가지 않은 회사였기 때문에 Event Flow를 통해 대략적인 전환 정보만 확인하는 것으로 타협했습니다.  


![image](https://github.com/user-attachments/assets/997b9869-1c0f-4a75-a968-ec9812d62d66)


해당 페이지는 UA에서 [행동]-[이벤트]-[이벤트 흐름] 메뉴에서 확인하실 수 있습니다. 해당 차트에서 빨간 색으로 표시되는 흐름은 이탈, 다음 페이지로 전환된 경우는 흐름을 따라 다음 플로우로 넘어가고, 버튼 혹은 이벤트로 전환될 경우 해당 이벤트로 연결되는 플로우로 넘어갑니다.  

<br>

## 1) 트리거 구성

<br>

- 화면 스크롤

화면 스크롤 측정을 위한 트리거는 elementry visibility(요소 공개상태)를 사용해 구성요소가 일정 수치의 달성여부를 기준으로 hit가 발생해(viewability) 화면 스크롤을 파악할 수 있습니다. 처음에는 요소 특정을 위해 css selector를 사용할 계획이었으나, 아입웹은 미리 작성된 블록을 사용자가 배치하는 방식이라 class명 중복이 많았기 때문에 아임웹 섹션 ID 기반으로 스크롤 이벤트 라벨을 작성해 이용했습니다. 자세한 내용은 뒤에서 서술할 예정입니다.  

<br>

- 예약 전환

예약 전환은 지정된 버튼 클릭을 기준으로 측정하기로 했습니다. 버튼을 특정하기 위해 Class name과 ID가 필요한데, 저는 개발자도구를 켜고 하이퍼링크(`href=`)가 연결된 모든 부분을 확인했습니다.  

![image](https://github.com/user-attachments/assets/e05830c9-f80a-4981-b148-cc2891aeac66)

해당 페이지에서 버튼에는 `btn`, `btn-default`, `_fade_link`, `btn_random-number`, 총 4개의 class name이 설정되어있었는데, 이 중 `btn_random-number`는 각 요소마다 고유한 random number가 설정되어있어 해당 class name을 이용하기로 했습니다.  

<br>

## 2) element visibility 설정

앞서 간략하게 설명한 화면 스크롤을 좀 더 자세하게 설명해보려 합니다. viewability 이벤트는 특정 요소가 몇 % 화면에 노출되었는지를 사전에 설정하고 측정하는 기능입니다. 저는 일반적으로 적용하는 50%로 설정해 해당 요소가 절반 이상 화면에 노출되면 유저가 본 것으로 가정하는 기준으로 잡았습니다.  

기본적으로 요소 특정은 class name을 활용했고, 중복발생하는 viewability 이벤트들을 구분하기 위해 Lookup Table을 이용해 라벨을 달아주었습니다.  

<br>

- 트리거 설정

![image](https://github.com/user-attachments/assets/bf0acdb0-49ab-469b-bce4-a888c944d35a)

앞서 설명한대로 GTM 트리거 설정은 element visibility(요소 공개 상태) 기능을 사용해 css selector(css 선택 도구)로 구체적인 위치를 설정해주었습니다. 이벤트 발생은 50%를 기준으로 잡고, 측정이 복잡해지지 않도록 하나의 요소에는 한 번의 이벤트만 발생하도록 설정해주었습니다.  
태그 설정은 아래와 같이 해주었는데, 참고로 Label에 지정된 값은 Lookup Table에서 라벨을 불러오기 위한 ID로 PC버전에는 PC로, 모바일버전에는 MO로 입력해주시면 됩니다. 이로써 우리는 ID를 참조하여 알아보기 좋은 결과값으로 GA에 기록할 수 있게 되었습니다.  

```
Category : viewability  
Action : view  
Label : {{imwebSectionIdx_PC}} / {{imwebSectionIdx_MO}}  
```

<br>

- Lookup Table

![image](https://github.com/user-attachments/assets/029d5bda-96b9-4131-b0e5-eb8e0a52114d)

`imwebSectionIdx`라는 아임웹 섹션 아이디값을 기반으로 요소값의 이름을 반환하기 위한 Lookup Table을 셋팅해두었습니다. 앞서 설정해둔 트리거에서 전달되는 ID가 input이 되고, 제가 직접 GA에 기록될 output을 설정할 수 있습니다. 참고로 아임웹 섹션 ID는 편집 화면에서도 확인할 수 있습니다.

<br>

## 3) 예약 버튼 클릭 설정

버튼 이벤트는 간단하게 설정가능합니다. 아마 이 설명이 이해가지 않으신다면 다른 간단한 설명도 찾아보실 수 있을 정도로 많이 이용하는 기능입니다.  


![image](https://github.com/user-attachments/assets/0023b4c5-f2ea-4c81-8cce-92b11152b63b)[모바일버전에는 id로 사용할만한 고유값이 없습니다.]

![image](https://github.com/user-attachments/assets/6bac5b9c-36e7-48da-8298-be513becbf76)


마찬가지로 개발자 도구로 들어가 id를 찾을 수 있습니다. 아임웹 버튼의 경우 모바일버전은 고유 ID가 없어 측정이 불가했으나, PC버전은 윗쪽 사진에 노란색으로 표시된 random number의 class name을 이용해 특정이 가능했습니다.  
참고로 class name은 `<a class="class_name">` 해당 태그를 통해 확인할 수 있고, 공백 기준으로 나뉘어진 모든 값이 class name이 될 수 있습니다. 화면상으로 보이는 내용으로는 `btn`, `btn_random-number`, `btn-default` 3가지가 모두 class name입니다.  


![image](https://github.com/user-attachments/assets/9ea311d6-b499-4f21-aaba-36fa20ad81c2)

버튼 클릭 이벤트는 클릭 이벤트에서 일부 클릭으로 저희가 사전에 찾아둔 ID값을 기준으로 설정해주시면 됩니다. 저희는 class name을 기준으로 측정할 예정이니 Click Classes 기준으로 "포함" "고유값"을 입력해주시면 됩니다.