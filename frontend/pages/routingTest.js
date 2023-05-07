import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import Ch_test from '../components/3D/Ch_test'; //Ch_test
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PropertyBinding } from 'three';
import CharacterV4 from '../components/3D/CharacterV4';
import BackCard from '../components/home/BackCard';


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


  const json= '{"face":"face","hair":"가르마","glasses":true}';

  const data= JSON.parse(json);
  const hair_type=data.hair;
  const face_type=data.face;
  const glass_type=data.glasses; //true,false 

  

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

      <h1>{hair_type}</h1>
      <h1>얼굴형:{face_type}</h1>
      <h1>머리스타일:{hair_type}</h1>

      {/**만약 안경을 끼고 있다면? ->안경ok, 아니면 null(보여지지않음)*/}
      {/* 안경이 없는데 추후에 안경을 끼우고싶거나, 바꾸고 싶은 경우? */}
      <div>{glass_type === true ? <h1>안경 ok</h1>:null }</div>

      
      <BackCard>
      <Canvas className='bg-white'>
        <ambientLight intensity={1} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />


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
      </BackCard>
    </>
  );
}
