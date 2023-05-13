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


//TAB
const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
`;

const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 20%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${props => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${props => (props.active ? "none" : "")};
  background-color: ${props => (props.active ? "white" : "lightgray")};
  height: ${props => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;
const Content = styled.div`
  ${props => (props.active ? "" : "display:none")}
`;

// ─────────────────────────────────────────────────────────────────────────────

export  default function Modify(){

    const router = useRouter();
    const [data, setData] = useState(null);
    const [active, setActive] = useState(0);
    const [characterMesh, setCharacterMesh] = useState('glasses_1');


    useEffect(() => {
      if (router.query.data) {
        setData(JSON.parse(router.query.data));
      } else {
        // router.query.data 값이 없을 때의 처리 로직 작성
      }
    }, [router.query.data]);
  
    // if (!data) {
    //   return <div>Loading...</div>; // 데이터가 로드되기 전에 로딩 상태를 표시할 수 있습니다.
    // }

    //탭 !!!! 
    const handleClick = e => {
      const index = parseInt(e.target.id, 0);
      if (index !== active) {
        setActive(index);
        // if (index === 0) {
        //   setCharacterMesh('pixelglasses');
        //   console.log('set')
        // }
      }

    };

    useEffect(()=>{
      console.log(characterMesh);
    },[characterMesh]);



    return(
    <>
    <Seo title='modify' />
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
              <CharacterV4 meshName={characterMesh}/>
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
            {/* 탭메뉴 가져오기 */}
            <Tabs>
              <Tab onClick={handleClick} active={active === 0} id={0}>안경</Tab>
              <Tab onClick={handleClick} active={active === 1} id={1}>헤어</Tab>
              <Tab onClick={handleClick} active={active === 2} id={2}>눈</Tab>
            </Tabs>

            {/* 내용 */}
              <Content active={active === 0}>
              <div className="border-2 grid grid-cols-4 gap-">
                <button onClick={setCharacterMesh('pixelglasses')}>픽셀 선글라스</button> 
                <p>sgd</p>
                <p>c</p>
                <p>d</p>
                <p>s</p>
                <p>sdgsdg</p>
              </div>
            </Content>
            <Content active={active === 1}>
              <h1>Content 2</h1>
            </Content>

          </Card_Container>

          {/* 버튼 --------------------------*/}
          <div className='flex'>
            <p>녹화 하러 가기 </p>
            {/* 링크 */}
            {/* 라우팅 할 때 , zustand 현재 state도 보내버려 */}
            <Link href={{
              pathname: '/recording_tf',
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