import cv2
import numpy as np 
import mediapipe as mp
import statistics

#안경 착용시 on, 미착용시 off  반환 

bridge_x=[]
bridge_y=[]

index_list=[168,134,363]


def landMarks(img):
    # path='./static/leeCS.jpg'
    # image=cv2.imread(path)
    image=img
    #mp faceMesh모델 불러오기
    mp_face_mesh = mp.solutions.face_mesh
    
    #이미지에서 landmark추출
    with mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,#얼굴 하나만
        refine_landmarks=True, 
        min_detection_confidence=0.5) as face_mesh:
            #이미지 rgb변환한 후 results에 담는다. 이제부터 results를 활용하면 된다 
            results = face_mesh.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
            #--------------------------
            face_landmarks=results.multi_face_landmarks[0]
            real_points=[] #좌표값 (x,y)
            for idx in index_list:
                point=face_landmarks.landmark[idx]
                real_points.append((point.x,point.y))
                # print('전:',real_points)
            real_points = [(int(point[0] * image.shape[1]), int(point[1] * image.shape[0])) for point in real_points]
           
    return real_points #좌표값 반환 list

def minMax(list):
    real_points=list
    real_points=np.array(real_points) # 좌표 리스트를 NumPy 배열로 변환
    
    # x, y 좌표 각각의 최솟값과 최댓값 찾기
    x_min = np.min(real_points[:, 0])
    y_min = np.min(real_points[:, 1])
    x_max = np.max(real_points[:, 0])
    y_max = np.max(real_points[:, 1])
    
    
    return x_min,y_min,x_max,y_max
    

def cannyFilter(crop_img):
    
    crop_image=crop_img
    
    img_blur = cv2.GaussianBlur(np.array(crop_image),(3,3), sigmaX=0, sigmaY=0)
    edges = cv2.Canny(image =img_blur, threshold1=100, threshold2=300)
    
    # edges_center = edges.T[(int(len(edges.T)/2))] #가운데 줄 
    
    return edges
        
    

            
#main
def detection(img_path):
    image_path=img_path
    image=cv2.imread(image_path)#이미지 load
    
    real_points=landMarks(image) #함수
    x_min,y_min,x_max,y_max= minMax(real_points)#함수
    
    #이미지 크롭
    copy_image=image.copy()
    crop_image = image[y_min:y_max, x_min:x_max]
    
    #cannyedge
    edges=cannyFilter(crop_image) #함수 
    edges_center = edges.T[(int(len(edges.T)/2))] #가운데 줄 
    
    #안경 착용 여부 판정
    if 255 in edges_center:
        message='안경o'
        print('안경 O')
    else:
        message='안경x'
        print('안경X')
    
    return message
    



    
    
    