import React, { useRef, useState,useEffect } from 'react';
import Webcam from "react-webcam";

//tf
import "@tensorflow/tfjs-core"; // 
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-converter";

import * as posenet  from "@tensorflow-models/pose-detection";
import * as pose  from "@tensorflow-models/pose-detection";


export default function CameraView (props) {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const style={
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 9,
        width: 320,
        height: 240
    };

    //runFace 함수------------------------
    const runPosenet = async()=>{
        const model=pose.SupportedModels.PoseNet;//model
        const detectorConfig={
          runtime:"tfjs", 
        };
        //detector생성
        const detector = await pose.createDetector(model,detectorConfig);
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
            const predictions=await detector.estimatePoses(video,estimationConfig);
            //console.log(predictions);
       
           
          }
        }
  
        //무한 재귀호출 방지 -> 100ms 마다detect함수 호출
        setTimeout(()=>{
          requestAnimationFrame(()=>detect(detector));
        },100);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      };
  
        useEffect(() => {
          runPosenet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [webcamRef.current?.video?.readyState])
  


    return (
        <>
        <div>
            <Webcam ref={webcamRef} style={style}/>     
        </div>
        </>
    );
}


