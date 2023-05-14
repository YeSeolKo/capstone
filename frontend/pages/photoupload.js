import Seo from '../components/Seo';
import {useState,useRef,useCallback} from 'react';

// import tw from 'twin.macro';
import tw from 'tailwind-styled-components';
import axios from 'axios';
import {useRouter} from 'next/router';
import BackCard from '../components/home/BackCard';


// ─── css  ───────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────

export default function photoupload(){
  const[image,setImage]=useState('');
  const router=useRouter(); //useRouter

  //이미지 업로드 미리보기
  const handleImage=(e)=>{
      const file=e.target.files[0];//선택한 파일 하나이기 떄문에 index =0
      const reader = new FileReader(); //FileReader 사용 
      reader.onload=(e)=>{
          setImage(e.target.result);
      };
      reader.readAsDataURL(file);
  };

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


//sendForm구현 
const sendForm=()=>{
    const formData = new FormData(); //formData객체 생성
    const blob = dataURItoBlob(image); // dataURI to Blob 변환
    formData.append('photoImage',blob); //Blob 파일 formData로 전송 
    const config={
        headers:{
            'Content-type':'multipart/form-data',
            'Accpet':'*',
            'withCredentials':'true'//cors관련 
        }
    };
    
    axios.post('http://127.0.0.1:5000/photoImage',formData,config)
        .then((res)=>{ //axios.post 성공시
            console.log(res.data);//json메시지 들어옴 
            alert(res.data.glasses_type);
            
             //router.push: 버튼 누르면 페이지 이동
            router.push({
                pathname:'/analyze',
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

  return (
    <>
      <Seo title='PhotoUpload'></Seo>


        {/* 이미지 미리보기
        {imageSrc && (
      <img 
        src={imageSrc} 
        alt="Preview" 
        style={{width:"200px", height:"200px", marginTop:"20px"}} 
      />
    )} */}


{/* //FIXME - 반응형 css 수정 */}
    <BackCard>
       <div className="relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
            {/* 조건부렌더링 - 이미지 미리보기 */}
            {image ? (
                <img 
                    className="w-full h-full object-contain"
                    src={image}
                    alt="Preview"
                   />
            ): (
                // 기본이미지
            <span className="text-gray-400 opacity-75">
                <svg className="w-14 h-14"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.7" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </span>
            )}
    </div>

        {/* 사진업로드- label로 input 버튼 생성 */}
        <label className='font-gmarket text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' 
               htmlFor='inputFile'>사진 선택</label>
        {/* input태그 숨김  */}
        <input
            type="file"
            id="inputFile"
            accept="image/*"
            style={{display:"none"}}
            onChange={handleImage} 
            />

        {/* imageSrc있으면 버튼 보여주기 */}
        {/* 조건문 image가 있으면 true 재촬영버튼 띄우기(이미 캡처완료),false:캡쳐버튼 활성화*/}
        {/* 업로드 버튼 누르면 파일(blob파일) flask에 전송 */}
        {image !=''? ( <button className='font-gmarket text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-blue-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 '
                                             onClick={()=>sendForm()}>업로드</button>) :null}
    </BackCard>
    </>
  );
}
