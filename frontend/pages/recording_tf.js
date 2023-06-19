//tensorflow.js 
import Seo from '../components/Seo';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import React, { useRef, useEffect } from "react";
import dynamic from 'next/dynamic'; //SSR:false를 위해서 dynamic 사용 

//NoSSR (client side에서만 돌아가도록 )
//Next.js의 동적 라우팅 (why? severSide에서 오류.... )
const TF_All = dynamic(()=> import ('../components/detection/TF_All'),{
    ssr:false,
    });
    
export  default function Recording_TF(){
    
    return(
        <>
        <Seo title='Recording'></Seo>
        {/* <TF_FaceMeshComponent/> */}
        {/* <TF_Pose/> */}
        <TF_All/>
        </>
    );
}
