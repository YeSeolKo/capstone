

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function characterv5(props) {
  const { nodes: nodes_v5, materials:materials } = useGLTF('/characterv5.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes_v5.blue_eye.geometry} material={materials['chibi_template_2_eyes.002']} position={[0.39, 0.42, 0.62]} scale={0.06} />
      <mesh geometry={nodes_v5.blue_eye001.geometry} material={materials.chibi_template_2_eyes} position={[23.31, 15.82, 2.08]} scale={0.99} />
      <mesh geometry={nodes_v5.brown_eye_right.geometry} material={materials['chibi_template_1_eyes.001']} position={[0.08, -1.24, 0.23]} scale={0.06} />
      <mesh geometry={nodes_v5.brown_eye_right001.geometry} material={materials['chibi_template_1_eyes.002']} position={[-0.51, -1.1, 0.27]} scale={0.05} />
      {/* 얼굴 */}
      <mesh geometry={nodes_v5.face_02.geometry} material={materials['Material_3.001']} rotation={[0.07, 0, 0]} scale={1.96}>
        <group position={[0.01, 0.05, 0.01]} rotation={[-0.07, 0, 0]} scale={[0.52, 0.51, 0.51]}>
          <mesh geometry={nodes_v5.ear_01001.geometry} material={materials.ear} position={[-0.7, 0.31, 0.14]} rotation={[-3.1, 0, -0.02]} scale={-0.44} />
          <mesh geometry={nodes_v5.ear_01002.geometry} material={materials.ear} position={[0.7, 0.31, 0.14]} rotation={[0.04, 0, -0.02]} scale={0.44} />
        </group>
      </mesh>
      <group rotation={[1.67, 0, 0]} scale={0.23}>
        <mesh geometry={nodes_v5.Sphere002.geometry} material={materials['eye-inner']} />
        <mesh geometry={nodes_v5.Sphere002_1.geometry} material={materials.pupil} />
      </group>
      <mesh geometry={nodes_v5['eye-outer'].geometry} material={materials['eye-outer']} rotation={[1.67, 0, 0]} scale={0.23} />
      <mesh geometry={nodes_v5.eyebrows.geometry} material={materials.eyebrows} />
      <mesh geometry={nodes_v5.lashes.geometry} material={materials.eyebrows} />
      <mesh geometry={nodes_v5.속눈썹001.geometry} material={materials['lashes.001']} position={[0, -0.04, 3.1]} />
      <group position={[0, -0.25, 0.44]} rotation={[1.79, 0, 0]} scale={0.3}>
        <mesh geometry={nodes_v5['eye-inner001'].geometry} material={materials['eye-inner.002']} />
        <mesh geometry={nodes_v5['eye-inner001_1'].geometry} material={materials['pupil.002']} />
      </group>
      <mesh geometry={nodes_v5['eye-outer002'].geometry} material={materials['eye-outer.002']} position={[0, -0.33, 0.49]} rotation={[1.79, 0, 0]} scale={0.18} />
    </group>
  );
}

