//"" Tensorflow.js""" 
import { useRef, useState,useEffect } from 'react';
//tf
import "@tensorflow/tfjs-core"; // 
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-converter";

import * as pose  from "@tensorflow-models/pose-detection";

import Webcam from "react-webcam";
import styled from 'styled-components';
// import tw from 'tailwind-styled-components/dist/tailwind';

//R3F 
import {Canvas} from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

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


export default function TF_Pose() {

    const webcamRef=useRef(null);
    const canvasRef=useRef(null);
    const textRef= useRef(null);
    const [predictions, setPredictions] = useState([]);
    const [videoWidth, setVideoWidth] = useState(0);
    const [videoHeight, setVideoHeight] = useState(0);


    //runFace 함수------------------------
    const runFaceDetect = async()=>{
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
        runFaceDetect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [webcamRef.current?.video?.readyState])

    
  //   useFrame(()=>{
  //     if (predictions.length > 0) {
  //       const noseLandmark = predictions[0].keypoints.find(kp => kp.name === "nose");
  //       const x = noseLandmark.x;
  //       const y = noseLandmark.y;
  //       const z = noseLandmark.z;
  //       const nosePosition=[x,y,z];
  //       //R3F 좌표계로 변환
  //       const R3FPosition = [x - videoWidth / 2, -y + videoHeight / 2, z];
  //       //text 위치 업데이트
  //       textRef.current.position.set(R3FPosition[0], R3FPosition[1] + 0.1, R3FPosition[2]);
       
  //   }
  // });
    

    return(
        <>
        <WebcamContainer ref={webcamRef}/>
        {/* 시각화용 canvas */}
        <CanvasContainer ref={canvasRef}/>

        {/* 캔버스 */}
        <Canvas>
       



        <Text ref={textRef} position={[0, 0, 0]} fontSize={1}> 3D Canvas</Text>
        </Canvas>
        


        </>
      );
        }

