import React, { useRef,useState } from 'react'
import { useGLTF } from '@react-three/drei'
import {proxy,useSnapshot} from 'valtio';
import {HexColorPicker} from 'react-colorful';  
import {state,setColor, setFaceColor, setHairColor} from '../store/state';


 export default function Picker(){
     //state선언 
    const snap = useSnapshot(state);

     return(
      <div style={{display:snap.current?'block':'none'}}>
        <HexColorPicker  className='picker'
          color={snap.items[snap.current]} //현재 내가 picker에서 선택한 color
          //if 현재클릭한것이(snap.current)hair이면 ->헤어 색상 변경 else 얼굴 색상 변경
          onChange={(color)=>snap.current==='hair'?setHairColor(color):setFaceColor(color)}
        />
        <h1>{snap.current}</h1> {/*현재 material.name*/}
        <h1>컬러:{snap.items[snap.current]}</h1>
      </div>
       );
     }