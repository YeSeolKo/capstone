//"" Tensorflow.js""" 

import React, { useRef, useState } from 'react';
//tensorflow
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models"
//import * as facemesh from"@tensorflow-models/facemesh"; -> old model 
import Webcam from "react-webcam";
import styled from 'styled-components';
// import tw from 'tailwind-styled-components/dist/tailwind';
import { Canvas } from '@react-three/fiber';


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
  background-color: yellow; //노랑
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

    //
    
    const runFace = facemesh.load;

    return(
        <>
        <WebcamContainer/>
        <CanvasContainer/>
      
    
   

        </>
      );
        }


        