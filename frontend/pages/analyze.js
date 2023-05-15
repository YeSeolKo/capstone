//react,next
import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import Link from'next/link';
import { useState,useEffect,Suspense } from 'react';

import { OrbitControls } from '@react-three/drei';

//컴포넌트
// import Loading from '../components/3D/Loading';
import Character_All from '../components/3D/Character_All';


//css
import tw from 'tailwind-styled-components';


//R3F
import {  useLoader, Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'; //??


//zustand (전역상태관리 )
import useStore from '../components/zustand_store/store';

//json파일
import matching_json from'../public/json/chracter_matching.json';

//함수
import hairMeshMatching from '../components/function/hairMeshMatching';
import Lights from '../components/3D/Lights';



// ─── css  ───────────────────────────────────────────────────────────────────────

//CONTENTS
const Section = tw.section`bg-gradient-to-br from-sky-50 to-gray-200/50 text-gray-600 body-font overflow-hidden`;
const Container = tw.div`container px-5 py-24 mx-auto`;
const Wrapper=tw.div`lg:w-4/5 mx-auto flex flex-wrap`;
const Image = tw.img`lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded`;
const Description=tw.div`lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0`;


//Card
const Card_Container = tw.div`my-8 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700`;
const Card_ul=tw.ul`my-4 space-y-3`;

// ─────────────────────────────────────────────────────────────────────────────

export  default function Analyze(){
    const router = useRouter();
    const [data, setData] = useState(null);
    const {glasses_state,setGlasses_state}=useStore();
    const {face_state,setFace_state}=useStore();
    const {hair_state,setHair_state}=useStore();
    const {hair_mesh_state,setHairMesh_state}=useStore();
    const {glassesMesh_state,setGlassesMesh_state}=useStore();
    const {eye_state,setEyeState}=useStore();


    //response 데이터파싱 
    useEffect(() => {
      if (router.query.data) {
        setData(JSON.parse(router.query.data));
      } else {
        // router.query.data 값이 없을 때의 처리 로직 작성
      }
    }, [router.query.data]);

    //NOTE store에 저장
    useEffect(()=>{
      if (data && data.glasses_type&&data.face_type&&data.hair_type) {
        setGlasses_state(data.glasses_type);//안경 O,X
        setFace_state(data.face_type); //얼굴 Oval
        setHair_state(data.hair_type[0]); //헤어 애즈 
        setHairMesh_state(data.hair_type[0]); //NOTE - 
        //눈 상태 초기화 해야함
        setEyeState('eye_2');
      }
    }, [data, setGlasses_state,setFace_state,setHair_state,setHairMesh_state,setEyeState]);
     //store에 저장 확인 
     console.log('store',glasses_state);
     console.log('face',face_state);
     console.log('디폴트 hair:',hair_state);
     console.log('바뀐 mesh', hair_mesh_state); //NOTE
     

    if (!data) {
      return <div>Loading...</div>; //FIXME - 데이터가 로드되기 전에 로딩 상태를 표시
    };

    //json parsing해서 변수 선언 ----
    const hair_type=data.hair_type; //리스트
    const face_type=data.face_type; //얼굴형
    const glasses_type=data.glasses_type;//O,X


    //matching함수 쓰고 변수 선언 
    const top1_hair_mesh=hairMeshMatching(hair_type[0]); //fucntion 컴포넌트 함수 사용 !! 
    //NOTE - state사용해도 될듯 

    const user='USER';

    

  
    return(
        <>
        <Seo title='Analyze' />
  
      <Section>
      <Container>
        <Wrapper>
        {/* 캔버스------------------------- */}
        <div className='rounded-3xl bg-white shadow-lg lg:w-1/2 w-full border-4 lg:h-auto h-64 object-cover object-center rounded'>
          <Canvas >
            <Lights/>
            {/* <Suspense fallback={}> */}
            {/* //NOTE - 한글폰트 */}
            <Text position={[0, 2.5, 0]} fontSize={1} outlineColor="black"outlineWidth={0.02} >
            Hello, World! </Text> 

            {/* 캐릭터------------- */}
            {/* <Suspense fallback={<Loading/>}> */}
            <mesh>
              { /* 안경 */}
              {/* 안경 있으면 렌더링 */}
              {glasses_type=='O'?(<Character_All meshName='glasses_1'/>):null}
              {/* 얼굴 */}
              <Character_All meshName='face02'/>
              {/* 헤어 */}
              <Character_All meshName={top1_hair_mesh}/>
              {/* 눈 */}
              <Character_All meshName='eye_2'/>
              {/* <Character_All meshName={eye_state}/> */}
              {/* <Character_All meshName={'eye_blue'}/> */}
              {/* <Character_All meshName={'brow'}/> */}
              
            </mesh>
            {/* </Suspense> */}
            <OrbitControls/> {/*3D 모델 축 회전 관련*/}
            {/* </Suspense> */}

        </Canvas>
        </div>

        {/* <Image alt='ecommerce' src='https://dummyimage.com/400x400'/> */}
        {/* 캔버스------------------------- */}

        {/* 왼쪽 ---------------------------*/}
        <Description>
          <div className='bg-white border-2 rounded-md p-4'>
          <h1 className='font-gmarket text-3xl'>분석 결과 </h1>
          </div>
          

          {/* 카드 */}
          <Card_Container>
            <div className='bg-gray-100 rounded-md '>
              <p className='font-gmarket text-3xl '>{user}</p> 
            </div>

            <Card_ul>
              <li className='grid grid-flow-col '>
                <h1 className='font-gmarket underline decoration-4 decoration-blue-500/50 underline-offset-4'>안경</h1>
                <h2 className='font-gmarket'>{glasses_type}</h2>
              </li>

              <li className='grid grid-flow-col '>
                <h1 className='font-gmarket underline decoration-4 decoration-blue-500/50 underline-offset-4'>얼굴형</h1>
                <h2 className='font-gmarket'>{face_type}</h2>
              </li>

              <li>
                {/* 헤어스타일 Top5보여주기 */}
                <h1 className='font-gmarket my-4 underline decoration-4 decoration-pink-500/50 underline-offset-8'>헤어 스타일 Top5</h1>
                <div className='flex gap-4'>
                  <h3 className='font-gmarket'>1. {hair_type[0]}</h3>
                  <h3 className='font-gmarket'>2. {hair_type[1]}</h3>
                  <h3 className='font-gmarket'>3. {hair_type[2]}</h3>
                  <h3 className='font-gmarket'>4. {hair_type[3]}</h3>
                  <h3 className='font-gmarket'>5. {hair_type[4]}</h3>
                </div>
              </li>
            </Card_ul>
            
          </Card_Container>

          {/* 버튼 */}
          <div className='flex m-2'>
            <h3 className='font-gmarket'>수정하러 가기 </h3>
            {/* 링크 */}
            <Link href={{
              pathname: '/modify',
              query: {
                data: JSON.stringify(data)
              }
            }}>
          <button className="font-gmarket flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">수정</button>
          </Link>
        </div>

        <div className='flex m-2'>
          <h3 className='font-gmarket'>녹화 하러 가기 </h3>
           {/* 링크 */}

           <Link href={{
              pathname: '/recording_tf',
              query: {
                data: JSON.stringify(data)
              }
            }}>
               <button className="font-gmarket flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">녹화</button>
   
          </Link>

        </div>
        </Description>
        {/* 왼쪽 ---------------------------*/}
        </Wrapper>
        </Container>
        </Section>

       
  
   </>

    );
}