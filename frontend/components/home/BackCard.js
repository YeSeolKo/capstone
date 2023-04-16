import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';


export default function BackCard({children}) {
  return(
    <>
    {/*뒷배경:sky*/}
    <div className="relative py-20 bg-gradient-to-br from-sky-50 to-gray-200">  
        <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
            <div className="m-auto md:w-6/12 lg:w-6/12 xl:w-10/12">
                <div className="rounded-xl bg-white shadow-xl">
                    {/* 패딩 */}
                    <div className="p-10"> 
                        {/* grid:row 2개, 간격 5 픽셀,가운데 정렬  */}
                        <div className="grid grid-rows-2 grid-flow-col gap-5 flex justify-center items-center">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}


