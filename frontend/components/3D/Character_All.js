import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Character_All(props) {
    const group = useRef();
    const { nodes: nodes_v4, materials: materials_v4 } = useGLTF('/characterv4.glb');
    
    //characterV5
    const { nodes: nodes_v5, materials:materials_v5 } = useGLTF('/characterv5.glb')

    
    //조건 case 작성 !------------
    let mesh;
    switch (props.meshName) {
        //NOTE - 픽셀 선글라스────────────────────────────────────────
        case 'pixelglasses':
            mesh = (
            <group name="pixelglasses" position={[-3.09, 0.35, 0.79]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <mesh geometry={nodes_v4.black_mesh_black_0.geometry} material={materials_v4.black} />
                    <mesh geometry={nodes_v4.white_mesh_white_0.geometry} material={materials_v4.white} />
                </group>
            </group>
            );
        break;
        
        //안경 (glasses_1)
          case 'glasses_1':
            mesh=(
                <group name='glasses_1' position={[0, 0.2, 0.3]} rotation={[-Math.PI, 1.52, -Math.PI]} scale={0.08}>
                <mesh geometry={nodes_v4.a_A06.geometry} material={materials_v4.daz__A06} />
                <mesh geometry={nodes_v4.a_A06_1.geometry} material={materials_v4.daz__B05} />
                <mesh geometry={nodes_v4.a_A06_2.geometry} material={materials_v4.daz__E04} />
                <mesh geometry={nodes_v4.a_A06_3.geometry} material={materials_v4.daz__E08} />
                <mesh geometry={nodes_v4.a_A06_4.geometry} material={materials_v4.daz__F05} />
                <mesh geometry={nodes_v4.a_A06_5.geometry} material={materials_v4.daz__I05} />
              </group>

            );
            break;

        //NOTE - 뿔테안경 ────────────────────────────────────────
        case 'glasses_2':
            mesh=(
            <group name='glasses_2' position={[-3.11, -0.17, 0.95]} rotation={[-Math.PI / 2, 0, -1.55]} scale={0.11}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh geometry={nodes_v4.dushka_1_kr_1_metal_0.geometry} material={materials_v4.metal} />
                <mesh geometry={nodes_v4.dushka_1_kr_2_metal_0.geometry} material={materials_v4.metal} />
                <mesh geometry={nodes_v4.dushka_1_kr_3_metal_0.geometry} material={materials_v4.metal} />
                <mesh geometry={nodes_v4.dushka_1_kr_4_metal_0.geometry} material={materials_v4.metal} />
                <mesh geometry={nodes_v4.dushka_1vint_metal_2_0.geometry} material={materials_v4.metal_2} />
                <mesh geometry={nodes_v4.dushka_1_plastik_0.geometry} material={materials_v4.plastik} />
                <mesh geometry={nodes_v4.dushka_2_kr_1_metal_0.geometry} material={materials_v4.metal} />
                <mesh geometry={nodes_v4.dushka_2_kr_2_metal_0.geometry} material={materials_v4.metal} />
                <mesh geometry={nodes_v4.dushka_2_kr_3_metal_0.geometry} material={materials_v4.metal} />
                <mesh geometry={nodes_v4.dushka_2_kr_4_metal_0.geometry} material={materials_v4.metal} />
                <mesh geometry={nodes_v4.dushka_2_vint_metal_2_0.geometry} material={materials_v4.metal_2} />
                <mesh geometry={nodes_v4.dushka_2_plastik_0.geometry} material={materials_v4.plastik} />
                <mesh geometry={nodes_v4.glass_glass_0.geometry} material={materials_v4.glass} />
                <mesh geometry={nodes_v4.hrom_1_hrom_0.geometry} material={materials_v4.hrom} />
                <mesh geometry={nodes_v4.hrom_2__0.geometry} material={materials_v4.hrom_2__0} />
                <mesh geometry={nodes_v4.Text__0.geometry} material={materials_v4.hrom_2__0} />
                <mesh geometry={nodes_v4.main_plastik_0.geometry} material={materials_v4.plastik} />
              </group>
            </group>
          </group>
            );
            break;
        
        //NOTE - ────────────────────────────────────────
        //hair_01_garma 가르마
        case 'hair_01_garma':
            mesh=(
                <mesh name='hair_01_garma' geometry={nodes_v4.hair_01_garma.geometry} material={materials_v4.Hair} position={[-3.13, -0.44, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={9.43} />
            );
            break;
        //hair_02_ex_male 기타남자스타일
        case 'hair_02_ex_male':
            mesh=(
                <mesh name='hair_02_ex_male' geometry={nodes_v4.hair_02_ex_male.geometry} material={materials_v4['hair-cards.001']} position={[-3.04, 0.83, -0.15]} rotation={[-2.63, 0.27, 1.34]} scale={1.25} />
            );
            break;
        //hair_03_ex_layered 기타레이어드 (여성) 
        case 'hair_03_ex_layered':
            mesh=(
                <mesh name='hair_03_ex_layered' geometry={nodes_v4.hair_03_ex_layered.geometry} material={materials_v4['Default_OBJ.020']} position={[-3.01, -0.35, -0.21]} rotation={[Math.PI, -1.5, Math.PI]} scale={0.1} />
            );
            break;

        //hair_06_dandy 댄디 (남성)
        case 'hair_06_dandy':
            mesh=(
                <group name='hair_06_dandy' position={[-3.05, 0.9, 0.16]} rotation={[-0.17, 0.13, -0.03]} scale={0.07}>
                    <mesh geometry={nodes_v4.Hair_Hair1_0001.geometry} material={materials_v4['Hair1.001']} />
                    <mesh geometry={nodes_v4.Hair_Hair1_0001_1.geometry} material={materials_v4['Hair2.003']} />
                </group>
            );
            break;
        //hair_09_leaf 리프(남성)
        case 'hair_09_leaf':
            mesh=(
                <mesh name='J' geometry={nodes_v4.hair_09_leaf.geometry} material={materials_v4['material_0.003']} position={[-3.14, 0.01, -0.35]} rotation={[-1.45, 0, 0]} scale={1.01} />
            );
            break;
        //hair_11_body 바디(여성)
        case 'hair_11_body':
            mesh=(
                <group name='hair_11_body' position={[-1.98, -11.41, 0.23]} scale={6.54}>
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001.geometry} material={materials_v4['Front_parts4.001']} />
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_1.geometry} material={materials_v4['Front_parts13_155.001']} />
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_2.geometry} material={materials_v4['Front_parts14_09.001']} />
              </group>
            );
            break;
        //hair_13_bony 보니(단발 앞머리) -> texture 
        case 'hair_13_bony':
            mesh=(
                <mesh name='hair_13_bony' geometry={nodes_v4.hair_13_bony.geometry} material={materials_v4['Default_OBJ.001']} position={[-3.1, 0.02, -0.18]} rotation={[Math.PI, -1.4, Math.PI]} scale={0.12} />
            );
            break;
        //hair_15_build
        case 'hair_15_build':
            mesh=(
                <mesh name='hair_15_build' geometry={nodes_v4.hair_15_build.geometry} material={materials_v4['Default_OBJ.022']} position={[-3.03, -0.33, -0.44]} rotation={[Math.PI, -1.53, Math.PI]} scale={0.09} />
            );
            break;
        //hair_20_spin_swallow
        case 'hair_20_spin_swallow':
            mesh=(
                <mesh name='hair_20_spin_swallow' geometry={nodes_v4.hair_20_spin_swallow.geometry} material={materials_v4['material_0.001']} position={[-3.09, 0.75, -0.21]} rotation={[-1.72, 0, 0]} scale={7.48} />
            );
            break;
        //hair_EX_long_ddong
        case 'hair_EX_long_ddong':
            mesh=(
                <mesh name='hair_EX_long_ddong' geometry={nodes_v4.long_ddong.geometry} material={materials_v4['Default_OBJ.021']} position={[-3.16, 0.24, -0.36]} rotation={[Math.PI, -1.49, Math.PI]} scale={0.1} />
            );
            break;
        //hair_EX_male
        case 'hair_EX_male':
            mesh=(
                <mesh name='hair_EX_male' geometry={nodes_v4.Object_2003.geometry} material={materials_v4['material_0.005']} position={[-3.04, 0.62, -0.15]} rotation={[-1.93, 0.02, -0.2]} scale={7.66} />
            );
            break;
        //hair_25_onelength
        case 'hair_25_onelength':
            mesh=(
                <group name='hair_25_onelength' position={[-2.73, 0.63, 0.79]} rotation={[0.15, 0.12, -1.14]}>
                    <mesh geometry={nodes_v4.Tube_3001.geometry} material={materials_v4['Material_2.002']} />
                    <mesh geometry={nodes_v4.Tube_3001_1.geometry} material={materials_v4['Front_parts13_214.001']} />
              </group>
            );
            break;
        //hair_21_dandy2
        case 'hair_21_dandy2':
            mesh=(
                <group name='hair_21_dandy2' position={[-3.13, 0.9, 0]} rotation={[-0.26, 0, 0.02]} scale={0.07}>
                    <mesh geometry={nodes_v4.Hair_Material002_0003.geometry} material={materials_v4['Material.019']} />
                    <mesh geometry={nodes_v4.Hair_Material002_0003_1.geometry} material={materials_v4['Material.018']} />
                    <mesh geometry={nodes_v4.Hair_Material002_0003_2.geometry} material={materials_v4['Material.017']} />
                    <mesh geometry={nodes_v4.Hair_Material002_0003_3.geometry} material={materials_v4['Material.016']} />
              </group>
            );
            break;
        //hair_30_hush
        case 'hair_30_hush':
            mesh=(
                <group name='hair_30_hush' position={[-4.57, -1.42, -0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={0.52}>
                    <group position={[0.11, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <group rotation={[0, Math.PI / 2, 0]} scale={[1.33, 0.85, 0.85]}>
                            <mesh geometry={nodes_v4.Object_4.geometry} material={materials_v4.Hair2} />
                        </group>
                        <group rotation={[1.52, 0, 0]} scale={[11.24, 13.18, 13.32]}>
                            <mesh geometry={nodes_v4.Object_6.geometry} material={materials_v4.Hair2} position={[0, 0, 0]} scale={0.98} />
                        </group>
                        <group rotation={[0, 0, -Math.PI / 2]}>
                            <mesh geometry={nodes_v4.Object_8.geometry} material={materials_v4.Hair2} />
                        </group>
                    </group>
                </group>
            
        );
        break;
    
        //얼굴---------------------------------------------
        case 'face01':
            mesh=(
                <mesh name="face01" geometry={nodes_v4.face01.geometry} material={materials_v4['Material_3.001']} morphTargetDictionary={nodes_v4.face01.morphTargetDictionary} morphTargetInfluences={nodes_v4.face01.morphTargetInfluences} position={[0, 0, 0]} rotation={[0.07, 0, 0]} scale={1.96}>
                <group position={[0.01, 0.05, 0.01]} rotation={[-0.07, 0, 0]} scale={[0.52, 0.51, 0.51]}>
                  <mesh geometry={nodes_v4.ear_01001.geometry} material={materials_v4.Material_4} position={[-0.7, 0.31, 0.14]} rotation={[-3.1, 0, -0.02]} scale={-0.44} />
                  <mesh geometry={nodes_v4.ear_01002.geometry} material={materials_v4.Material_4} position={[0.7, 0.31, 0.14]} rotation={[0.04, 0, -0.02]} scale={0.44} />
                </group>
              </mesh>
        
            );
            break;
        case 'face02':
            mesh=(
                <mesh name='face02'geometry={nodes_v5.face_02.geometry} material={materials_v5['Material_3.001']} rotation={[0.07, 0, 0]} scale={1.96}>
                <group position={[0.01, 0.05, 0.01]} rotation={[-0.07, 0, 0]} scale={[0.52, 0.51, 0.51]}>
                    <mesh geometry={nodes_v5.ear_01001.geometry} material={materials_v5.ear} position={[-0.7, 0.31, 0.14]} rotation={[-3.1, 0, -0.02]} scale={-0.44} />
                    <mesh geometry={nodes_v5.ear_01002.geometry} material={materials_v5.ear} position={[0.7, 0.31, 0.14]} rotation={[0.04, 0, -0.02]} scale={0.44} />
                </group>
                </mesh>
            );
            break;
        
        //그냥 앞머리 -------------------------------------------------------
        case 'B':
            mesh=(
                <group name='B' position={[-4.59, -1.68, -0.07]} rotation={[1.52, 0, 0]} scale={[6.42, 7.53, 7.61]}>
                <mesh geometry={nodes_v4.Object_6001.geometry} material={materials_v4['Hair2.001']} position={[0.05, 0.02, -0.04]} rotation={[-0.01, 0.06, -0.01]} scale={0.84} />
              </group>

            );
            break;
        
        //
        case 'C':
            mesh=(
                <mesh name='C'geometry={nodes_v4.backhair.geometry} material={materials_v4['Material_1.001']} position={[-0.08, 0.57, -0.24]} rotation={[1.42, 0.62, -1.31]} scale={[1.59, 1.65, 1.62]} />
            );
            break;

        case 'D':
            mesh=(
                <mesh name='D' geometry={nodes_v4.bang.geometry} material={materials_v4['Material_2.001']} position={[0.26, 0.71, 0.6]} rotation={[-0.17, 0.12, -1.21]} scale={[1.59, 1.65, 1.62]}/>
            );
            break;


        default:
        mesh = <group/>;
    }

  return (
      <group ref={group} dispose={null}>
          {mesh}
      </group>
  );
}
