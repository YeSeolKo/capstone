//tensorflow.js 
import Seo from '../components/Seo';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import React, { useRef, useEffect } from "react";
import dynamic from 'next/dynamic'; //SSR:false를 위해서 dynamic 사용 

//NoSSR
// const TF_FaceMeshComponent = dynamic(()=> import ('../components/detection/TF_FaceMeshComponent'),{
//     ssr:false,
//     });

// const TF_Pose = dynamic(()=> import ('../components/detection/TF_Pose'),{
//     ssr:false,
//     });

const TF_All = dynamic(()=> import ('../components/detection/TF_All'),{
    ssr:false,
    });
    
export  default function TF_Filter(){
    
    return(
        <>
        <Seo title='TF'></Seo>
        {/* <TF_FaceMeshComponent/> */}
        {/* <TF_Pose/> */}
        <TF_All/>
        </>
    );
}
