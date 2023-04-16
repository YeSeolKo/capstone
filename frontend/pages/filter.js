import Seo from '../components/Seo';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import {Canvas} from '@react-three/fiber';
import BackCard from '../components/home/BackCard';
import Character from '../components/3D/Character';
import Items from '../components/home/Items';
import Picker from '../components/3D/Picker';
import { OrbitControls } from '@react-three/drei';



export  default function Filter(){
    return(
        <>
        <Seo title='Filter'></Seo>

        <BackCard>
         {/* height:100vh,width:100vh(뷰포트) */}
         {/*canvas 크기 반응형 적용 ok */}
        <Canvas className='bg-white '>
          <ambientLight intensity={1}/>
          <spotLight intensity={0.5} angle={0.1} penumbra={1}
            position={[10,15,10]} castShadow/>
            
            {/*3D 모델*/}
            {/*colorpicker로 받은 3d모델을 사용 -> state관리*/}
            {/*3d 얼굴 좌표 찍어서 좌우 움직일것*/}
            <Character scale={2}/>
            <OrbitControls/> {/*3D 모델 축 회전 관련*/}
        </Canvas>

        
        
        </BackCard>
        </>
    );
}