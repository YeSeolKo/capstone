import {Canvas} from '@react-three/fiber';
import { useRef,useState } from 'react';
import { useGLTF,OrbitControls,ContactShadows,Environment } from '@react-three/drei';
//import {proxy,useSnapshot} from 'valtio';
//import { state } from '../store/state';


const Character=(props)=> {
    const group=useRef(); 
    const { nodes, materials } = useGLTF('/characterv3.glb') 
  
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh name='hair' geometry={nodes.backhair.geometry} material={materials['Material_1.001']}  position={[-0.08, 0.57, -0.24]} rotation={[1.42, 0.62, -1.31]} scale={[1.59, 1.65, 1.62]} />
        <mesh name='hair' geometry={nodes.bang.geometry} material={materials['Material_2.001']} position={[0.26, 0.71, 0.6]} rotation={[-0.17, 0.12, -1.21]} />
        <mesh name='face01' geometry={nodes.face01.geometry} material={materials['Material_3.001']} morphTargetDictionary={nodes.face01.morphTargetDictionary} morphTargetInfluences={nodes.face01.morphTargetInfluences} position={[-0.09, -0.09, -0.03]} rotation={[0.07, 0, 0]} scale={1.96}>
          {/*group으로 관리 */}
          <group position={[0.01, 0.05, 0.01]} rotation={[-0.07, 0, 0]} scale={[0.52, 0.51, 0.51]}>
            <mesh geometry={nodes.ear_01001.geometry} material={materials.Material_4}  position={[-0.7, 0.31, 0.14]} rotation={[-3.1, 0, -0.02]} scale={-0.44} />
            <mesh geometry={nodes.ear_01002.geometry} material={materials.Material_4}  position={[0.7, 0.31, 0.14]} rotation={[0.04, 0, -0.02]} scale={0.44} />
          </group>
        </mesh>
      </group>
    );
  }
  


export default function TF_3DFace(){
    
    return(
        <>
        <Canvas>
            <ambientLight intensity={0.5}/>
            <spotLight position={[10,15,10]} angle={0.3}/>
            <Character/>
        </Canvas>
        </>
    );

}





