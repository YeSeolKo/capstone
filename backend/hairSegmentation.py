import cv2
import numpy as np
import tensorflow as tf

# 모델 로드

interpreter = tf.lite.Interpreter(model_path='backend\hair_segmentation.tflite')
interpreter.allocate_tensors()

# 입력/출력 정보 확인
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# 이미지 불러오기
image = cv2.imread('backend/hero.jpg')

# 이미지 전처리
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image = cv2.resize(image, (256, 256))
image = image / 255.0

# 모델 입력 형태로 변환
input_data = np.expand_dims(image, axis=0).astype(np.float32)
interpreter.set_tensor(input_details[0]['index'], input_data)

# 세그멘테이션 수행
interpreter.invoke()
mask = interpreter.get_tensor(output_details[0]['index'])[0]

# 결과 후처리
mask = cv2.resize(mask, (image.shape[1], image.shape[0]))
mask = (mask > 0.5).astype(np.uint8) * 255

# 결과 출력
cv2.imshow('input', image)
cv2.imshow('output', mask)
cv2.waitKey(0)
cv2.destroyAllWindows()
