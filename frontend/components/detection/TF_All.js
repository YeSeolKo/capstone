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
//R3F
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from "three";

import Model from '../3D/Model';
import Lights from '../3D/Lights';
import Character_All from "../3D/Character_All";
//zustand
import useStore from "../zustand_store/store";


// ─── css  ───────────────────────────────────────────────────────────────────────
const WebcamContainer = styled(Webcam)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  //z-index: 9;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);//좌우반전
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
  //z-index: 9;
  width:100%;
  height: 100%;
  transform: scaleX(-1); //좌우반전
`;
const Div=styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  //z-index: 9;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);//좌우반전
`;
// ──────────────────────────────────────────────────────────────────────────

export default function TF_All() {
  const webcamRef=useRef();
  const canvasRef=useRef();
  const boxRef=useRef();
  
  //zustand
  // const {glasses_state,setGlasses_state}=useStore();
  // const {face_state,setFace_state}=useStore();
  // console.log(glasses_state);
  // console.log(face_state);

  //타입 전부 가져옴


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

          // console.log(videoWidth); 640
          // console.log(videoHeight)480
          //set canvas width
          canvasRef.current.width=videoWidth;
          canvasRef.current.height=videoHeight;
          
          const estimationConfig = { flipHorizontal: false };//수평반전
          //예측(pose)
          const predictions=await detector.estimatePoses(video,estimationConfig);
          //코 x,y좌표(keypoints3D[0]=nose)!!!!!!
          // console.log(predictions[0].keypoints3D[0]);
          //함수 호출

          //FIXME - 재귀함수 
        const waitForPosition=()=>{
          const position_x = predictions[0]?.keypoints3D[0]?.x;
          const position_y = predictions[0]?.keypoints3D[0]?.y;
          const position_z = predictions[0]?.keypoints3D[0]?.z;

          // const position_x=predictions[0].keypoints3D[0].x
          // const position_y=predictions[0].keypoints3D[0].y
          // const position_z=predictions[0].keypoints3D[0].z
          //얼굴이 화면 밖을 나가면 error
          if (position_x!==undefined && position_y!==undefined&&position_z!==undefined){
              moveBox(position_x,position_y,position_z);
          }else{
            //얼굴이 화면 밖을 나가서 position=undefined일때(position찾을때 까지 대기)
            //position다시 찾으면 재귀함수호출해서 position_x,y,z 세팅 
            setTimeout(waitForPosition,1000);
          }
        };
        waitForPosition();
      }
    }

      //무한 재귀호출 방지 -> 100ms 마다detect함수 호출
      setTimeout(()=>{
        requestAnimationFrame(()=>detect(detector));
      },10);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    };

    //moveBox
    const moveBox=(position_x,position_y,position_z)=>{
      if(boxRef.current){
        // 2D 좌표를 3D 좌표로 변
        // const canvasWidth=canvasRef.current.width;
        // const canvasHeight=canvasRef.current.height;
        // boxRef.current.position.x=(position_x/canvasHeight)*2-1;
        // boxRef.current.position.y=(position_y/canvasHeight)*-2+1;
        // boxRef.current.position.z=position_z;



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

      //
      // function Rig(){
      //   const {camera} = useThree();
      //   const target= new THREE.Vector3(0,0,0);
      //   useFrame(()=>{
      //     camera.position_z=-4.75;
      //     camera.lookAt(target);
      //   });
      //   return null;
      // }
      // function Rig() {
      //   const { camera } = useThree();
      //   const target = new THREE.Vector3(0, 0, 0);
      //   useFrame(() => {
      //     camera.position.z = -4.75;
      //     camera.lookAt(target);
      //   });
    
      //   return null;
      // }
      // const videoWidth=640
      // const videoHeight=480

      // const cameraPosition = new THREE.Vector3(
      //   videoWidth / 2,
      //   -videoHeight / 2,
      //   -(videoHeight / 2) / Math.tan(THREE.MathUtils.degToRad(45 / 2))
      // );
      // camera.lookAt({x:videoWidth/2,y:-videoHeight/2,z:0,isVector3:true})
      
      //Camera Setting
      function Rig() {
        const { camera } = useThree();
        const videoWidth=640;
        const videoHeight=480;
        const target = new THREE.Vector3(videoWidth / 2, -videoHeight / 2, 0);

      
        useFrame(() => {
          camera.position.set(videoWidth / 2, -videoHeight / 2, -(videoHeight / 2) / Math.tan(THREE.MathUtils.degToRad(45 / 2)));
          camera.lookAt(target);
        });
      
        return null;
      }
    

    
      return (
        <>
        
        {/* <div style={{ position: "relative", width: 600, height: 600 }}> */}
          {/* <Webcam ref={webcamRef}/> */}
          <WebcamContainer ref={webcamRef}/>
          <CanvasContainer ref={canvasRef}/>
          <Div>
          <Canvas camera={{ position:[0,0,4.75],fov:45}} >
            {/* <Rig> */}
            {/* <mesh ref={boxRef} scale={[2,2,1]}>
              <boxBufferGeometry args={[1,1,1]} />
              <meshBasicMaterial color={'black'}/>
            </mesh> */}
            {/* <box ref={boxRef} scale={[0.1, 0.1, 0.1]} position={[0, 0, -1]} /> */}
            
            {/* //오래걸림 */}
            <Lights/>
            <mesh ref={boxRef} >
              <Character_All meshName='glasses_1'/>
              <Character_All meshName='face02'/>
            </mesh>
            {/* </Rig> */}
          </Canvas>
          </Div>
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
    


    