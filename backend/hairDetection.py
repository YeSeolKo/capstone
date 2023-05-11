
# [헤어스타일 분류]
from flask import Flask
import tensorflow as tf
from keras.models import load_model
from keras.preprocessing import image  # NOTE -케라스 imageProcessing
import keras
from keras.applications.resnet import ResNet50, preprocess_input  # NOTE -process_input만
import numpy as np
import os
from keras import datasets
from PIL import Image  # Pillow
# from keras.applications.resnet50 import ResNet50
os.environ['TF_MIN_LOG_LEVEL'] = '3'  # 디버그 로그를 제외한 모든 로그를 출력하지 않도록 설정

# 전처리 함수)


def my_preprocess_input(x):
    x = x.astype('float32')
    x /= 255.
    x -= 0.5
    x *= 2.
    return x

# 케라스 함수


def kr_preprocess_input(x):
    x = preprocess_input(x)
    return x


# main )
def deeplearning(img_path):
    # 1. 모델 불러오기
    # compile=False로 하고 사용해보기
    model = keras.models.load_model("./model/hairV1.h5", compile=False)
    # colab 컴파일 옵션과 동일하게 지정
    model.compile(optimizer=tf.keras.optimizers.Adam(),
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])
    img_path = img_path
    # 코랩) colab- image.load_img() keras최신버전
    # img = image.load_img(img_path, target_size=(224, 224))
    # 2. 이미지를 넘파이 배열로 변환
    # x = image.img_to_array(img)
    # x = np.expand_dims(x, axis=0)

    # colab 대신 이 환경에서는 Pillow로 이미지 처리
    img = Image.open(img_path)
    img = img.resize((224, 224))

    # 2. 이미지를 넘파이 배열로 변환
    x = np.array(img)
    x = np.expand_dims(x, axis=0)

    # 3. 이미지 정규화
    # 1)원래 colab에서 하던 방식(keras최신버전)
    # x = preprocess_input(x)  # NOTE - process_input

    # 2) 현재 프로젝트 keras버전(2.10.0에 맞추려면) 직접 preprocess함수 구현 후 사용함
    # x = my_preprocess_input(x)
    x = kr_preprocess_input(x)

    # 4. 예측하기
    preds = model.predict(x)

    # 예측 결과 출력

    class_names = ['가르마', '기타남자스타일', '기타레이어드', '기타여자스타일', '남자일반숏', '댄디', '루프', '리젠트', '리프', '미스티', '바디', '베이비', '보니', '보브', '빌드',
                   '소프트투블럭댄디', '숏단발', '쉐도우', '쉼표', '스핀스왈로', '시스루댄디', '애즈', '에어', '여자일반숏', '원랭스', '원블럭댄디', '테슬', '포마드', '플리츠', '허쉬', '히피']
    print('Predicted:', class_names[np.argmax(preds)])

    results_classes = []  # 상위 5개 클래스명 담는 리스트

    pred_classes = preds[0].argsort()[-5:][::-1]  # 상위 5개 클래스 인덱스 추출
    print('Top 5 Predicted Classes:')
    for i in pred_classes:
        results_classes.append(class_names[i])  # 리스트에 담기
        # print(class_names[i], ':', preds[0][i])
    print(results_classes)
    return results_classes
