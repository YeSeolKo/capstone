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

//zustand
import useStore from '../components/zustand_store/store';

//함수
import hairMeshMatching from '../components/function/hairMeshMatching';

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


//Tab
const Tab_Container = tw.div` w-full p-4 bg-white border border-gray-200 rounded-xl shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700`;
const Card_ul=tw.ul`my-4 space-y-3`;

//Tab 내부 텍스트
const Button=tw.button `text-xl font-bmjua my-4`;


//TAB
const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
`;

const Tab = styled.button`
  font-family: 'gmarket';
  font-size: large; 
  border: none;
  outline: none;
  cursor: pointer;
  width: 20%;
  position: relative;

  margin-right: 0.1em;
  /* font-size: 1em; */
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

    //zustand
    const {glasses_state,setGlasses_state}=useStore();
    const {face_state,setFace_state}=useStore();
    const {hair_state,setHair_state}=useStore();
    const {glasses_mesh_state,setGlassesMesh_state}=useStore();//안경
    const {hair_mesh_state,setHairMesh_state}=useStore();//헤어 메쉬 변환
    

    console.log('헤어 디폴트 state:',hair_state);

    //zustand 새로고침
    

  
    //메쉬 바꾸기
    //1)
    function GlassesButtonClick(e){
      const clicked=e.target.id;
      //기본 state바꿔야함? 
      
      console.log('버튼:',clicked);
      setGlassesMesh_state(clicked);
    };

    //2)
    //NOTE - 메쉬 바뀔때마다 rerendering 되고 있음.... 
    function ButtonClick(e){
      const clicked=e.target.id; //
     
      setHair_state(clicked);
      console.log('버튼:',clicked);
      setHairMesh_state(clicked);
    };

  





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
        <div className='rounded-3xl bg-white shadow-lg lg:w-1/2 w-full border-4 lg:h-auto h-64 object-cover object-center rounded'>
          <Canvas >
            <ambientLight intensity={1} />
            <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            

            {/* 캐릭터------------- */}
            {/* 얼굴 */}
            {/* <Suspense fallback={<Loading/>}> */}
            <mesh>
              {/* 안경 */}
              {/* //FIXME - 안경메쉬 처음에? */}
              <Character_All meshName={glasses_mesh_state}/>
              {/* 얼굴 */}
              <Character_All meshName='face02'/>
              {/* 헤어 */}
              <Character_All meshName={hair_mesh_state}/>
            </mesh>
            <OrbitControls/> {/*3D 모델 축 회전 관련*/}
            {/* </Suspense> */}

        </Canvas>
        </div>

        {/* <Image alt='ecommerce' src='https://dummyimage.com/400x400'/> */}
        {/* 캔버스------------------------- */}

        {/* 왼쪽 ---------------------------*/}
        <Description>
          {/* 탭메뉴  */}
          <Tab_Container>
            {/* 탭메뉴 가져오기 */}
            <Tabs>
              <Tab onClick={handleClick} active={active === 0} id={0}>안경</Tab>
              <Tab onClick={handleClick} active={active === 1} id={1}>헤어</Tab>
              <Tab onClick={handleClick} active={active === 2} id={2}>눈</Tab>
            </Tabs>

            {/* NOTE 안경 */}
            <Content active={active === 0}>
            <div className="p-4 border-2 grid grid-cols-4 gap-">
              <Button id="NONE" onClick={GlassesButtonClick}> None</Button>
              <Button id="기본안경" onClick={GlassesButtonClick}>기본 안경</Button>
              <Button id="뿔테안경" onClick={GlassesButtonClick}>뿔테 안경</Button>
              {/* //FIXME - 뿔테안경 눌렀다가 픽셀 선글라스 누르면 안보임 */}
              <Button id="픽셀선글라스" onClick={GlassesButtonClick}>픽셀 선글라스</Button>
            </div>
          </Content>

            {/* NOTE 헤어 */}
            <Content active={active === 1}>
              <div className="p-4 border-2 grid grid-cols-4 gap-">
                <Button id="가르마" onClick={ButtonClick}>가르마</Button>
                <Button id="기타남자스타일" onClick={ButtonClick}>기타 남자스타일</Button>
                <Button id="기타레이어드" onClick={ButtonClick}>기타 레이어드</Button>
                <Button id="남자일반숏" onClick={ButtonClick}>남자일반숏</Button>
                <Button id="댄디" onClick={ButtonClick}>댄디</Button>
                <Button id="루프" onClick={ButtonClick}>루프</Button>
                <Button id="리젠트" onClick={ButtonClick}>리젠트</Button>
                <Button id="리프" onClick={ButtonClick}>리프</Button>
                <Button id="미스티" onClick={ButtonClick}>미스티</Button>
                <Button id="바디" onClick={ButtonClick}>바디</Button>
                <Button id="베이비" onClick={ButtonClick}>베이비</Button>
                <Button id="보니" onClick={ButtonClick}>보니</Button>
                <Button id="보브" onClick={ButtonClick}>보브</Button>
                <Button id="빌드" onClick={ButtonClick}>빌드</Button>
                <Button id="소프트투블럭댄디" onClick={ButtonClick}>소프트투블럭댄디</Button>
                <Button id="숏단발" onClick={ButtonClick}>숏단발</Button>
                <Button id="쉐도우" onClick={ButtonClick}>쉐도우</Button>
                <Button id="쉼표" onClick={ButtonClick}>쉼표</Button>
                <Button id="스핀스왈로" onClick={ButtonClick}>스핀스왈로</Button>
                <Button id="애즈" onClick={ButtonClick}>애즈</Button>
                <Button id="에어" onClick={ButtonClick}>에어</Button>
                <Button id="여자일반숏" onClick={ButtonClick}>여자일반숏</Button>
                <Button id="원랭스" onClick={ButtonClick}>원랭스</Button>
                <Button id="원블럭댄디" onClick={ButtonClick}>원블럭댄디</Button>
                <Button id="테슬" onClick={ButtonClick}>테슬</Button>
                <Button id="포마드" onClick={ButtonClick}>포마드</Button>
                <Button id="플리츠" onClick={ButtonClick}>플리츠</Button>
                <Button id="허쉬" onClick={ButtonClick}>허쉬</Button>
                <Button id="히피" onClick={ButtonClick}>히피</Button>
                <Button id="똥머리" onClick={ButtonClick}>똥머리</Button>
                <Button id="hair_EX_male" onClick={ButtonClick}>hair_EX_male</Button>
              </div>
            </Content>

          </Tab_Container>

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