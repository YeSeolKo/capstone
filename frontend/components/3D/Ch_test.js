import React, { useRef,useState } from 'react';
import { useGLTF,OrbitControls,ContactShadows,Environment } from '@react-three/drei';
import {proxy,useSnapshot} from 'valtio';
import { state } from '../store/state';


export default function Ch_test(props) {
  const group = useRef();
  const snap = useSnapshot(state); // 상태관리
  const { nodes, materials } = useGLTF('/characterv3.glb');
  const [hover, set] = useState(null);

  // Render only the desired mesh based on the meshName prop
  let mesh;
  switch (props.meshName) {
    case 'hair':
      mesh = (
        <mesh
          name="hair"
          geometry={nodes.backhair.geometry}
          material={materials['Material_1.001']}
          material-color={snap.items.hair}
          position={[-0.08, 0.57, -0.24]}
          rotation={[1.42, 0.62, -1.31]}
          scale={[1.59, 1.65, 1.62]}
        />
      );
      break;
    case 'face':
      mesh = (
        <mesh
          name="face01"
          geometry={nodes.face01.geometry}
          material={materials['Material_3.001']}
          material-color={snap.items.face01}
          morphTargetDictionary={nodes.face01.morphTargetDictionary}
          morphTargetInfluences={nodes.face01.morphTargetInfluences}
          position={[-0.09, -0.09, -0.03]}
          rotation={[0.07, 0, 0]}
          scale={1.96}
        >
          <group
            position={[0.01, 0.05, 0.01]}
            rotation={[-0.07, 0, 0]}
            scale={[0.52, 0.51, 0.51]}
          >
            <mesh
              geometry={nodes.ear_01001.geometry}
              material={materials.Material_4}
              material-color={snap.items.face01}
              position={[-0.7, 0.31, 0.14]}
              rotation={[-3.1, 0, -0.02]}
              scale={-0.44}
            />
            <mesh
              geometry={nodes.ear_01002.geometry}
              material={materials.Material_4}
              material-color={snap.items.face01}
              position={[0.7, 0.31, 0.14]}
              rotation={[0.04, 0, -0.02]}
              scale={0.44}
            />
          </group>
        </mesh>
      );
      break;
    default:
      mesh = null;
  }

  return (
    <group ref={group} dispose={null}>
      {mesh}
    </group>
  );
}









// export default function Ch_test(props) {
//   const group=useRef()
//   const snap=useSnapshot(state) //상태관리 
//   const { nodes, materials } = useGLTF('/characterv3.glb') 
//   const [hover,set]=useState(null)

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <mesh name='hair' geometry={nodes.backhair.geometry} material={materials['Material_1.001']} material-color={snap.items.hair} position={[-0.08, 0.57, -0.24]} rotation={[1.42, 0.62, -1.31]} scale={[1.59, 1.65, 1.62]} />
//       <mesh name='hair' geometry={nodes.bang.geometry} material={materials['Material_2.001']} material-color={snap.items.hair} position={[0.26, 0.71, 0.6]} rotation={[-0.17, 0.12, -1.21]} />
//       {/* 얼굴 */}
//       <mesh name='face01' geometry={nodes.face01.geometry} material={materials['Material_3.001']} material-color={snap.items.face01} morphTargetDictionary={nodes.face01.morphTargetDictionary} morphTargetInfluences={nodes.face01.morphTargetInfluences} position={[-0.09, -0.09, -0.03]} rotation={[0.07, 0, 0]} scale={1.96}>
//         {/*group으로 관리-귀 */}
//         <group position={[0.01, 0.05, 0.01]} rotation={[-0.07, 0, 0]} scale={[0.52, 0.51, 0.51]}>
//           <mesh geometry={nodes.ear_01001.geometry} material={materials.Material_4} material-color={snap.items.face01} position={[-0.7, 0.31, 0.14]} rotation={[-3.1, 0, -0.02]} scale={-0.44} />
//           <mesh geometry={nodes.ear_01002.geometry} material={materials.Material_4} material-color={snap.items.face01} position={[0.7, 0.31, 0.14]} rotation={[0.04, 0, -0.02]} scale={0.44} />
//         </group>
//       </mesh>
//     </group>
//   );
// }

