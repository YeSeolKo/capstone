import Seo from '../components/Seo';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import React, { useRef, useEffect } from "react";
import dynamic from 'next/dynamic'; //SSR:false를 위해서 dynamic 사용 

//NoSSR
const FaceMeshComponent = dynamic(()=> import ('../components/detection/MP_FaceMeshComponent'),{
    ssr:false,
    });
  
export  default function Filter(){
    
    return(
        <>
        <Seo title='Filter'></Seo>
        <FaceMeshComponent/>
        </>
    );
}
