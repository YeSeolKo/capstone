# import os
from email.mime import image
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from werkzeug.utils import secure_filename
import base64  # blob 이미지 때문에
import faceDetection  # faceDetection.py가 같은 폴더경로에있어야함
import hairDetection
import glassesDetection


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return 'Hello !'

# frontend: webcam에서 axios.post

# photoFile


@app.route('/photoImage', methods=['GET', 'POST'])  # 이미지 받기
def postImage():
    if request.method == 'GET':
        print('GET')  # console

    # formData로전송된 blob파일 받기
    elif request.method == 'POST':

        blob = request.files['photoImage']  # 이름이 같아야 함
        blob.save('./saved/photo/photo_image.jpeg')  # 크기는 frontend에서 webcam크기
        # 이미지 저장
        print('flask: next.js api -> flask OK')  # print
        image_path = './saved/photo/photo_image.jpeg'
        # 모델 불러서 읽기
        # 1) glasses
        glasses_type = glassesDetection.detection(image_path)  # 함수
        # 2) face
        face_type = faceDetection.deeplearning(image_path)  # 함수
        # 3) hair
        # 리스트
        hair_type = hairDetection.deeplearning(image_path)  # 함수

        data = {'glasses_type': glasses_type,
                'face_type': face_type,
                'hair_type': hair_type}
    return jsonify(data)  # response

# Webcam


@app.route('/webcamImage', methods=['GET', 'POST'])
def webcamImage():
    if request.method == 'GET':
        print('GET')  # console

    if request.method == 'POST':
        print('webcam 이미지')

        blob = request.files['webcamImage']

        blob.save('./saved/webcam/webcam_image.jpeg')

        image_path = ('./saved/webcam/webcam_image.jpeg')
        # 1)glasses
        glasses_type = glassesDetection.detection(image_path)
        # 2)face
        face_type = faceDetection.deeplearning(image_path)
        # 3)hair 리스트
        hair_type = hairDetection.deeplearning(image_path)
        data = {'glasses_type': glasses_type,
                'face_type': face_type,
                'hair_type': hair_type}
    return jsonify(data)  # response


if __name__ == "__main__":
    app.run(debug=True)  # 디버그 모드 on 하자 (서버 바로바로 바뀌도록 )
