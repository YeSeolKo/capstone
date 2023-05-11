import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import Ch_test from '../components/3D/Ch_test'; //Ch_test

import { OrbitControls } from '@react-three/drei';
import { PropertyBinding } from 'three';

import BackGround from '../components/home/BackGround';
import{useEffect} from 'react';
//next,react
import Link from 'next/link';
import {useState} from'react';

// //css
// import tw from 'tailwind-styled-components';
import tw from'tailwind-styled-components';
import styled from 'styled-components';

//R3F
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import react from 'react';
import Character_All from '../components/3D/Character_All';
import CharacterV4 from '../components/3D/CharacterV4';

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

export  default function Modify(){

    const router = useRouter();
    const [data, setData] = useState(null);

    useEffect(() => {
      if (router.query.data) {
        setData(JSON.parse(router.query.data));
      } else {
        // router.query.data 값이 없을 때의 처리 로직 작성
      }
    }, [router.query.data]);
  
    if (!data) {
      return <div>Loading...</div>; // 데이터가 로드되기 전에 로딩 상태를 표시할 수 있습니다.
    }


    return(
    <>
    <Seo title='modify' />
       <h1>Modifty</h1>
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
          {/* 카드 */}
          <Card_Container>
            <h1>dsggdg</h1>
          </Card_Container>

          {/* 버튼 */}
          <div className='flex'>
            <p>녹화 하러 가기 </p>
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