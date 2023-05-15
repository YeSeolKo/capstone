//react,next
import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import Link from'next/link';
import { useState,useEffect,Suspense } from 'react';

import { OrbitControls } from '@react-three/drei';
import { PropertyBinding } from 'three';
//컴포넌트
// import Loading from '../components/3D/Loading';
import Character_All from '../components/3D/Character_All';
import Lights from '../components/3D/Lights';
import { Canvas,useLoader } from '@react-three/fiber';

export default function CharacterTesting(){
    return (
        <>
        <Canvas style={{ width: '600px' ,height:'600px'}} >
            <Lights/>
            <mesh>
                <Character_All meshName='face02'/>
                <Character_All meshName='glasses_1'/>
                <Character_All meshName='eye_1'/>
                <Character_All meshName='eyeline'/>
                <Character_All meshName='md_hair'/>
                {/* <Character_All meshName='pixelglasses'/> */}
                {/* <Character_All meshName='B'/>
                <Character_All meshName='C'/> */}
                <OrbitControls/>
            </mesh>
        </Canvas>
        </>
    );
}