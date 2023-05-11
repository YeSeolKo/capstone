import Seo from '../components/Seo';
import tw from 'tailwind-styled-components';
// import tw from 'twin.macro';
import Link from 'next/link';


const Background=tw.div`
    relative
    py-20
    bg-gradient-to-br
     from-sky-50
     to-gray-200
`
const Container=tw.div`relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40`

const Rounded=tw.div`rounded-xl bg-white shadow-xl `





export  default function create(){

    
    return(
        <>
        <Seo title='create'></Seo>
        {/* bg-gradient-to-tr from-orange-100  to-fuchsia-100 */}
        
<Background>
    <Container>
        <div className="m-auto md:w-10/12 lg:w-6/12 xl:w-6/12">
            <Rounded>
                <div className="p-6 sm:p-16">
                    <div className="space-y-4">
                        
                        <h2 className="mb-8 text-2xl text-cyan-900 font-bold">메뉴 선택창<br/></h2>
                        <h3 className="font-gmarket">얼굴 사진이 필요해요!!</h3>
                        
                        
                    </div>

                    <div className="mt-16 grid space-y-4">
                        {/* 버튼 =>웹캠*/}
                        <Link href="/webcam"> 
                            <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">웹캠으로 찍을래요</span>
                            </div>
                            </button>
                        </Link>
                
                         {/* 버튼 =>사진 파일 */}
                        <Link href="/photoupload">
                        <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                            <div className="relative flex items-center space-x-4 justify-center">
                                <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">사진 파일을 올릴래요</span>
                            </div>
                        </button>
                        </Link>
                        
                    </div>

                  
                </div>
            </Rounded>
        </div>
    </Container>
</Background>
        </>
    );
}








// import Seo from '../components/Seo';
// import tw from 'tailwind-styled-components';
// import Link from 'next/link';



// export  default function Create(){
//     return(
//         <>
//         <Seo title='Create'></Seo>
//         {/* bg-gradient-to-tr from-orange-100  to-fuchsia-100 */}
        
// <div className="relative py-20 bg-gradient-to-br from-sky-50 to-gray-200">  
//     <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
//         <div className="m-auto md:w-10/12 lg:w-6/12 xl:w-6/12">
//             <div className="rounded-xl bg-white shadow-xl">
//                 <div className="p-6 sm:p-16">
//                     <div className="space-y-4">
                        
//                         <h2 className="mb-8 text-2xl text-cyan-900 font-bold">메뉴 선택창<br/></h2>
//                         <h3>얼굴 사진이 필요해요!!</h3>
                        
                        
//                     </div>

                    


//                     <div className="mt-16 grid space-y-4">
//                         {/* 버튼 */}

//                         <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
//                             <div className="relative flex items-center space-x-4 justify-center">
//                                 <Link href="/capture">
//                                 {/* <a href=""> */}
//                                 <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">웹캠으로 찍을래요</span>
//                                 {/* </a> */}
//                                 </Link>
//                             </div>
//                         </button>
                
//                          {/* 버튼 */}
//                         <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
//                             <div className="relative flex items-center space-x-4 justify-center">
                                
//                                 <a href="">
//                                 <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">사진 파일을 올릴래요</span>
//                             </a></div>
//                         </button>
                        
//                     </div>

                  
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>

//         </>
//     );
// }