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


@app.route('/postImage', methods=['GET', 'POST'])  # 이미지 받기
def postImage():
    if request.method == 'GET':
        print('GET')  # console

    # formData로전송된 blob파일 받기
    elif request.method == 'POST':
        blob = request.files['capturedImage']  # 이름이 같아야 함
        blob.save('./saved/image.jpeg')  # 크기는 frontend에서 webcam크기
        # 이미지 저장
        print('flask: next.js api -> flask OK')  # print
        # 모델 불러서 읽기
        # 1) faceshape 모델 사용
        # faceshape=faceDetection.deeplearning()
        data = {'message': 'flask 사진 저장함'}
    return jsonify(data)  # response

# face test
# test


@app.route('/face')
def face():
    img_path = './static/faceTest.jpg'
    faceshape = faceDetection.deeplearning(img_path)
    print('>>>얼굴 결과:'+faceshape)
    return faceshape


@app.route('/hairtest')
def hairtest():
    img_path = './static/leeCS.jpg'
    hairType = hairDetection.deeplearning(img_path)
    print('>>>헤어 결과:'+hairType)
    return hairType


@app.route('/glasses')
def glassesTest():
    img_path = './static/leeCS.jpg'
    glassesONF = glassesDetection.detection(img_path)
    # print('>>>안경 착용 여부:'+glassesType)
    return glassesONF

    # #------------------
    # elif request.method == 'POST':
    #     blob = request.files['capturedImage']
    #     blob.save('./saved/blob')  # blob저장
    #     # 이미지
    #     data = blob.read()
    #     image = base64.b64decode(data)
    #     with open('./saved/image.jpeg', 'wb')as f:
    #         f.write(image)
    #     # f = request.files.get('capturedImage')
    # filename = secure_filename(f.filename)
    # f.save('./saved/' + filename)# 저장
    # print('이미지 post 받음 ')# console
    # return 'postImage!'  # html


# def blobToImage(blob):
#     image=base64.b64decode(blob)
#     with open('./saved/image.png','wb')as f:
#         f.write(image)
# http://127.0.0.1:5000 post
if __name__ == "__main__":
    app.run(debug=True)  # 디버그 모드 on 하자 (서버 바로바로 바뀌도록 )
