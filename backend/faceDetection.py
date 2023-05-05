from flask import Flask
import tensorflow as tf
from keras.models import load_model
import keras
import numpy as np
import os
os.environ['TF_MIN_LOG_LEVEL'] = '3'  # 디버그 로그를 제외한 모든 로그를 출력하지 않도록 설정

# [얼굴형 분류]
# h5모델 불러와서 사진 넣고 얼굴형 분류


def deeplearning(img_path):
    # def deeplearning(filename):
    model = keras.models.load_model("./model/faceV2.h5")  # 모델
    # path=('./saved/'+filename)
    path = img_path
    # 모델 학습을 (64,64)했기때문에, img사이즈 변환해서 인식
    # NOTE - 추후에 모델 수정(244,244)로 수정?
    img = keras.utils.load_img(path, target_size=(64, 64))
    x = keras.utils.img_to_array(img)  # array로
    x = tf.expand_dims(x, axis=0)
    result = model.predict(x)
    # print(result)
    # print(result[0])
    # print(result[0].argmax())

    labels = ['Heart', 'Oblong', 'Oval', 'Round', 'Square']
    # label: 가장 높은 값을 갖는 인덱스를 찾은 후, 확률 분포 예측 해서 젤 높은 값 저장
    label = labels[result[0].argmax()]
    confidence = result[0][result[0].argmax()]
    print('face 예측:', label)
    # (결과값)label만 보내자
    return label
