import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import Ch_test from '../components/3D/Ch_test'; //Ch_test

import { OrbitControls } from '@react-three/drei';
import { PropertyBinding } from 'three';
import CharacterV4 from '../components/3D/CharacterV4';
import BackGround from '../components/home/BackGround';
import{useEffect} from 'react';
//next,react
import Link from 'next/link';
//css
import tw from 'tailwind-styled-components';
//R3F
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import react from 'react';
//
import useStore from '../components/zustand_store/store';
import Character_All from '../components/3D/Character_All';
import webcam from 'react-webcam';


//함수형 컴폰너트
function Plane(){
    const webcamTexture=webcamRef.current.video;

    // useFrame(()=>{
    //     mask
    // })
    return (
        <>
        <mesh position={[0,0,0]}>
        {/* 가로6,세로4.5,높이0.1인 크기의 박스 생성 ??*/}
        <boxBufferGeometry args={[1,1,1]}/>
        {/* <meshBasicMaterial alphaMap={maskCanvas} transparent></meshBasicMaterial> */}
        <videoTexture
            attach="map"
            args={[webcamTexture]}
            minFilter={THREE.LinearFilter} // any effect?
            magFilter={THREE.LinearFilter} // any effect?
            format={THREE.RGBFormat} // any effect?
            />
        {/* </mesh></meshBasicMaterial> */}
        </mesh>
        </>
        );
}




export  default function Recording(){
    const {glasses_state,setGlasses_state}=useStore();
    const {face_state,setFace_state}=useStore();
    console.log(glasses_state);
    console.log(face_state);

    //타입 전부 가져옴


    return(
    <>
    <h1>레코딩</h1>

    {/* 웹캠  */}

 
    <Canvas className=''>
            <ambientLight intensity={1} />
            <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
            <Plane/>
            {/* 캐릭터------------- */}
            {/* 얼굴 */}
            {/* <Suspense fallback={<Loading/>}> */}
            
                {/* 안경유무 - 있으면 안경 렌더링, 없으면null*/}
                {glasses_state=='o'?(<Character_All meshName='glasses_1'/>):null}
                 {/* 얼굴 */} 
                <Character_All meshName='face02'/>
            <OrbitControls/> {/*3D 모델 축 회전 관련*/}
            {/* </Suspense> */}
        </Canvas>
    </>

    );
}