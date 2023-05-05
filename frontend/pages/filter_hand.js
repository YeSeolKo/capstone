import Seo from '../components/Seo';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import React, { useRef, useEffect } from "react";
import dynamic from 'next/dynamic'; //SSR:false를 위해서 dynamic 사용 

//NoSSR
const handTrackingComponent = dynamic(()=> import ('../components/detection/handTracking'),{
    ssr:false,
    });
  
export  default function Filter(){
    
    return(
        <>
        <Seo title='filter_hand'></Seo>
        <handTrackingComponent/>
        </>
    );
}
