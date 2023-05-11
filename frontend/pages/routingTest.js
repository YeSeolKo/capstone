import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import Ch_test from '../components/3D/Ch_test'; //Ch_test
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PropertyBinding } from 'three';
import CharacterV4 from '../components/3D/CharacterV4';
import BackGround from '../components/home/BackGround';
import{useEffect} from 'react';
//css
import tw from 'tailwind-styled-components';
import Card from '../components/home/Card';
import Card_col from '../components/home/Card_col';
//R3F확장
import { Text } from '@react-three/drei';



// ─── css  ───────────────────────────────────────────────────────────────────────
//배경색
const SkyBackground = tw.div`
  relative py-10 bg-gradient-to-br from-sky-50 to-gray-200
`;
//가운데정렬
const Container = tw.div`
  relative container m-auto px-6  md:px-12 xl:px-40
`;
//



// ─────────────────────────────────────────────────────────────────────────────




export default function RoutingTest() {


  //const router = useRouter();
  //const data = JSON.parse(router.query.data);
  //변수
  //class_list=['가르마','기타남자스타일','기타레이어드',
//   '기타여자스타일','남자일반숏','댄디','루프','리젠트','리프',
//   '미스티','바디','베이비','보니','보브','빌드','소프트투블럭댄디',
// '숏단발','쉐도우','쉼표','스핀스왈로','시스루댄디','애즈','에어','여자일반숏',
// '원랭스','원블럭댄디','테슬','포마드','플리츠','허쉬','히피']

  // const h_mesh='hair';
  // const f_mesh ='face';
  // const scale=3;
  

  //json 가져온 데이터 변수 설정


  const json= '{"face":"face","hair":"가르마","glasses":"on"}';

  const data= JSON.parse(json);
  const hair_type=data.hair;
  const face_type=data.face;
  const glasses_type=data.glasses; //true,false

  

  //조건문
  // if hair=''이면, A_component를 보여주고,..
  // let ComponentToRender;
  // switch (){
  //   case 'h_mesh':

  // }




  return (
    <>
      <Seo title='routingTest' />






      {/** -----------------------------------------------------*/}

    

      {/**만약 안경을 끼고 있다면? ->안경ok, 아니면 null(보여지지않음)*/}
      {/* 안경이 없는데 추후에 안경을 끼우고싶거나, 바꾸고 싶은 경우? */}
      <div>{glasses_type === true ? <h1>안경 ok</h1>:null }</div>

      
      
     <SkyBackground>
       {/* 분석결과 */}
       <Container>
         <p className='font-gmarket'>분석 결과</p>
         <Card_col>
           <p className='font-gmarket text-gray-500'>안경:</p>
           <p className='font-gmarket underline decoration-sky-500'>{glasses_type}</p>
           <p className='font-gmarket text-gray-500'>얼굴형 :</p>
           <p className='font-gmarket underline decoration-sky-500'>{face_type}</p>
           <p className='font-gmarket text-gray-500'>헤어 스타일 :</p>
           <p className='font-gmarket underline decoration-sky-500'>{hair_type}</p>
         </Card_col>


        {/* 캐릭터 */}
         <Card>
           <Canvas className='bg-white'>
            <ambientLight intensity={1} />
            <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            <Text position={[0, 1, 0]} fontSize={3}> Hello World</Text>
            {/* 안경 */}
            <CharacterV4 meshName='glasses_1'/>
            {/* 헤어 */}
            {/* <CharacterV4 meshName='C'/>
            <CharacterV4 meshName='D'/> */}
            {/* 얼굴 */}
            <CharacterV4 meshName='face01'/>

            <OrbitControls/> {/*3D 모델 축 회전 관련*/}
            {/* 3D 모델 = 하나의 mesh 임 !! */}
            {/* 얼굴 */}
            {/* <>{glass_type === true ? <Ch_test meshName={face_type}/> : null }</> */}
            {/* 헤어 */}
            {/* <Ch_test meshName={h_mesh} scale={scale}/> */}
    {/*         
            <OrbitControls/> 3D 모델 회전 */}
          </Canvas>
         </Card>
       </Container>
     </SkyBackground>


    </>
  );
}
