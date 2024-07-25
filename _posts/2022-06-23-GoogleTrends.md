---
layout: post
title:  "Google Trends를 활용한 캠페인 기간 설정"
date:   2022-06-23
image:  GoogleTrends.jpg
tags:   [Marketing, Data]
sitemap:
    changefreq: daily
    priority: 1.0
---

# Google Trends를 이용한 검색어 추이 파악

<br>

[![image](https://github.com/user-attachments/assets/b2bbef9b-3920-45f8-b173-baeb2b436699)](https://trends.google.com/trends/explore?geo=US)

Google Trends를 이용하면 특정 키워드에 대한 구글 검색량 추이를 파악할 수 있습니다.

다만 검색량을 절대값으로 제공하는 것이 아니라 0~100 사이의 상대값으로 제공합니다.

![image](https://github.com/user-attachments/assets/452957b3-2f9d-44ce-9c96-26f03062e320)

<br>

[![image](https://github.com/user-attachments/assets/02d7d377-4b03-426d-bb37-16d6e2ae4c54)](https://datalab.naver.com/)

네이버 데이터랩에서도 비슷한 서비스를 제공하고 있으니 비슷하게 활용해볼 수 있을 것 같아요.

다만 저는 미국 캠페인 제안을 준비했기 때문에 Google을 활용했습니다.

<br>

---

<br>

제가 분석을 진행한 키워드는 Mental well-being입니다.

국가, 기간, 카테고리 등 다양한 설정이 가능한데, 저는 US, 최근 5년의 기록을 활용했습니다.

​![image](https://github.com/user-attachments/assets/f032e6fd-a279-4327-a19d-d957224c83bf)

Google Trends를 활용하면 전체 검색량 외에도 지역별 검색 비중, 연관 검색어 등을 파악할 수 있기 때문에 지역 선정 및 검색어 확장 등에도 유용하겠지요

![image](https://github.com/user-attachments/assets/cccbc23c-8b5b-4ed9-86f0-88b8923c5219)

해당 데이터들은 저장, 임베딩, 공유가 가능한데요, 이번에는 분석을 위해 csv 형식으로 저장을 하겠습니다.

![image](https://github.com/user-attachments/assets/825d2e9e-4544-4abf-9519-5c038a9bec0a)

첫 번째 버튼으로 저장!

<br> <br>

---

<br>

# Google Trends 데이터에서 Seasonality와 Trends 분석하기

<br>

시간에 따라 변화하는 데이터에는 Time series, Sequential, 시계열 등의 이름으로 부릅니다.

제가 분석한 방법을 소개하기에 앞서 이러한 데이터를 이해하기 위한 간단한 개념을 몇 가지 소개하려고 합니다.

<br>

## 정상 시계열

일반적으로 **정상성(stationarity)**을 갖는 시계열은 일정한 패턴을 가지고 있습니다.

그리고 이 패턴을 **계절성(Seasonality)**이라고 합니다.

​![image](https://github.com/user-attachments/assets/530700c6-1e0f-4a36-b47b-51778263bef3)


하지만 일반적으로 현실의 데이터는 그렇게 깔끔하게 생기지 않았죠.

우리는 여기서 **추세(Trend)**와 **노이즈(noise)**를 분리해 볼 예정입니다.

​

저는 분리된 Trend는 시장의 성장을 설명하는 데에, Seasonality는 캠페인 집행 기간을 설정하는 데에 활용했습니다.

<br>

​---

<br>

## 계절성 추출

<br>

저는 도저히 수식으로는 이해가 어려워서 코드를 스텝별로 작성하며 이해했습니다.

물론 이 모든 것을 간단하게 정리해주는 기능이 존재하지만, 공학 외의 영역에서는 숫자가 아니라 논리가 중요할 때가 있으니까요.

그리고 이 내용은 절대적인 정답이 아니라, 이런 방식으로 접근하고 분석하는 사람도 있다 정도로 이해해주시면 좋을 것 같아요!

분석을 하는 회사도 아니었고, 마케팅 회사에서 이사님이 흥미롭다고 하신 내용일 뿐입니다.

사용하게 되는 라이브러리는 테이블 형태의 데이터를 다룰 때에 주로 활용하는 numpy와 pandas, 그리고 그래프를 그릴 때에 사용할 matplotlib을 활용할 예정입니다.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
```

<br>

```python
df = pd.read_csv('trends_mental.csv', index_col="Week")
df.head()
```

![image](https://github.com/user-attachments/assets/75104b86-5f3c-47d7-a456-56e8546d1276)

Google Trends를 통해 내려받은 데이터는 주 단위로 이루어져 있음을 확인할 수 있습니다.

```python
plt.xlabel('Date')
plt.ylabel('search interest')
plt.plot(df)
```

![image](https://github.com/user-attachments/assets/a4f5ff89-8039-4d83-86ef-172d36967b91)

이를 그래프로 확인하더라도 명확한 추세를 확인하기가 쉽지는 않습니다.

전반적으로 오르는 것 처럼 보이기도 하고, 어쩐지 일정한 주기로 오르내리는 것 같이 보이기도 하는데 이 모든게 기분탓인가 싶을 정도로 노이즈가 심한 모습이네요.

```python
rolling_mean = df.rolling(window = 12).mean()
rolling_std = df.rolling(window = 12).std()
plt.plot(df, color = 'blue', label = 'Original')
plt.plot(rolling_mean, color = 'red', label = 'Rolling Mean')
plt.plot(rolling_std, color = 'black', label = 'Rolling Std')
plt.legend(loc = 'best')
plt.title('Rolling Mean & Rolling Standard Deviation')
plt.show()
```

![image](https://github.com/user-attachments/assets/69ecd3d9-a1eb-4769-9132-b523bb4a9135)

저는 노이즈를 가볍게 정리하기 위해 분기(12주) 단위로 평균, 표준편차를 구해 정리해보았습니다.

평균은 빨간 그래프, 표준편차는 검은 그래프로 표시가 되고 있는데요, 정리되지 않은 데이터에 비해 명확한 패턴이 보이기 시작했습니다.

<br>

이번에는 로그를 이용해서 보다 극적인 결과를 확인해보려고 합니다.

제가 수학적인 지식이 짧아서 설명은 하지 못하지만, 그래프를 찬찬히 보면서 따라와주세요..!

<br>

```python
df_log = np.log(df)
plt.plot(df_log)
```

![image](https://github.com/user-attachments/assets/8c7adf18-801b-4c4c-8aa4-e63adf4b1bc4)

우선 Trends 데이터에 로그를 적용한 그래프입니다.

원본 데이터와는 어쩐지 다른 양상을 나타내는 것을 확인할 수 있습니다.

크기가 다른 데이터들을 맞추는 데에 주로 활용되는 min max scailing이나 standard scailing과는 다르게 log scailing은 비율을 기준으로 데이터를 정렬해주기 때문입니다.

하지만 이걸 제가 도저히 잘 설명할 능력이 안되네요...ㅠ

<br>

지금부터 진행되는 과정은 앞서 진행한 것과 비슷한데,

데이터의 추이가 더 잘 반영된 평균을 활용해서 진행해보겠습니다.


```python
rolling_mean = df_log.rolling(window=12).mean().dropna()

plt.plot(rolling_mean)
```

![image](https://github.com/user-attachments/assets/e11528a4-9181-4b94-bb98-ecc4afeb94f3)


이번에도 마찬가지로 노이즈를 제거하기 위해 분기(12주)를 기준으로 rolling해서 추이를 구합니다.

사실 여기까지만 해도 충분히 깔끔한 데이터가 나오긴 합니다.

하지만 저는 그래프에서 명확하게 나오지 않는 날짜를 엑셀로 확인하고싶기 때문에 추가적인 절차를 진행합니다.


```python
df_log_minus_mean = df_log - rolling_mean
df_log_minus_mean.dropna(inplace=True)

plt.plot(df_log_minus_mean)

# 노이즈 제거
df_log_rolling = df_log_minus_mean.rolling(window=12).mean()
plt.plot(df_log_rolling)
```
![image](https://github.com/user-attachments/assets/8ae5bfb6-5b84-4b68-9c40-1cb7fac16b55 "df_log_minus_mean")
![image](https://github.com/user-attachments/assets/c498f354-f03b-49fe-bf0c-e3a22a550918 "df_log_rolling")

로그만 취해진 데이터에서 추이를 빼면 비교적 평탄한, 하지만 노이즈가 더해진 데이터가 등장합니다.

여기서 앞서 한 것처럼 노이즈를 다시 한 번 제거해주면 계절성만 가진 데이터가 등장합니다.

<br>

이제 이 데이터를 엑셀로 뽑아서 확인을 해보면 매년 1월 말 ~ 2월 초, 8월에 피크가 찍히는 것을 확인할 수 있습니다.

대략 반기 혹은 1년을 주기로 비슷한 패턴이 반복되는 것을 확인할 수 있습니다.

그럼 이제 계절성을 완전히 지우고 깔끔한 추이를 확인하기 위한 기간이 도출되었네요!

<br>

---

<br>

앞서 사용했던 이 코드에서 window만 반기(26주) 혹은 1년(52주)으로 바꿔봅시다.

```python
rolling_mean = df_log.rolling(window=52).mean().dropna()
df_log_minus_mean = df_log - rolling_mean
df_log_minus_mean.dropna(inplace=True)

plt.plot(rolling_mean)
```

![image](https://github.com/user-attachments/assets/dd8696b8-de6d-48f3-a3a1-62d9fb2e58a3 "window=26")

![image](https://github.com/user-attachments/assets/170e4698-64a4-40ee-9242-3dcfa1e8fd43 "window=52")

1년을 주기로 잡았을 때 더 말끔한 트렌드가 추출되네요.

하지만 개인적으로 반기로 잡았을 때, 급락한 부분을 확인했으니 원인을 찾고 추가 설명을 준비해야 할 것 같다는 생각이 듭니다.

<br>

---

<br>

## seasonal_decompose

자, 이제 이 모든 것을 한 번에 해결해줄 함수를 불러보겠습니다.

```python
from statsmodels.tsa.seasonal import seasonal_decompose

decompose_data = seasonal_decompose(df, model="additive", freq=26)
decompose_data.plot()
```

![image](https://github.com/user-attachments/assets/ec07526b-d2cf-4fbf-831b-26fd82a724d4)

이쯤되면 왜 저렇게 길고 긴 쓸데없는 코드를 줄줄이 썼나 싶죠.

심지어 decompose_data.Trend 혹은 decompose_data.seasonal 그래프를 따로 그려볼 수도 있습니다.

그럼에도 불구하고 제가 굳이 저 긴 코드를 작성하는 이유는 통계 기법을 제대로 이해하고 보다 디테일하게 주기를 설정해가면서 변화를 추적하기 위함이었습니다.

논리의 전개가 매끄러워야 클라이언트를 설득할 수 있는거라고 배웠습니다ㅎ