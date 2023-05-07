import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function CharacterV4(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF('/characterv4.glb') 
    //조건 case 작성 !------------
    let mesh;
    switch (props.meshName) {
        //픽셀 선글라스
        case 'pixelglasses':
        mesh = (
            <group
            name="pixelglasses"
            position={[-3.09, 0.35, 0.79]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.01}
            >
            <group rotation={[Math.PI / 2, 0, 0]}>
                <mesh geometry={nodes.black_mesh_black_0.geometry} material={materials.black} />
                <mesh geometry={nodes.white_mesh_white_0.geometry} material={materials.white} />
            </group>
            </group>
        );
        break;

        //뿔테안경????
        case 'A':
            mesh=(
            <group name='A' position={[-3.11, -0.17, 0.95]} rotation={[-Math.PI / 2, 0, -1.55]} scale={0.11}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes.dushka_1_kr_1_metal_0.geometry} material={materials.metal} />
                <mesh geometry={nodes.dushka_1_kr_2_metal_0.geometry} material={materials.metal} />
                <mesh geometry={nodes.dushka_1_kr_3_metal_0.geometry} material={materials.metal} />
                <mesh geometry={nodes.dushka_1_kr_4_metal_0.geometry} material={materials.metal} />
                <mesh geometry={nodes.dushka_1vint_metal_2_0.geometry} material={materials.metal_2} />
                <mesh geometry={nodes.dushka_1_plastik_0.geometry} material={materials.plastik} />
                <mesh geometry={nodes.dushka_2_kr_1_metal_0.geometry} material={materials.metal} />
                <mesh geometry={nodes.dushka_2_kr_2_metal_0.geometry} material={materials.metal} />
                <mesh geometry={nodes.dushka_2_kr_3_metal_0.geometry} material={materials.metal} />
                <mesh geometry={nodes.dushka_2_kr_4_metal_0.geometry} material={materials.metal} />
                <mesh geometry={nodes.dushka_2_vint_metal_2_0.geometry} material={materials.metal_2} />
                <mesh geometry={nodes.dushka_2_plastik_0.geometry} material={materials.plastik} />
                <mesh geometry={nodes.glass_glass_0.geometry} material={materials.glass} />
                <mesh geometry={nodes.hrom_1_hrom_0.geometry} material={materials.hrom} />
                <mesh geometry={nodes.hrom_2__0.geometry} material={materials.hrom_2__0} />
                <mesh geometry={nodes.Text__0.geometry} material={materials.hrom_2__0} />
                <mesh geometry={nodes.main_plastik_0.geometry} material={materials.plastik} />
              </group>
            </group>
          </group>
              
            )

            


        default:
        mesh = null;
    }

//   return (
//       <group ref={group} dispose={null}>
//           {mesh}
//       </group>
//   );
// }



  return (
    <group {...props} dispose={null}>
            
        {/**픽셀 선글라스 */}
       <group position={[-3.09, 0.35, 0.79]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh  geometry={nodes.black_mesh_black_0.geometry} material={materials.black} />
          <mesh geometry={nodes.white_mesh_white_0.geometry} material={materials.white} />
        </group>
      </group>

      {/* 뿔테안경------------------------------------------------- */}

      <group position={[-3.11, -0.17, 0.95]} rotation={[-Math.PI / 2, 0, -1.55]} scale={0.11}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.dushka_1_kr_1_metal_0.geometry} material={materials.metal} />
            <mesh geometry={nodes.dushka_1_kr_2_metal_0.geometry} material={materials.metal} />
            <mesh geometry={nodes.dushka_1_kr_3_metal_0.geometry} material={materials.metal} />
            <mesh geometry={nodes.dushka_1_kr_4_metal_0.geometry} material={materials.metal} />
            <mesh geometry={nodes.dushka_1vint_metal_2_0.geometry} material={materials.metal_2} />
            <mesh geometry={nodes.dushka_1_plastik_0.geometry} material={materials.plastik} />
            <mesh geometry={nodes.dushka_2_kr_1_metal_0.geometry} material={materials.metal} />
            <mesh geometry={nodes.dushka_2_kr_2_metal_0.geometry} material={materials.metal} />
            <mesh geometry={nodes.dushka_2_kr_3_metal_0.geometry} material={materials.metal} />
            <mesh geometry={nodes.dushka_2_kr_4_metal_0.geometry} material={materials.metal} />
            <mesh geometry={nodes.dushka_2_vint_metal_2_0.geometry} material={materials.metal_2} />
            <mesh geometry={nodes.dushka_2_plastik_0.geometry} material={materials.plastik} />
            <mesh geometry={nodes.glass_glass_0.geometry} material={materials.glass} />
            <mesh geometry={nodes.hrom_1_hrom_0.geometry} material={materials.hrom} />
            <mesh geometry={nodes.hrom_2__0.geometry} material={materials.hrom_2__0} />
            <mesh geometry={nodes.Text__0.geometry} material={materials.hrom_2__0} />
            <mesh geometry={nodes.main_plastik_0.geometry} material={materials.plastik} />
          </group>
        </group>
      </group>

    {/* A */}
      <group position={[-4.57, -1.42, -0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={0.52}>
        <group position={[0.11, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[0, Math.PI / 2, 0]} scale={[1.33, 0.85, 0.85]}>
            <mesh geometry={nodes.Object_4.geometry} material={materials.Hair2} />
          </group>
          <group rotation={[1.52, 0, 0]} scale={[11.24, 13.18, 13.32]}>
            <mesh geometry={nodes.Object_6.geometry} material={materials.Hair2} position={[0, 0, 0]} scale={0.98} />
          </group>
          <group rotation={[0, 0, -Math.PI / 2]}>
            <mesh geometry={nodes.Object_8.geometry} material={materials.Hair2} />
          </group>
        </group>
      </group>

    {/* B */}
      <group position={[-4.59, -1.68, -0.07]} rotation={[1.52, 0, 0]} scale={[6.42, 7.53, 7.61]}>
        <mesh geometry={nodes.Object_6001.geometry} material={materials['Hair2.001']} position={[0.05, 0.02, -0.04]} rotation={[-0.01, 0.06, -0.01]} scale={0.84} />
      </group>

      {/* C */}
      <mesh geometry={nodes.backhair.geometry} material={materials['Material_1.001']} position={[-0.08, 0.57, -0.24]} rotation={[1.42, 0.62, -1.31]} scale={[1.59, 1.65, 1.62]} />
      {/* D */}
      <mesh geometry={nodes.bang.geometry} material={materials['Material_2.001']} position={[0.26, 0.71, 0.6]} rotation={[-0.17, 0.12, -1.21]} />
     
     {/* E glasses_1*/}
      <group position={[-3.05, 0.21, 0.32]} rotation={[-Math.PI, 1.52, -Math.PI]} scale={0.08}>
        <mesh geometry={nodes.a_A06.geometry} material={materials.daz__A06} />
        <mesh geometry={nodes.a_A06_1.geometry} material={materials.daz__B05} />
        <mesh geometry={nodes.a_A06_2.geometry} material={materials.daz__E04} />
        <mesh geometry={nodes.a_A06_3.geometry} material={materials.daz__E08} />
        <mesh geometry={nodes.a_A06_4.geometry} material={materials.daz__F05} />
        <mesh geometry={nodes.a_A06_5.geometry} material={materials.daz__I05} />
      </group>

      {/* F */}
      <mesh geometry={nodes.hair_01_garma.geometry} material={materials.Hair} position={[-3.13, -0.44, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={9.43} />
      {/* G */}
      <mesh geometry={nodes.hair_02_ex_male.geometry} material={materials['hair-cards.001']} position={[-3.04, 0.83, -0.15]} rotation={[-2.63, 0.27, 1.34]} scale={1.25} />
      {/* H */}
      <mesh geometry={nodes.hair_03_ex_layered.geometry} material={materials['Default_OBJ.020']} position={[-3.01, -0.35, -0.21]} rotation={[Math.PI, -1.5, Math.PI]} scale={0.1} />
      {/* I */}
      <group position={[-3.05, 0.9, 0.16]} rotation={[-0.17, 0.13, -0.03]} scale={0.07}>
        <mesh geometry={nodes.Hair_Hair1_0001.geometry} material={materials['Hair1.001']} />
        <mesh geometry={nodes.Hair_Hair1_0001_1.geometry} material={materials['Hair2.003']} />
      </group>

      {/* J */}
      <mesh geometry={nodes.hair_09_leaf.geometry} material={materials['material_0.003']} position={[-3.14, 0.01, -0.35]} rotation={[-1.45, 0, 0]} scale={1.01} />
      {/* K */}
      <group position={[-1.98, -11.41, 0.23]} scale={6.54}>
        <mesh geometry={nodes.Front_parts4_Front_parts4_0001.geometry} material={materials['Front_parts4.001']} />
        <mesh geometry={nodes.Front_parts4_Front_parts4_0001_1.geometry} material={materials['Front_parts13_155.001']} />
        <mesh geometry={nodes.Front_parts4_Front_parts4_0001_2.geometry} material={materials['Front_parts14_09.001']} />
      </group>

    {/* L */}
      <mesh geometry={nodes.hair_13_bony.geometry} material={materials['Default_OBJ.001']} position={[-3.1, 0.02, -0.18]} rotation={[Math.PI, -1.4, Math.PI]} scale={0.12} />
      {/* M */}
      <mesh geometry={nodes.hair_15_build.geometry} material={materials['Default_OBJ.022']} position={[-3.03, -0.33, -0.44]} rotation={[Math.PI, -1.53, Math.PI]} scale={0.09} />
      {/* N */}
      <mesh geometry={nodes.hair_20_spin_swallow.geometry} material={materials['material_0.001']} position={[-3.09, 0.75, -0.21]} rotation={[-1.72, 0, 0]} scale={7.48} />
      {/* O */}
      <mesh geometry={nodes.long_ddong.geometry} material={materials['Default_OBJ.021']} position={[-3.16, 0.24, -0.36]} rotation={[Math.PI, -1.49, Math.PI]} scale={0.1} />
      {/* P */}
      <mesh geometry={nodes.Object_2003.geometry} material={materials['material_0.005']} position={[-3.04, 0.62, -0.15]} rotation={[-1.93, 0.02, -0.2]} scale={7.66} />
      {/* Q */}
      <group position={[-2.73, 0.63, 0.79]} rotation={[0.15, 0.12, -1.14]}>
        <mesh geometry={nodes.Tube_3001.geometry} material={materials['Material_2.002']} />
        <mesh geometry={nodes.Tube_3001_1.geometry} material={materials['Front_parts13_214.001']} />
      </group>
    {/* R */}
      <group position={[-3.13, 0.9, 0]} rotation={[-0.26, 0, 0.02]} scale={0.07}>
        <mesh geometry={nodes.Hair_Material002_0003.geometry} material={materials['Material.019']} />
        <mesh geometry={nodes.Hair_Material002_0003_1.geometry} material={materials['Material.018']} />
        <mesh geometry={nodes.Hair_Material002_0003_2.geometry} material={materials['Material.017']} />
        <mesh geometry={nodes.Hair_Material002_0003_3.geometry} material={materials['Material.016']} />
      </group>


      <mesh name="face01" geometry={nodes.face01.geometry} material={materials['Material_3.001']} morphTargetDictionary={nodes.face01.morphTargetDictionary} morphTargetInfluences={nodes.face01.morphTargetInfluences} position={[-3.09, -0.09, -0.03]} rotation={[0.07, 0, 0]} scale={1.96}>
        <group position={[0.01, 0.05, 0.01]} rotation={[-0.07, 0, 0]} scale={[0.52, 0.51, 0.51]}>
          <mesh geometry={nodes.ear_01001.geometry} material={materials.Material_4} position={[-0.7, 0.31, 0.14]} rotation={[-3.1, 0, -0.02]} scale={-0.44} />
          <mesh geometry={nodes.ear_01002.geometry} material={materials.Material_4} position={[0.7, 0.31, 0.14]} rotation={[0.04, 0, -0.02]} scale={0.44} />
        </group>
      </mesh>


    </group>
  );
}

