import cv2
import numpy as np
import mediapipe as mp


#mediapipe의 그리기 함수 utils 
# mp_drawing=mp.solutions.drawing_utils
#selfie_segmenation 유틸 불러오기


mp_selfie_segmentation= mp.solutions.selfie_segmentation


with mp_selfie_segmentation.SelfieSegmentation(model_selection=0)as selfie_segmentation:
    image=cv2.imread('backend/hero.jpg',cv2.IMREAD_COLOR)
    image_rgb=cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    #사람이미지 분리
    results=selfie_segmentation.process(image_rgb)
    mask=results.segmentation_mask
    
    cv2.imshow("Image",image)
    cv2.imshow("Mask",)
    cv2.waitKey(0) 
cv2.destroyAllWindows()


# #- 배경제거
# #BGR TO RGB
# RGB_sample_img=cv2.cvtColor(sample_img,cv2.COLOR_BGR2RGB)
# #result
# result=chage_bg_segment.process(RGB_sample_img)

# #binary_mask
# binary_mask=result.segmentation_mask>0.9

# cv2.imshow('binary',binary_mask)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

# # results=selfie_segmentation.process(image)
# #
