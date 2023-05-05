from flask import Flask
import tensorflow as tf
from keras.models import load_model
from keras.preprocessing import image  # NOTE -케라스 imageProcessing
import keras
import numpy as np
import os
os.environ['TF_MIN_LOG_LEVEL'] = '3'  # 디버그 로그를 제외한 모든 로그를 출력하지 않도록 설정

# [헤어스타일 분류]


def deeplearning(img_path):
    model = keras.models.load_model("./model/hairV1.h5")  # 모델
    img_path = img_path

    img = image.load_img(img_path, target_size=(224, 224))

    # 이미지를 넘파이 배열로 변환
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)

    # # 이미지 정규화
    # x = preprocess_input(x)

    # 예측하기
    preds = model.predict(x)

    # 예측 결과 출력

    class_names = ['가르마', '기타남자스타일', '기타레이어드', '기타여자스타일', '남자일반숏', '댄디', '루프', '리젠트', '리프', '미스티', '바디', '베이비', '보니', '보브', '빌드',
                   '소프트투블럭댄디', '숏단발', '쉐도우', '쉼표', '스핀스왈로', '시스루댄디', '애즈', '에어', '여자일반숏', '원랭스', '원블럭댄디', '테슬', '포마드', '플리츠', '허쉬', '히피']
    print('Predicted:', class_names[np.argmax(preds)])

    pred_classes = preds[0].argsort()[-5:][::-1]  # 상위 5개 클래스 인덱스 추출
    print('Top 5 Predicted Classes:')
    for i in pred_classes:
        print(class_names[i], ':', preds[0][i])
    return 'hi'

    # path = img_path
    # # 모델 학습을 (64,64)했기때문에, img사이즈 변환해서 인식
    # # NOTE - 추후에 모델 수정(244,244)로 수정?
    # img = keras.utils.load_img(path, target_size=(64, 64))
    # x = keras.utils.img_to_array(img)  # array로
    # x = tf.expand_dims(x, axis=0)
    # result = model.predict(x)
    # # print(result)
    # # print(result[0])
    # # print(result[0].argmax())

    # labels = ['Heart', 'Oblong', 'Oval', 'Round', 'Square']
    # # label: 가장 높은 값을 갖는 인덱스를 찾은 후, 확률 분포 예측 해서 젤 높은 값 저장
    # label = labels[result[0].argmax()]
    # confidence = result[0][result[0].argmax()]
    # print('face 예측:', label)
    # # (결과값)label만 보내자
    # return label
