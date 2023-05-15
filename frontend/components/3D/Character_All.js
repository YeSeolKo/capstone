import React, { useRef,useState } from 'react';
import { useGLTF } from '@react-three/drei';
import {proxy,useSnapshot} from 'valtio';
import { state } from '../store/state';

export default function Character_All(props) {
    const [hover,set]=useState(null);
    const snap=useSnapshot(state) //상태관리 



    const group = useRef();
    const { nodes: nodes_v4, materials: materials_v4 } = useGLTF('/characterv4.glb');
    const { nodes: nodes_v5, materials:materials_v5 } = useGLTF('/characterv5.glb'); //눈 모음
    const { nodes: nodes_onelength, materials:materials_onelength } = useGLTF('/3dParts/new_one_length.glb');
    const { nodes:nodes_brow, materials:materials_brow } = useGLTF('/3dParts/brow.glb');
    const { nodes:nodes_eye_1, materials:materials_eye_1 } = useGLTF('/3dParts/eye_1.glb');
    const { nodes:nodes_eye_2, materials:materials_eye_2 } = useGLTF('3dParts/eye_2.glb');
    const { nodes:nodes_eyeline, materials:materials_eyeline } = useGLTF('3dParts/eyeline.glb');
    const { nodes:nodes_md_hair, materials:materials_md_hair } = useGLTF('3dParts/md_hair.glb');

    
    //조건 case 작성 !------------
    let mesh;
    switch (props.meshName) {
        //NOTE - 얼굴
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


        //NOTE - 눈────────────────────────────────────────
        case 'eye_blue':
            mesh=(
                <group>
                    <mesh geometry={nodes_v5.blue_eye.geometry} material={materials_v5['chibi_template_2_eyes.002']} 
                     position={[0.45, 0.42, 0.65]} scale={0.06} />
                    <mesh geometry={nodes_v5.blue_eye.geometry} material={materials_v5['chibi_template_2_eyes.002']} 
                    position={[-0.15, 0.42, 0.65]} scale={0.06} />
                </group>
            );
            break;
        case 'eye_brown':
            mesh=(
                <group>
                    <mesh geometry={nodes_v5.brown_eye_right.geometry} material={materials_v5['chibi_template_1_eyes.001']} 
                    position={[0.12, -1.29, 0.23]} scale={0.06} />
                    <mesh geometry={nodes_v5.brown_eye_right.geometry} material={materials_v5['chibi_template_1_eyes.001']} 
                    position={[-0.45, -1.29, 0.23]} scale={0.06} />
                    
                </group>
                
            );
            break;
        case 'eye_1':
            //양쪽 눈 object
            mesh=(
                <mesh geometry={nodes_eye_1.EYES1_EYES1_0001.geometry} material={materials_eye_1['EYES1.001']} 
                position={[0.04, 0.37, 0.6]} rotation={[-0.45, -0.04, 3.13]} scale={0.63} />
            );
            break;
        case 'eye_2':
            mesh=(
                //까만 눈 오른쪽 
                <group>
                    <mesh geometry={nodes_eye_2.Sphere.geometry} material={materials_eye_2['Material.001']} 
                    position={[0.3,0.4,0.65]} scale={0.2} />
                    <mesh geometry={nodes_eye_2.Sphere.geometry} material={materials_eye_2['Material.001']} 
                    position={[-0.3,0.4,0.65]} scale={0.2} />
                </group>
            );
            break;
        //NOTE - 눈썹(eye brow)─────────────────────────────────
        case 'brow':
            mesh=(
                //오른쪽
                <group>
                    <mesh geometry={nodes_brow.eye_brows_right.geometry} material={materials_brow['eyebrows.002']} 
                    position={[0.35, 0.55, 0.64]} rotation={[-0.21, -0.38, -0.01]} scale={0.41} />
                    <mesh geometry={nodes_brow.eye_brows_right.geometry} material={materials_brow['eyebrows.002']} 
                    position={[-0.35, 0.55, 0.64]} rotation={[-0.21, 135.38, -0.01]} scale={0.41} />
                </group>

            );
            break;
        // NOTE 아이라인(eye_line)─────────────────────────────────
        case 'eyeline':
            //오른쪽
            mesh=(
                <mesh geometry={nodes_eyeline.lashes002.geometry} material={materials_eyeline['eyebrows.001']} 
                position={[0.3, 0.515, 0.68]} rotation={[-0.91, -0.13, -0.14]} scale={0.55} />
            );
            break;
        

         


        //NOTE - 픽셀 선글라스────────────────────────────────────────
        case 'pixelglasses':
            mesh = (
                //-3.09, 0.35, 0.79
            <group name="pixelglasses" position={[0.09, 0.5, 0.79]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
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
                <group name='glasses_1' position={[0.05, 0.15, 0.3]} rotation={[-Math.PI, 1.52, -Math.PI]} scale={0.08}>
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
            <group name='glasses_2' position={[0.05,0, 0.95]} rotation={[-Math.PI / 2, 0, -1.55]} scale={0.11}>
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
                <mesh name='hair_01_garma' geometry={nodes_v4.hair_01_garma.geometry} material={materials_v4.Hair} position={[0.03, -0.44, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={9.43} 
                material-color="black"
                
                // material-color={snap.items.etc}
                // material-roughness={0.508}
                // material-clearcoat={1} // Increase the clearcoat value for glossiness
                // material-clearcoatRoughness={0} // Set the clearcoat roughness to 0 for a smooth clearcoat
                // material-lights={true}
                // material-emissive="black"
                // material-emissiveIntensity={1}
                />
            );
            break;
        //hair_02_ex_male 기타남자스타일
        case 'hair_02_ex_male':
            mesh=(
                <mesh name='hair_02_ex_male' geometry={nodes_v4.hair_02_ex_male.geometry} material={materials_v4['hair-cards.001']} 
                position={[0.04, 0.83, -0.15]} rotation={[-2.63, 0.27, 1.34]} scale={1.25} 
                material-color={snap.items.etc}/>
            );
            break;
        //hair_03_ex_layered 기타레이어드 (여성) -빌드펌 비슷
        case 'hair_03_ex_layered':
            mesh=(
                <mesh name='hair_03_ex_layered' geometry={nodes_v4.hair_03_ex_layered.geometry} material={materials_v4['Default_OBJ.020']} 
                material-color={snap.items.etc} //HEXcolor !, 또는 기본으로 
                position={[0.1, -0.3, -0.29]} rotation={[Math.PI, -1.5, Math.PI]} scale={0.107} />
            );
            break;
        //기타 여자 스타일
         case 'Ex_Female':
            mesh=(
                <group name='Ex_Female' position={[1.15, -11.41, 0.23]} scale={6.54}>
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001.geometry} material={materials_v4['Front_parts4.001']}
                material-color={snap.items.etc} />
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_1.geometry} material={materials_v4['Front_parts13_155.001']} 
                 material-color={snap.items.etc}/>
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_2.geometry} material={materials_v4['Front_parts14_09.001']} 
                 material-color={snap.items.etc}/>
              </group>
            );
            break;


        //FIXME 남자일반숏
        case 'MaleShort':
            mesh=(
                <mesh name='MaleShort' geometry={nodes_v4.hair_01_garma.geometry} material={materials_v4.Hair} position={[0.03, -0.44, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={9.43} 
                material-color={snap.items.etc}/>
            );
            break;


        //hair_06_dandy 댄디 (남성)
        case 'hair_06_dandy':
            mesh=(
                <group name='hair_06_dandy' position={[.05, 0.9, 0.16]} rotation={[-0.17, 0.13, -0.03]} scale={0.07}>
                    <mesh geometry={nodes_v4.Hair_Hair1_0001.geometry} material={materials_v4['Hair1.001']} 
                    material-color={snap.items.etc}/>
                    <mesh geometry={nodes_v4.Hair_Hair1_0001_1.geometry} material={materials_v4['Hair2.003']}
                    material-color={snap.items.etc} />
                </group>
            );
            break;
        //FIXME - 루프
        case 'Loop':
            mesh=(
                <mesh name='Loop' geometry={nodes_v4.hair_01_garma.geometry} material={materials_v4.Hair} position={[0.03, -0.44, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={9.43} 
                material-color={snap.items.etc}
                />
            );
            break;
        //NOTE - 리젠트 (포마드)


        //hair_09_leaf 리프(남성)
        case 'hair_09_leaf':
            mesh=(
                <mesh name='hair_09_leaf' geometry={nodes_v4.hair_09_leaf.geometry} material={materials_v4['material_0.003']} 
                position={[0, 0.1, -0.35]} rotation={[-1.45, 0, 0]} scale={1.01}
                material-color={snap.items.etc}
                 />
            );
            break;
        //FIXME 미스티
        case 'Misty':
            mesh=(
                <mesh name='Misty' geometry={nodes_v4.hair_03_ex_layered.geometry} material={materials_v4['Default_OBJ.020']} 
                material-color="#3b2e2b" //HEXcolor !, 또는 기본으로 
                position={[0.1, -0.3, -0.29]} rotation={[Math.PI, -1.5, Math.PI]} scale={0.107} />
            );
            break;

        //hair_11_body 바디(여성)
        case 'hair_11_body':
            mesh=(
                <group name='hair_11_body' position={[1.15, -11.41, 0.23]} scale={6.54}>
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001.geometry} material={materials_v4['Front_parts4.001']}
                material-color="black" />
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_1.geometry} material={materials_v4['Front_parts13_155.001']} 
                 material-color="black"/>
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_2.geometry} material={materials_v4['Front_parts14_09.001']} 
                 material-color="black"/>
              </group>
            );
            break;
        //FIXME - 베이비
        case 'Baby':
            mesh=(
                <mesh name='Baby' geometry={nodes_v4.hair_01_garma.geometry} material={materials_v4.Hair} position={[0.03, -0.44, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={9.43} 
                material-color="black"
                />
            );
            break;

        //hair_13_bony 보니(단발 앞머리) -> texture 
        case 'hair_13_bony':
            mesh=(
                <mesh name='hair_13_bony' geometry={nodes_v4.hair_13_bony.geometry} material={materials_v4['Default_OBJ.001']} 
                position={[0.06, 0.05, -0.3]} rotation={[Math.PI, -1.4, Math.PI]} scale={0.13} />
            );
            break;
        //FIXME 보브
        case 'Vov':
            mesh=(
                <mesh name='Vov' geometry={nodes_v4.hair_13_bony.geometry} material={materials_v4['Default_OBJ.001']} 
                position={[0.06, 0.05, -0.3]} rotation={[Math.PI, -1.4, Math.PI]} scale={0.13} 
                material-color='black'/>
            );
            break;

        //hair_15_build
        case 'hair_15_build':
            mesh=(
                <mesh name='hair_15_build' geometry={nodes_v4.hair_15_build.geometry} material={materials_v4['Default_OBJ.022']} 
                position={[0, -0.4, -0.4]} rotation={[Math.PI, -1.53, Math.PI]} scale={0.103} 
                material-color='black'/>
            );
            break;

        //FIXME - 소프트투블럭댄디
        case 'Soft':
            mesh=(
                <group name='Soft' position={[.05, 0.9, 0.16]} rotation={[-0.17, 0.13, -0.03]} scale={0.07}>
                    <mesh geometry={nodes_v4.Hair_Hair1_0001.geometry} material={materials_v4['Hair1.001']} 
                    material-color="black"/>
                    <mesh geometry={nodes_v4.Hair_Hair1_0001_1.geometry} material={materials_v4['Hair2.003']}
                    material-color="black" />
                </group>
            );
            break;
        //숏단발
        case 'ShortDanbal':
        mesh=(
                <mesh name='ShortDanbal'geometry={nodes_md_hair.HAIR_HAIR_0001.geometry} material={materials_md_hair['HAIR.001']} 
                position={[0.05, 0.3, 0.1]} scale={0.7} 
                material-color="black"/>
        );
        break;

        //FIXME - 쉐도우
        case 'Shadow':
        mesh=(
            <mesh name='Shadow' geometry={nodes_v4.hair_01_garma.geometry} material={materials_v4.Hair} position={[0.03, -0.44, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={9.43} 
            material-color="black"
            />
        );
        break;
        //FIXME - 쉼표
        case 'Comma':
        mesh=(
            <mesh name='Comma' geometry={nodes_v4.hair_01_garma.geometry} material={materials_v4.Hair} position={[0.03, -0.44, -0.02]} rotation={[Math.PI / 2, 0, 0]} scale={9.43} 
            material-color="black"
            />
        );
        break;

        //hair_20_spin_swallow
        case 'hair_20_spin_swallow':
            mesh=(
                <mesh name='hair_20_spin_swallow' geometry={nodes_v4.hair_20_spin_swallow.geometry} material={materials_v4['material_0.001']} 
                position={[0, 0.8, -0.21]} rotation={[-1.72, 0, 0]} scale={7.48} 
                material-color="black"/>
            );
            break;
        

        //hair_21_dandy2
        case 'hair_21_dandy2':
            mesh=(
                <group name='hair_21_dandy2' position={[0, 0.96, 0]} rotation={[-0.26, 0, 0.02]} scale={0.075}>
                    <mesh geometry={nodes_v4.Hair_Material002_0003.geometry} material={materials_v4['Material.019']} 
                    material-color="black"/>
                    <mesh geometry={nodes_v4.Hair_Material002_0003_1.geometry} material={materials_v4['Material.018']} 
                     material-color="black"/>
                    <mesh geometry={nodes_v4.Hair_Material002_0003_2.geometry} material={materials_v4['Material.017']} 
                     material-color="black"/>
                    <mesh geometry={nodes_v4.Hair_Material002_0003_3.geometry} material={materials_v4['Material.016']} 
                    material-color="black"/>
              </group>
            );
            break;
        //NOTE - 애즈
        case 'Ads':
            mesh=(
                <mesh name='Ads' geometry={nodes_v4.Object_2003.geometry} material={materials_v4['material_0.005']} 
                position={[0.04, 0.62, -0.15]} rotation={[-1.93, 0.02, -0.2]} scale={7.66} 
                material-color='black'/>
            );
            break;

        //FIXME - 에어 (여성긴머리펌)
        case 'Air':
            mesh=(
                <mesh name='Air' geometry={nodes_v4.hair_03_ex_layered.geometry} material={materials_v4['Default_OBJ.020']} 
                material-color="#3b2e2b" //HEXcolor !, 또는 기본으로 
                position={[0.1, -0.3, -0.29]} rotation={[Math.PI, -1.5, Math.PI]} scale={0.107} />
            );
            break;

        //FIXME 여자일반숏
        case 'FemaleShort':
            mesh=(
                <group name='FemaleShort' position={[1.15, -11.41, 0.23]} scale={6.54}>
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001.geometry} material={materials_v4['Front_parts4.001']}
                material-color="black" />
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_1.geometry} material={materials_v4['Front_parts13_155.001']} 
                 material-color="black"/>
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_2.geometry} material={materials_v4['Front_parts14_09.001']} 
                 material-color="black"/>
              </group>
            );
            break;
        //원랭스
        //hair_25_onelength
        case 'hair_25_onelength':
            mesh=(
                //new_one_length 모델 사용 
                <group position={[-1.41, -0.4, 0.53]} rotation={[-Math.PI / 2, 0, 0]} scale={0.05}>
                    <group rotation={[Math.PI / 2, 0, 0]}>
                        <mesh geometry={nodes_onelength.long_hair_bangs1_long_hair_bangs1_0.geometry} material={materials_onelength.long_hair_bangs1} 
                        position={[28.32, 12.28, -14.5]} scale={1.47}
                        material-color="black" 
                        />
                    </group>
                </group>
            );
            break;
        //FIXME - 원블럭댄디
        case 'OneDandy':
        mesh=(
            <group name='OneDandy' position={[0, 0.96, 0]} rotation={[-0.26, 0, 0.02]} scale={0.075}>
                <mesh geometry={nodes_v4.Hair_Material002_0003.geometry} material={materials_v4['Material.019']} 
                material-color="black"/>
                <mesh geometry={nodes_v4.Hair_Material002_0003_1.geometry} material={materials_v4['Material.018']} 
                    material-color="black"/>
                <mesh geometry={nodes_v4.Hair_Material002_0003_2.geometry} material={materials_v4['Material.017']} 
                    material-color="black"/>
                <mesh geometry={nodes_v4.Hair_Material002_0003_3.geometry} material={materials_v4['Material.016']} 
                material-color="black"/>
            </group>
        );
        break;

        //FIXME - 테슬 (여자 단발 뻗침머리 )
        case 'Tassel':
            mesh=(
                <group name='Tassel' position={[1.15, -11.41, 0.23]} scale={6.54}>
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001.geometry} material={materials_v4['Front_parts4.001']}
                material-color="black" />
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_1.geometry} material={materials_v4['Front_parts13_155.001']} 
                    material-color="black"/>
                <mesh geometry={nodes_v4.Front_parts4_Front_parts4_0001_2.geometry} material={materials_v4['Front_parts14_09.001']} 
                    material-color="black"/>
                </group>
            );
            break;

        //NOTE - 포마드
        //NOTE -  플리츠 (묶은머리 )

        //FIXME - 히피
        case 'Hippy':
            mesh=(
                <mesh name='Hippy' geometry={nodes_v4.long_ddong.geometry} material={materials_v4['Default_OBJ.021']} 
                position={[0, 0.24, -0.36]} rotation={[Math.PI, -1.49, Math.PI]} scale={0.1} 
                material-color='black'/>
            );
            break;


        //hair_EX_long_ddong
        case 'hair_EX_long_ddong':
            mesh=(
                <mesh name='hair_EX_long_ddong' geometry={nodes_v4.long_ddong.geometry} material={materials_v4['Default_OBJ.021']} 
                position={[0, 0.24, -0.36]} rotation={[Math.PI, -1.49, Math.PI]} scale={0.1} 
                material-color={snap.items.etc}/>
            );
            break;
        //hair_EX_male
        // case 'hair_EX_male':
        //     mesh=(
        //         <mesh name='hair_EX_male' geometry={nodes_v4.Object_2003.geometry} material={materials_v4['material_0.005']} 
        //         position={[0.04, 0.62, -0.15]} rotation={[-1.93, 0.02, -0.2]} scale={7.66} 
        //         material-color='black'/>
        //     );
        //     break;
    
        //hair_30_hush
        case 'hair_30_hush':
            mesh=(
                <group name='hair_30_hush' position={[-1.4,-1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.52}>
                    <group position={[0.11, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <group rotation={[0, Math.PI / 2, 0]} scale={[1.33, 0.85, 0.85]}>
                            <mesh name='hair_30_hush'geometry={nodes_v4.Object_4.geometry} material={materials_v4.Hair2} material-color={snap.items.etc} />
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
     

        
        //그냥 앞머리 -------------------------------------------------------
        case 'B':
            mesh=(
                <group name='B' position={[-1.5, -1.68, -0.07]} rotation={[1.52, 0, 0]} scale={[6.42, 7.53, 7.61]}>
                <mesh geometry={nodes_v4.Object_6001.geometry} material={materials_v4['Hair2.001']} position={[0.05, 0.02, -0.04]} rotation={[-0.01, 0.06, -0.01]} scale={0.84} />
              </group>

            );
            break;
        
        //뒷머리
        case 'C':
            mesh=(
                <mesh name='C'geometry={nodes_v4.backhair.geometry} material={materials_v4['Material_1.001']} position={[-0.08, 0.57, -0.24]} rotation={[1.42, 0.62, -1.31]} scale={[1.59, 1.65, 1.62]} 
                material-color="black"/>
            );
            break;
        //만든 앞머리 
        case 'D':
            mesh=(
                <mesh name='D' geometry={nodes_v4.bang.geometry} material={materials_v4['Material_2.001']} position={[0.26, 0.71, 0.6]} rotation={[-0.17, 0.12, -1.21]} scale={[1.59, 1.65, 1.62]}/>
            );
            break;


        default:
        mesh = <group/>;
    }

  return (
      <group ref={group} dispose={null}
        //이벤트 관련
      onPointerOver={(e)=>{e.stopPropagation(),set(e.object.material.name)}}
      onPointerOut={(e)=>{e.intersections.length==0 && set(null)}}
      // onPointerDown={(e)=>{e.stopPropagation();state.current=e.object.material.name}}
      
      //state.current의 name을 받아보자 
      onPointerDown={(e)=>{e.stopPropagation();state.current=e.object.name}}//name 으로 받아보기
      onPointerMissed={(e)=>{state.current=null}}>
          {mesh}
      </group>
  );
}
