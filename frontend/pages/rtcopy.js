//react,next
import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import Link from'next/link';
import { useState,useEffect,Suspense } from 'react';

import Ch_test from '../components/3D/Ch_test'; //Ch_test
import { OrbitControls } from '@react-three/drei';
import { PropertyBinding } from 'three';
import CharacterV4 from '../components/3D/CharacterV4';
import BackGround from '../components/home/BackGround';
//컴포넌트
// import Loading from '../components/3D/Loading';
import Character_All from '../components/3D/Character_All';


//css
import tw from 'tailwind-styled-components';


//R3F
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';

//zustand
import useStore from '../components/zustand_store/store';

//json파일
import matching_json from'../public/json/chracter_matching.json';

// ─── css  ───────────────────────────────────────────────────────────────────────
//배경색
// const SkyBackground = tw.div`
//   relative py-10 bg-gradient-to-br from-sky-50 to-gray-200
// `;
//가운데정렬
// const Container = tw.div`
//   relative container m-auto px-6  md:px-12 xl:px-40
// `;

//CONTENTS
const Section = tw.section`text-gray-600 body-font overflow-hidden`;
const Container = tw.div`container px-5 py-24 mx-auto`;
const Wrapper=tw.div`lg:w-4/5 mx-auto flex flex-wrap`;
const Image = tw.img`lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded`;
const Description=tw.div`lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0`;


//Card
const Card_Container = tw.div`my-8 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700`;
const Card_ul=tw.ul`my-4 space-y-3`;

// ─────────────────────────────────────────────────────────────────────────────

export  default function rtcopy(){
    const router = useRouter();
    const [data, setData] = useState(null);
    const {glasses,setGlasses}=useStore();

    useEffect(() => {
      if (router.query.data) {
        setData(JSON.parse(router.query.data));
        //처음 마운트 됐을때만
      } else {
        // router.query.data 값이 없을 때의 처리 로직 작성
      }
    }, [router.query.data]);

    //setGlasses(상태 관리 )
    useEffect(()=>{
      if (data && data.glasses_type) {
        setGlasses(data.glasses_type);
        // console.log('예측깂:',glasses);->null
      }
    }, [data, setGlasses]);

  
    if (!data) {
      return <div>Loading...</div>; // 데이터가 로드되기 전에 로딩 상태를 표시할 수 있습니다.
    }

    //json parsing해서 변수 선언 ----
    const hair_list=data.hair_type; //리스트
    const face_type=data.face_type;
    const glasses_type=data.glasses_type;//O,X
    
    //store에 저장 확인 
    console.log(glasses);
    
    // hair_type 매칭
    const hair_mesh = [];
    const hair_type =[];
    for (let i = 0; i < hair_list.length; i++) {
      const hair_type_i = hair_list[i];
      const hair_mesh_i = matching_json[0].헤어스타일[hair_type_i];
      hair_type.push(hair_type_i);
      hair_mesh.push(hair_mesh_i);
    }
    console.log(hair_mesh)

 





    // 매개변수 glasses_type을 사용하여 setGlasses 함수 호출 및 glasses 상태 업데이트
    //setGlasses(glasses_type);

    
    // const { glasses, setGlasses } = useStore();

    // useEffect(() => {
    //   // Call setGlasses to update the glasses state
    //   setGlasses(glasses_type);
    // }, [glasses_type, setGlasses]);

  // 업데이트된 glasses 상태 콘솔에 출력
  //  console.log({glasses});


    

    
  
    return(
        <>
        <Seo title='rtcopy' />
  
      <Section>
      <Container>
        <Wrapper>
        {/* 캔버스------------------------- */}
        <div className='lg:w-1/2 w-full border-4 lg:h-auto h-64 object-cover object-center rounded'>
          <Canvas className=''>
            <ambientLight intensity={1} />
            <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            <Text position={[0, 0, 0]} fontSize={1}>Hello,World !</Text>

            {/* 캐릭터------------- */}
            {/* 얼굴 */}
            {/* <Suspense fallback={<Loading/>}> */}
            <mesh>
              {/* <CharacterV4 meshName='face01'/> */}
              <CharacterV4 meshName='glasses_1'/>
            </mesh>
            <Character_All meshName='face02'/>
            <OrbitControls/> {/*3D 모델 축 회전 관련*/}
            {/* </Suspense> */}

        </Canvas>
        </div>

        {/* <Image alt='ecommerce' src='https://dummyimage.com/400x400'/> */}
        {/* 캔버스------------------------- */}

        {/* 왼쪽 ---------------------------*/}
        <Description>
          <div className='border-4'>
          <h1 className='font-gmarket'>분석결과</h1>
          </div>
          

          {/* 카드 */}
          <Card_Container>
            <h5 className='mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white'> Results</h5>
            <Card_ul>
              <li className='grid grid-flow-col '>
                <h2 className='font-gmarket'>안경</h2>
                <h2 className='font-gmarket'>{glasses_type}</h2>
              </li>

              <li className='grid grid-flow-col '>
                <h2 className='font-gmarket'>얼굴형</h2>
                <h2 className='font-gmarket'>{face_type}</h2>
              </li>

              <li>
                {/* 헤어스타일 Top5보여주기 */}
                <h2 className='font-gmarket '>헤어 스타일 Top5</h2>
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
          <div className='flex'>
            <p>수정하러 가기 버튼 </p>
            {/* 링크 */}

            <Link href={{
              pathname: '/modify',
              query: {
                data: JSON.stringify(data)
              }
            }}>
          <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">수정</button>
          </Link>
        </div>

        <div className='flex'>
          <p>녹화 하러 가기 버튼</p>
           {/* 링크 */}

           <Link href={{
              pathname: '/recording',
              query: {
                data: JSON.stringify(data)
              }
            }}>
               <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">녹화</button>
   
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