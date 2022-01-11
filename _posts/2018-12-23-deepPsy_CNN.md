---
layout: post
title:  "심리학으로 읽어보는 딥러닝 - 시각과 CNN"
date:   2018-12-23
image:  SQLD.jpg
tags:   [Pysychology, AI, DeepLearning]
sitemap:
    changefreq: daily
    priority: 1.0
---

안녕하세요, 심리학으로 읽어보는 딥러닝 두 번째 이야기에도 관심을 가져주셔서 감사합니다!  
이번 주제를 설명드리기 전에도 짧은 이야기를 준비해보았습니다.  
<br>
저는 human vision을 연구하는 교수님의 추천을 받아 computer vision을 연구하는 공대의 연구실에서 학부생 인턴을 한 적이 있습니다.  
그 과정에서 컴퓨터는 human vision의 어떤 부분에서 아이디어를 얻었고, 지금은 얼마나 다른 방향으로 발전해나가는지에 대해 흥미를 느꼈습니다.  
그리고 그 흥미는 자연스럽게 본 연재글에 대한 아이디어로 발전하게 되었지요.  

<br>

그럼 오늘은 컴퓨터가 어떻게 인간의 시각을 모방했고, 어떻게 발전해나가고 있는지 알아볼까요?  

<br>

---

<br>

## 착시 현상으로 알아보는 시각 수용장

<br>

![image](https://user-images.githubusercontent.com/39390943/50381556-668ba180-06cd-11e9-9751-02be1709fafa.png)

여러분은 이런 착시현상을 본 적이 있나요?  
바로 헤르만 격자라고 불리는 인간의 착시를 유도하는 이미지 입니다.  
흰 선이 교차되는 부분에 희미한 회색 점이 보이시나요?  
분명 주의를 기울여보면 흰색인데, 회색 점이 자꾸 깜빡이는 것처럼 보이네요.  
우선 이 착시를 통해 사람들이 어떻게 사물을 지각하는지 알아보도록 할게요.  

<br>

혹시 투구게에 대해 들어보신 적이 있나요?  
투구게는 전극을 연결할 수 있을만큼 충분히 큰 세포를 가지고 있기 때문에 시각 연구에서 큰 역할을 했다고 합니다.  
교과서에서도 인간의 시각을 설명하기 전에 투구게의 시각세포에 대한 설명이 등장할 정도예요!  

<br>

![image](https://user-images.githubusercontent.com/39390943/149007590-b3754c88-f8d6-43b5-8d9d-9a43dad748a1.png)

왼쪽의 이미지는 투구게의 시각세포입니다.  
A는 하나의 세포에만 빛이 들어오고 있고, B는 3개의 연속적인 세포에 빛이 들어오고 있습니다.  
그리고 빨간 구조물이 모든 세포들을 연결하고 있네요.  

<br>

오른쪽의 이미지는 A에서 측정된 전기신호입니다.  
간격이 촘촘할수록 더욱 강한 반응이 측정되었다고 이해하시면 됩니다.  
A에만 빛이 들어올 때 가장 강한 반응을 보였고,  
B에 빛이 많이 들어올수록 반응이 약해지는 것으로 보이네요.  

<br>

그 이유는 바로 측면억제 때문입니다.  
위의 빨간 구조물은 함께 연결된 시각세포들의 신호를 측면으로 전달해주고,  
각각의 세포는 그 영향을 주고받기 때문에 일어나는 현상입니다.  

<br>
<br>

그럼 이제 사람의 수용장에 대해 살펴보며 헤르만 격자로 돌아가볼까요?  

![img_0049](https://user-images.githubusercontent.com/39390943/49577990-0fc35f80-f98c-11e8-85ef-a9107f963127.png)

위의 이미지는 중심-주변 수용장이라고 불리는 수용장입니다.  
안쪽의 원 안에는 +가 적혀있고, 바깥쪽에는 -가 적혀있네요.  
모두 짐작하셨듯이 가운데에 들어오는 신호는 반응을 강하게 하고,  
바깥쪽에 들어오는 신호는 반응을 약하게 만들게 됩니다.  

<br>

이 수용장을 그대로 헤르만 격자에 넣어볼까요?  

<br>

![image](https://user-images.githubusercontent.com/39390943/149009436-81a46078-ac5b-434c-8b65-dea75d0e9c21.png)

교차지점에 중심-주변 수용장을 넣고 생각해봅시다.  
여기서 우리는 +영역보다 -영역에서 더 많은 빛을 받아들이고 있네요!  
따라서 이 지점에 주변보다 더 짙은 회색의 점이 보이게 되는 것입니다.  

<br>

---

<br>

## 시각 수용장과 CNN의 시작

<br>

<img src="https://user-images.githubusercontent.com/39390943/149003934-d5a5d8e0-2cfe-421e-8b2e-1c32f0dd3e22.png" width="400">

<br>

위의 그림은 머신러닝에 관심있는 분이라면 한 번쯤은 본 적이 있을 것입니다.  
머신러닝계의 Hello World로 불리는 MNIST입니다.  
이와 같은 이미지를 다루는 영역에서 가장 대표적으로 사용되는 알고리즘이 있지요.  
바로 CNN입니다.  

<br>

그런데 LeNet을 비롯한 초기 CNN모델 중 다수가 인용하고 있는 논문 중 고양이의 수용장에 대한 내용이 있다는 사실을 알고 계시나요?  
그 실험은 Humbel과 Wiesel이 진행한 실험인데요, 제 노트에는 불쌍한 고양이 실험이라고 적혀있네요.  

<br>

<img src="https://user-images.githubusercontent.com/39390943/149011942-88db4fda-7e7b-4fec-b078-8a7e26340ea9.png" width="600">

<br>

"심리학으로 가볍게 읽어볼까 하고 들어왔더니 내내 뇌과학 이야기 뿐이잖아!" 라며 배신감을 느끼시는 분들을 위해 이 실험에 관한 짧은 에피소드를 들려드릴게요.  
참고로 위의 그림은 제가 이 이야기를 위해 짤막하게 그려본 그림이랍니다 :blush:  

<br>

> 이 실험은 우연한 발견에 의해 시작되었답니다.  
> 그 당시에 심리학 연구에서는 컴퓨터 실험이 활발하게 이루어지지 않았습니다.  
> 대신 위의 그림처럼 자극이 그려진 판을 직접 넣었다가 빼는 방식으로 실험이 진행되었어요.  
> 두 연구자는 고양이의 뇌에 전극을 연결하고 실험을 하던 중, 하나의 전극이 자꾸 반응하는 것을 발견합니다.  
> 그리고 그 신호를 발생시킨 원인은 바로 판을 넣고 뺄 때 생기는 모서리의 그림자였습니다!  

<br>

이 사실을 알게 된 두 연구자는 본격적으로 수용장에 대한 연구를 진행했습니다.  
그리고 단순 피질 세포, 복합 피질 세포, 끝-멈춤 세포 등을 발견하게 되었어요.  

<br>

![image](https://user-images.githubusercontent.com/39390943/149013522-66776867-a807-4c9b-a299-810a8110ae1b.png)

<br>

앞선 실험에서 발견된 것은 선의 각도에 따라 반응하는 단순 피질 세포였습니다.  
위의 그림은 수직선에 반응하는 수용장의 이미지인데요, 선이 수직에 가까울수록 더욱 강한 반응을 보이는 것을 알 수 있습니다.  

<br>

그럼 CNN은 어떻게 수용장을 모방했는지 알아볼까요?  

![image](https://user-images.githubusercontent.com/39390943/149014903-43136564-2f34-4725-ace1-80b85504b794.png)

CNN은 Convolusional Neural Network의 약자로, 위와 같이 표현이 됩니다.  
그리고 입력된 데이터에 대해 필터의 윈도우를 일정 간격으로 이동해가며 계산합니다.  
이때, 계산은 Convolusion 연산을 의미하는데요, 방법은 아래에서 자세히 설명해드리겠습니다.  

<br>

![image](https://user-images.githubusercontent.com/39390943/149015240-2b28f239-779b-4fe1-bf8b-4adace1ea0a5.png)

첫 번째 연산입니다.  
입력 데이터의 가장 왼쪽 위에서부터 필터와 같은 크기의 윈도우를 설정하여 연산을 시작할게요.  

1. 크기가 같은 두 행렬의 같은 위치에 해당하는 값을 각각 곱해줍니다.  
2. 그 이후 모든 값들을 더해줍니다.  

<br>

![image](https://user-images.githubusercontent.com/39390943/149016344-08f35d72-a29c-4e3e-8779-2378cde92e7a.png)

![image](https://user-images.githubusercontent.com/39390943/149016390-d5ceece2-3689-4fb8-94b4-4c0d8a628fc0.png)

![image](https://user-images.githubusercontent.com/39390943/149016436-5555fa0d-7505-4163-80f3-2a6faab6b31e.png)

그 다음 순차적으로 윈도우를 옮겨가며 같은 연산을 반복해줍니다.  

<br>

여기에서 필터는 우리 시각 체계에서의 수용장 역할을 하고 있다고 생각하면 CNN이 이미지에서 더욱 좋은 성능을 보이는 것이 납득이 가네요!  

<br>

---

<br>

## CNN은 어떤 방향으로 진화하고 있을까?

<br>

도입부에 말씀드렸듯이, 컴퓨터는 인간의 시각을 일부 모방한 것이 맞지만 지금은 다른 방향으로 발전해나가고 있습니다.  
물론 우리가 인간의 뇌를 모두 알지 못하기 때문일 수도 있겠지만, 인간의 뇌와 컴퓨터는 그 구조를 달리하기 때문이기도 하겠지요.  

<br>

![image](https://user-images.githubusercontent.com/39390943/149021514-b09d961f-55ca-4e4d-b804-4c26f37fe165.png)

위의 그림은 MNIST에서 큰 성과를 보이며 CNN의 뿌리로 불리게 된 LeNet의 구조입니다.  
LeNet에서는 생물학적 유사성을 위해 activation function으로 sigmoid를 사용하고 있습니다.    
바로 뉴런이 활성화되는 모양이 sigmoid와 닮아있기 때문입니다.  

<br>

하지만 그 이후 두각을 드러낸 AlexNet은 그렇지 않았습니다.  

![image](https://user-images.githubusercontent.com/39390943/149023643-86e2042a-3ba4-4a42-96e6-94d5744a7f12.png)

<br>

AlexNet은 GPU의 등장을 바탕으로한 병렬 연산과 더욱 깊은 네트워크를 가지게 되었습니다.  
그리고 activation function으로 sigmoid가 아닌 ReLU를 선택합니다.  
이를 통해 연산에서 이점을 얻게 되는데요,  
확실히 인간의 시각을 모방하여 발전하기 시작했지만 독자적인 방향으로 발전해나가고 있다는 사실을 알 수 있네요!  

요즘까지 잘 사용되고 있는 VGG나 ResNet을 포함한 모델들 또한 sigmoid보다는 ReLU, 혹은 이를 변형한 activation function을 사용하고 있습니다.  

<br>

하지만 이미지 분야는 매우 빠른 속도로 발전하고 있기 때문에 여기서 모든 모델을 다룰 수는 없을 것 같아요.  
우리의 주제와 관련하여 제가 전해드리고 싶은 내용은 여기서 마무리됩니다.  
관심이 생기신 분들은 구글링을 통해 더욱 많은 내용들을 만나보세요!  

<br>

Vision 분야의 내용을 보면 교수님들의 투닥거림이 머리 속을 어지럽히기 때문에,  
이번 주제는 여기서 마치도록 하겠습니다.  

다음 번에는 좀 더 익숙한 심리학 소재와 강화학습을 주제로 찾아오겠습니다.  
어려운 내용 따라와주셔서 감사하고, 다음에 다시 만나요!  

<br>

---

> ### 참고자료
> E.Bruce Goldstein, 감각과 지각 7판, cengage learning  
> Jamse W. Kalat, 생물심리학 13판, cengage learning  
> 사이토 고키, 밑바닥부터 시작하는 딥러닝, 한빛미디어  
> Yann LeCun, Gradient-Based Learning Applied to Document Recognition
> Alex Krizhevsky, ImageNet Classification with Deep Convolutional Neural Networks