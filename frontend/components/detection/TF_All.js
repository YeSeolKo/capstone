// //"" Tensorflow.js""" 
// import { useRef, useState,useEffect } from 'react';
// //tf
// import * as tf from '@tensorflow/tfjs';
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

// import Model from '../3D/Model';
import Lights from '../3D/Lights';
import Character_All from "../3D/Character_All";
//zustand
import useStore from "../zustand_store/store";
//함수
import hairMeshMatching from "../function/hairMeshMatching";


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
  const {glasses_state,setGlasses_state}=useStore();
  const {face_state,setFace_state}=useStore();
  const {hair_state,setHair_state}=useStore();
  const {hair_mesh_state,setHairMesh_state}=useStore();
  const {glasses_mesh_state,setGlassesMesh_state}=useStore();
  const {eye_state,setEyeState}=useStore();
  
  // zustand 새로고침 후에  상태복원
  useEffect(() => {
    const savedState = localStorage.getItem('zustandState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setGlasses_state(parsedState.glasses_state);
      setFace_state(parsedState.face_state);
      setHair_state(parsedState.hair_state);
      //setHairMesh_state(parsedState.hair_mesh_state); //FIXME - 새로고침 오류 
   
    }
  }, []);


  console.log('안경 state',glasses_state);
  console.log('얼굴 state', face_state);
  console.log('헤어 state', hair_state);
  console.log('바뀐 메쉬:',hair_mesh_state);//FIXME - 
  //   useEffect(() => {
  //   console.log('바뀐 메쉬:',hair_mesh_state);
  // }, [hair_mesh_state]);





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
        //webcam의 reacyState(현재 로드 상태===일때,비디오 로드,재생가능할 때)
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
      },100);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
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
        console.log('>>>>>>>> x좌표:', boxRef.current.position.x)



        // boxRef.current.position.z=position.z;
      }
    };

      useEffect(() => {
        runFaceDetect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [webcamRef.current?.video?.readyState]);

      
      //Camera Setting
      function Rig() {
        const { camera } = useThree();
        const videoWidth=640;
        const videoHeight=480;
        const target = new THREE.Vector3(videoWidth / 2, -videoHeight / 2, 0);

      
        useFrame(() => {
          //카메라 각도 조절 - 정면모드 
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
            {/* //오래걸림 */}
            <Lights/>
            {/* 캐릭터 */}
            {/* NOTE - 캐릭터 */}
            <mesh ref={boxRef} >
              {/* 안경 */}
              <Character_All meshName={glasses_mesh_state}/>
              {/* 얼굴 */}
              <Character_All meshName='face02'/>
              {/* <Character_All meshName={face_state}/> */}
              
              {/* 헤어 */}
              {/* FIXME - zustand 대신 함수 사용 */}
              <Character_All meshName={hairMeshMatching(hair_state)}/> 
              {/* 눈 */}
              <Character_All meshName={eye_state}/>
              
            
            </mesh>
          </Canvas>
          </Div>
        </>
      );
    }
    
