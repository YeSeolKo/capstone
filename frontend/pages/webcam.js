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
  const capture=useCallback(() =>{
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc); //setImage함수(imgSrc넣기 ->현재이미지)
      console.log(webcamRef.current.getScreenshot()); //콘솔에 이미지
    });
    

    // dataURI to Blob 함수
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);//실제 데이터부분만 추출,atob()로바이너리 데이터만듦
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });//Blob객체 생성 
    }


    //formData생성----
    const sendForm=()=>{
        const formData = new FormData(); //formData객체 생성
        const blob = dataURItoBlob(image); // dataURI to Blob 변환
        formData.append('capturedImage',blob); //Blob 파일 formData로 전송 
        const config={
            headers:{
                'Content-type':'multipart/form-data',
                'Accpet':'*',
                'withCredentials':'true'//cors관련 
            }
        };

    //post로 요청 시 
    // + api로 보내는 것 대신, 직접 flask서버로 보내기 

    //flask : postImage----------------------------------
    axios.post('http://127.0.0.1:5000/postImage',formData,config)
            .then((res)=>{ //axios.post 성공시
                console.log(res.data);//json메시지 들어옴 
                alert(res.data.message);
                
                 //router.push: ok버튼 누르면 페이지 이동
                router.push({
                    pathname:'/routingTest',
                    query:{
                        data:JSON.stringify(res.data)
                    }
                }); 
            })
            //에러처리
            .catch((err)=>{
                console.log(err);
            })
        }

    // next API -----------------------------------------
    // axios.post('/api/sendphoto',formData,config)
    //         .then((res)=>{
    //             console.log(res.status);//상태 코드 받아보기
    //            // router.push('/rendering'); //ok버튼 누르면 페이지 이동
    //         })
            
    // }
    //------------------------------------------------

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
                    // img src ={imag} -> 캡쳐한 이미지 
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
