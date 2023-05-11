import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import Ch_test from '../components/3D/Ch_test'; //Ch_test

import { OrbitControls } from '@react-three/drei';
import { PropertyBinding } from 'three';
import CharacterV4 from '../components/3D/CharacterV4';
import BackGround from '../components/home/BackGround';
import{useEffect} from 'react';
//next,react
import Link from 'next/link';
import {useState} from'react';

// //css
// import tw from 'tailwind-styled-components';
import tw from'tailwind-styled-components';
import styled from 'styled-components';

//R3F
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import react from 'react';

// ─── css  ───────────────────────────────────────────────────────────────────────
//배경색
// const SkyBackground = tw.div`
//   relative py-10 bg-gradient-to-br from-sky-50 to-gray-200
// `;
//가운데정렬
// const Container = tw.div`
//   relative container m-auto px-6  md:px-12 xl:px-40
// `;

//CONTENTS
const Section = tw.section`text-gray-600 body-font overflow-hidden`;
const Container = tw.div`container px-5 py-24 mx-auto`;
const Wrapper=tw.div`lg:w-4/5 mx-auto flex flex-wrap`;
const Image = tw.img`lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded`;
const Description=tw.div`lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0`;


//Card
const Card_Container = tw.div`my-8 w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700`;
const Card_ul=tw.ul`my-4 space-y-3`;


//Tab Menu
const TabButton = styled.button`
  ${tw`opacity-50`}
  ${({ isActive }) => isActive && tw`opacity-100`}
  border-bottom-width: ${({ isActive }) => (isActive ? '2px' : '0')};
  border-bottom-color: ${({ isActive }) => (isActive ? 'blue-600' : 'none')};
`;

// opacity: ${({ isActive }) => (isActive ? '100' : '50')};
// border-bottom-width: ${({ isActive }) => (isActive ? '2px' : '0')};
// border-bottom-color: ${({ isActive }) => (isActive ? 'blue-600' : '')};
// ─────────────────────────────────────────────────────────────────────────────

export  default function Modify(){

    const router = useRouter();
    const [data, setData] = useState(null);

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabIndex) => {
      setActiveTab(tabIndex);
    };

    useEffect(() => {
      if (router.query.data) {
        setData(JSON.parse(router.query.data));
      } else {
        // router.query.data 값이 없을 때의 처리 로직 작성
      }
    }, [router.query.data]);
  
    if (!data) {
      return <div>Loading...</div>; // 데이터가 로드되기 전에 로딩 상태를 표시할 수 있습니다.
    }


    // const router=useRouter();
    // const {data}=router.query; //쿼리 받아오기
    // // console.log(data) //json
    // const parsedData = JSON.parse(data);//json parsing
    //json parsing
    // const hair_type=parsedData.hair_type;
    // const face_type=parsedData.face_type;
    // const glasses_type=parsedData.glasses_type;
 
    return(
    <>
    <Seo title='modify' />
        <Link href="/recording">
            <buffon>녹화</buffon>
        </Link>
        <div>
      {/* Tab buttons */}
      <nav className="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0">
        {/* Tab 1 */}
        {/* <button
          type="button"
          className={`${
            activeTab === 1 ? 'opacity-100 border-b-2 border-blue-600' : 'opacity-50'
          }`}
          onClick={() => handleTabClick(1)}
        >
          Tab 1
        </button> */}
         <TabButton
          type="button"
          isActive={activeTab === 1}
          onClick={() => handleTabClick(1)}
        >
          Tab 1
        </TabButton>

        {/* Tab 2 */}
        <button
          type="button"
          className={`${
            activeTab === 2 ? 'opacity-100 border-b-2 border-blue-600' : 'opacity-50'
          }`}
          onClick={() => handleTabClick(2)}
        >
          Tab 2
        </button>

        {/* Tab 3 */}
        <button
          type="button"
          className={`${
            activeTab === 3 ? 'opacity-100 border-b-2 border-blue-600' : 'opacity-50'
          }`}
          onClick={() => handleTabClick(3)}
        >
          Tab 3
        </button>

        {/* Tab 4 */}
        <button
          type="button"
          className={`${
            activeTab === 4 ? 'opacity-100 border-b-2 border-blue-600' : 'opacity-50'
          }`}
          onClick={() => handleTabClick(4)}
        >
          Tab 4
        </button>
      </nav>

      {/* Tab content */}
      <div>
        {/* Tab 1 content */}
        <div className={`${activeTab === 1 ? 'block' : 'hidden'}`}>
          Tab 1 content
        </div>

        {/* Tab 2 content */}
        <div className={`${activeTab === 2 ? 'block' : 'hidden'}`}>
          <div className='grid-grid-col-5'>
              <h1>sgs</h1>
              <h1>dsgd</h1>
          </div>
        </div>

        {/* Tab 3 content */}
        <div className={`${activeTab === 3 ? 'block' : 'hidden'}`}>
          Tab 3 content
        </div>

        {/* Tab 4 content */}
        <div className={`${activeTab === 4 ? 'block' : 'hidden'}`}>
          Tab 4 content
        </div>
      </div>
    </div>



    
    </>
  );
}