//tensorflow.js 
import Seo from '../components/Seo';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import React, { useRef, useEffect } from "react";
import dynamic from 'next/dynamic'; //SSR:false를 위해서 dynamic 사용 

//NoSSR
const TF_FaceMeshComponent = dynamic(()=> import ('../components/detection/TF_FaceMeshComponent'),{
    ssr:false,
    });
  
export  default function TF_Filter(){
    
    return(
        <>
        <Seo title='TF_Filter'></Seo>
        <TF_FaceMeshComponent/>
        </>
    );
}
