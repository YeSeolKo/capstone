//"" Tensorflow.js""" 
import { useRef, useState,useEffect } from 'react';
//tf
import "@tensorflow/tfjs-core"; // 
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-converter";

import * as faceLandmarksDetection  from "@tensorflow-models/face-landmarks-detection";
import "@mediapipe/face_mesh";

import Webcam from "react-webcam";
import styled from 'styled-components';
// import tw from 'tailwind-styled-components/dist/tailwind';
import { Canvas } from '@react-three/fiber';
import TF_3DFace from './TF_3DFace';

// ─── css  ───────────────────────────────────────────────────────────────────────
const WebcamContainer = styled(Webcam)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 9;
  width: 640px;
  height: 480px;
`;

//캔버스 
const CanvasContainer = styled.div`
  //background-color: yellow; //노랑
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 9;
  width: 340px;
  height: 480px;
`;
// ─────────────────────────────────────────────────────────────────────────────




export default function TF_FaceMeshComponent() {

    const webcamRef=useRef(null);
    const canvasRef=useRef(null);

    //runFace 함수------------------------
    const runFaceDetect = async()=>{
      const model=faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;//model
      const detectorConfig={
        runtime:"tfjs", 
      };
      //detector생성
      const detector = await faceLandmarksDetection.createDetector(model,detectorConfig);
      await detect(detector);
    };

    //detect 함수------------------------------
    const detect = async (detector) =>{
      //webcam, canvas 확인
      if(webcamRef.current && canvasRef.current && detector){
        const webcamCurrent=webcamRef.current;
        //webcam의 reacyState(현재 로드 상태===4일때,비디오 로드,재생가능할 때)
        if(webcamCurrent.video.readyState === 4){
          //Get Video property 
          const video=webcamRef.current.video;
          const videoWidth=webcamRef.current.video.videoWidth;
          const videoHeight=webcamRef.current.video.videoHeight;
          //Set Video width
          webcamRef.current.video.width=videoWidth;
          webcamRef.current.video.height=videoHeight;
          //set canvas width
          canvasRef.current.width=videoWidth;
          canvasRef.current.height=videoHeight;
          
          const estimationConfig = { flipHorizontal: false };//수평반전
          //예측
          const predictions=await detector.estimateFaces(video,estimationConfig);
          console.log(predictions)
          //canvas context가져오기
          //const ctx=canvasRef.current.getContext("2d");
          //requestAnimationFrame(()=>{draw(predictions,ctx)});//
          detect(detector);
        }
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    };

    //draw --------------
    // const draw = (predictions,ctx) =>{
    //     if(ctx){
    //       predictions.forEach
    //     }
    //   }
    // }

      useEffect(() => {
        runFaceDetect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [webcamRef.current?.video?.readyState])
    




    //   const estimationConfig = { flipHorizontal: false };//수평반전
    //   const prediction = await detector.estimateFaces(video, estimationConfig);
    //   //canvas.getContext 호출 
    //   const ctx = canvas.getContext("2d");

    //   //브라우저에서 제공하는 비동기 함수.(?) 새 프레임이 그려질때마다 콜백함수 실행
    //   //drawMesh는 인식된 얼굴 정보를 캔버스엥 그리기 위해 requestAnimationFrame을
    //   //이용해서 매 프레임마다 그린다.  
    //   requestAnimationFrame(() => drawMesh(faces[0], ctx));
    //   //함수 재귀 호출. 얼굴 계속 감지 
    //   detect(detector);
    // };

    return(
        <>
        <WebcamContainer ref={webcamRef}/>
        {/* 시각화용 canvas */}
        <CanvasContainer ref={canvasRef}/>
        {/* 3D캔버스 */}
        <TF_3DFace/>
      
    
   

        </>
      );
        }


        