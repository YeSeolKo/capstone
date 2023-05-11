// //"" Tensorflow.js""" 
// import { useRef, useState,useEffect } from 'react';
// //tf
import "@tensorflow/tfjs-core"; // 
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-converter";

import * as pose  from "@tensorflow-models/pose-detection";

import Webcam from "react-webcam";
import styled from 'styled-components';
// // import tw from 'tailwind-styled-components/dist/tailwind';

// //R3F
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Text } from '@react-three/drei';

import React, { Suspense, useEffect,useState,useRef } from 'react';
import CameraView from './CameraView';
import { Canvas } from '@react-three/fiber';
import Model from '../3D/Model';
import Lights from '../3D/Lights';
//css
const WebcamContainer = styled(Webcam)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  /* left: 0;
  right: 0;
  text-align: center;
  z-index: 9;
  width: 640px;
  height: 480px; */
`;
//캔버스 
const CanvasContainer = styled.div`
  //background-color: yellow; //노랑
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  /* left: 0;
  right: 0;
  text-align: center;
  z-index: 9;
  width: 340px;
  height: 480px; */
`;

export default function TF_All() {
  const webcamRef=useRef();
  const canvasRef=useRef();
  const boxRef=useRef();


    // let kp;
    // const [position, setPosition] = useState([0, -1, 0]);

    // const updatePosition = (keypoints) => {
    //     const [nose, leftEye, rightEye] = keypoints;
    //     setPosition([nose[0], nose[1], nose[2]]);
     
    // };

    //runFace 함수------------------------
    const runFaceDetect = async()=>{
      const model=pose.SupportedModels.BlazePose;//model
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
          //예측(pose)
          const predictions=await detector.estimatePoses(video,estimationConfig);
          //코 x,y좌표(keypoints3D[0]=nose)!!!!!!
          // console.log(predictions[0].keypoints3D[0]);
          //함수 호출
          //얼굴이 화면 밖을 나가면 error 
          const position_x=predictions[0].keypoints3D[0].x
          const position_y=predictions[0].keypoints3D[0].y
          const position_z=predictions[0].keypoints3D[0].z
          moveBox(position_x,position_y,position_z)
        }
      }

      //무한 재귀호출 방지 -> 100ms 마다detect함수 호출
      setTimeout(()=>{
        requestAnimationFrame(()=>detect(detector));
      },100);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    };

    //moveBox
    const moveBox=(position_x,position_y,position_z)=>{
      if(boxRef.current){
        boxRef.current.position.x=position_x;
        boxRef.current.position.y=position_y;
        boxRef.current.position.z=position_z;
        console.log(boxRef.current.position.x)
        // boxRef.current.position.z=position.z;
      }
    };

      useEffect(() => {
        runFaceDetect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [webcamRef.current?.video?.readyState]);

    


    
      return (
        <>
        
        {/* <div style={{ position: "relative", width: 600, height: 600 }}> */}
          {/* <Webcam ref={webcamRef}/> */}
          <WebcamContainer ref={webcamRef}/>
          <CanvasContainer ref={canvasRef}/>
          <Canvas>
            <mesh ref={boxRef} scale={[2,2,1]}>
              <boxBufferGeometry args={[1,1,1]} />
              <meshBasicMaterial color={'black'}/>
            {/* <box ref={boxRef} scale={[0.1, 0.1, 0.1]} position={[0, 0, -1]} /> */}
            </mesh>
          </Canvas>
          {/* <Canvas
            colorManagement
            shadowMap
            camera={{position: [0, 0, 2], fov: 60}}>
              <Lights />
              <Suspense fallback={null}>
                <mesh position={[0,-1,0]}>
                  <Model position={position}/>
                </mesh>
              </Suspense>
            </Canvas> */}
        {/* </div> */}
        {/* <CameraView updatePosition={updatePosition}/> */}
        </>
      );
    }
    


    