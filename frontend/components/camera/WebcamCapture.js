import {useState,useRef,useCallback} from 'react';
import Webcam from 'react-webcam';
// import tw from 'twin.macro';
import tw from 'tailwind-styled-components';
import axios from 'axios';


// ─── css  ───────────────────────────────────────────────────────────────────────
const Webcamcontainer=tw.div`bg-amber-300`
const WebcamImage=tw.div``
const WebcamBtn=tw.div``
// ─────────────────────────────────────────────────────────────────────────────



const videoConstraints = {
    width: 1280, //NOTE - width조절!
    height: 720, //NOTE - heigth 조절! 
    facingMode: 'user'
  };



export default function WebcamCapture(){
    const[image,setImage]=useState('');
    const webcamRef=useRef(null);

    //캡쳐 함수
    const capture=useCallback(
        () =>{
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc); //setImage함수(imgSrc넣기 ->현재이미지)
            console.log(webcamRef.current.getScreenshot()); //콘솔에 이미지
            });
    
    //formData생성
    const sendForm=()=>{

        const formData = new FormData(); //formDatat객체 생성
        formData.append('imgsrc',image); //이미지src넣어주기
        const config={
            headers:{
                'Content-type':'multipart/form-data',
                'Accpet':'*',
                'withCredentials':'true'//cors관련 
            }
        };

        axios.post('',formData,config)
            .then((response)=>{response.json()})
            .then((data)=>alert(data.message)) 


    }

  




    return(
        <Webcamcontainer>  
            <WebcamImage> 
                {image == '' ? <Webcam
                    audio={false}
                    height={200} //NOTE - 조절!!!
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220} //NOTE - 조절!!!!
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </WebcamImage>

            <WebcamBtn>
                {/* 조건문 image가 있으면 true 재촬영버튼 띄우기(이미 캡처완료),false:캡쳐버튼 활성화*/}
                {image != '' ?
                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        재촬영 </button>
                        :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">캡처</button>
                        
                }
            </WebcamBtn>


            {/**TODO - ok버튼 누르면 서버에 사진 전송하기 */}
            {/**image있을때만 ok버튼  */}
                {/**삼항연산자->조건?조건참일때실행할코드:거짓일때 실행할코드 */}

                {/**ok 버튼 누르면 -> 사진 전송*/}
            <div>
                { image!=''?
                    <button onClick={()=>sendForm()}>ok!</button> : null}
                    
                
            </div>
            



        </Webcamcontainer>
    );
 };
