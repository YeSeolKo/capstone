import Seo from '../components/Seo';
import {useState,useRef,useCallback} from 'react';
//import WebcamCapture from '../components/camera/WebcamCapture';
import Webcam from 'react-webcam';
// import tw from 'twin.macro';
import tw from 'tailwind-styled-components';
import axios from 'axios';
import {useRouter} from 'next/router';
import BackWebcam from '../components/home/BackWebcam';


// ─── css  ───────────────────────────────────────────────────────────────────────
const Webcamcontainer=tw.div`
    
    
    `
const WebcamImage=tw.div`
    `
    //가운데 정렬
const WebcamBtnContainer=tw.div`
    p-4
    flex justify-center
    items-center
`
const CaptureBtn=tw.button`
    inline-block
    px-6
    py-2
    border-2
    border-red-600
    text-red-600
    font-medium
    leading-tight
    uppercase
    rounded-full
    hover:bg-black
    hover:bg-opacity-5
    focus:outline-none
    focus:ring-0
    transition
    duration-150
    ease-in-out

`

const OKbtn=tw.button`
    inline-block
    px-6
    py-2.5
    bg-blue-400
    text-white
    font-medium
    leading-tight
    uppercase
    rounded-full
    shadow-md
    hover:bg-blue-500
    hover:shadow-lg
    focus:bg-blue-500
    focus:shadow-lg
    focus:outline-none
    focus:ring-0
    active:bg-blue-600
    active:shadow-lg
    transition
    duration-150
    ease-in-out
`
// ─────────────────────────────────────────────────────────────────────────────

const videoConstraints = {
  width: 1280, //NOTE - width조절!
  height: 720, //NOTE - heigth 조절! 
  facingMode: 'user'
};

export default function webcam(){
  const[image,setImage]=useState('');
  const webcamRef=useRef(null);
  const router=useRouter(); //useRouter 

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

    //post로 요청 시 
    axios.post('/api/sendphoto',formData,config)
            .then((res)=>{
                console.log(res.status);//상태 코드 받아보기
                router.push('/rendering'); //ok버튼 누르면 페이지 이동
            })
            

            


    }

  return (
    <>
      <Seo title='Webcam'></Seo>
      
      {/* <WebcamCapture/>           */}

    <BackWebcam>
      <Webcamcontainer>  
            <WebcamImage> 
                {image == '' ? <Webcam
                    audio={false}
                    height={400} //NOTE - 조절!!!
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={400} //NOTE - 조절!!!!
                    videoConstraints={videoConstraints}
                /> : <img src={image} />}
            </WebcamImage>

            <WebcamBtnContainer>
                {/* 조건문 image가 있으면 true 재촬영버튼 띄우기(이미 캡처완료),false:캡쳐버튼 활성화*/}
                {image != '' ?
                    <CaptureBtn onClick={(e) => {
                        e.preventDefault();
                        setImage('')
                    }}
                        className="webcam-btn">
                        재촬영 </CaptureBtn>
                        :
                    <CaptureBtn onClick={(e) => {
                        e.preventDefault();
                        capture();
                    }}
                        className="webcam-btn">캡처</CaptureBtn>
                        
                }
            </WebcamBtnContainer>


            {/**TODO - ok버튼 누르면 서버에 사진 전송하기 */}
            {/**image있을때만 ok버튼  */}
                {/**삼항연산자->조건?조건참일때실행할코드:거짓일때 실행할코드 */}

                {/**ok 버튼 누르면 -> 사진 전송*/}
                {/*tailwindcss 가운데 정렬*/}
            <div className='flex justify-center items-center'>
                { image!=''?
                    <OKbtn onClick={()=>sendForm()}>ok!</OKbtn> : null}
                    
                
            </div>
            



        </Webcamcontainer>
        </BackWebcam>
    </>
  );
}
