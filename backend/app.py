# import os
from flask import Flask,request,jsonify
from flask_cors import CORS
import numpy as np
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
	return "Hello World!"

def request_test():
    if request.method=='GET':
        print('요청 확인!')


#http://127.0.0.1:5000 post
if __name__ == "__main__":
	app.run(debug=True)####디버그 모드 on 하자 (서버 바로바로 바뀌도록 )