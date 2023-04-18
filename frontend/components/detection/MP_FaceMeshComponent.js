//"" 미디어파이프 ""
import { FaceMesh, FACEMESH_LEFT_EYE, FACEMESH_LIPS, FACEMESH_RIGHT_EYE, Results } from "@mediapipe/face_mesh";
import React, { useRef, useEffect } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import {drawConnectors} from "@mediapipe/drawing_utils"; 
import Webcam from "react-webcam";
import BackCard from "../home/BackCard";


export default function MP_FaceMeshComponent() {
  
  const webcamRef=useRef(null);
  const canvasRef=useRef(null);
  //camera 초기화
  var camera=null;
  //drawing
  const drawing = drawConnectors;//drawConnectors사용 
  
  //onResults 콜백함수 
  function onResults(results){
    //console.log('results 테스트',results)

    // const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    //canvas와 video를 연결해야한다 --> 그래야 filter처럼 사용 
    // Set canvas width 캔버스 너비 지정
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    //------------------faceMesh 그리는부분
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        drawing(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 1,
        });
        //
        drawing(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
          color: "#FF3030",
        });
        drawing(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {
          color: "#FF3030",
        });
        drawing(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
          color: "#30FF30",
        });
        drawing(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
          color: "#30FF30",
        });
        drawing(canvasCtx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {
          color: "#E0E0E0",
        });
        drawing(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
          color: "#E0E0E0",
        });
      }
    }
    canvasCtx.restore();
  };
  
  
  //useEffect ->faceMesh 사용 
  useEffect(() => {
    //new로 FaceMesh객체 생성하고 faceMesh에 할당.
    //faceMesh변수를 통해 -> FaceMesh 객체를 사용할 수 있다. 
    const faceMesh = new FaceMesh({
      locateFile: file => {
        //주소 에러 조심 ~ ㅜㅜ 
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }});
      console.log("faceMesh 객체:",faceMesh)

    //faceMesh객체 옵션 설정 
    faceMesh.setOptions({
      maxNumFaces:1, //한번에 추적할 최대 얼굴 개수
      minDetectionConfidence:0.5, //얼굴탐지 최소 신뢰도(높을수록 정확도 up , but성능저하)
      minTrackingConfidence:0.5, //추적 신뢰도 
    });
    //콜백함수 
    faceMesh.onResults(onResults); 


    //camera 객체 생성
    const camera = new cam.Camera(webcamRef.current.video,{
      onFrame:async()=>{
        await faceMesh.send({image:webcamRef.current.video});
      },
      width:640,
      height:480
    });
    camera.start();

    // if (
    //   typeof webcamRef.current !== "undefined" &&
    //   webcamRef.current !== null
    // ) {
    //   camera = new cam.Camera(webcamRef.current.video, {
    //     onFrame: async () => {
    //       await faceMesh.send({ image: webcamRef.current.video });
    //     },
    //     width: 640,
    //     height: 480,
    //   });
    //   camera.start();
    // }
  }, []);

  

  return (
      <div>
        <Webcam ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />{""}

        <canvas
          ref={canvasRef}
          className="output_canvas"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        {/* </canvas> */}
      </div>
  );
}

