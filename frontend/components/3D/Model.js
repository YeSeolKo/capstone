import React, { useRef,useEffect } from 'react'
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'
import { useState } from 'react/cjs/react.production.min';


export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF('/characterv3.glb') 


  useEffect(() => {
    // 캐릭터의 초기 위치 설정
    group.current.position.y = -1;
  }, []);

  useFrame(() => {
    // 캐릭터의 위치 업데이트
    // group.current.position.x = props.position[0];
    // group.current.position.y = props.position[1];
    // group.current.position.z = props.position[2];
    // console.log(group.current.position.x)
    group.current.position.set(props.position[0], props.position[1], props.position[2]);
    console.log(group.current.position.x)
    console.log(group.current.position.y)
  });

  return (
    <group ref={group}>
      <mesh
        geometry={nodes.backhair.geometry}
        material={materials['Material.001']}
        scale={[1.59, 1.65, 1.62]}
        //position={[1,2,1]}
        //rotation={[1.42, 0.62, -1.31]}
        castShadow
        receiveShadow
      />
    </group>
  );
}




