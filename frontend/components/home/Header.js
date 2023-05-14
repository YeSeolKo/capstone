import tw from 'tailwind-styled-components';
import Link from 'next/link';

const Head=tw.header`
    border-b-2
    border-slate-200
    body-font
    bg-white //배경 투명 
`;


export default function Header(){
    return(
        <>
    <Head>
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">


        {/* //SECTION - yeseol 3d project 메인으로 돌아가는 link */}
        <Link href='/'>
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"> 
            <span className="font-gmarket sml-3 text-2xl">3D PROJECT</span>
            </a>
        </Link>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a className="text-xl font-gmarket mr-5 hover:text-gray-900" >홈</a>
            <a className="text-xl font-gmarket mr-5 hover:text-gray-900">프로젝트</a>
           
        </nav>
            {/* <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">로그인
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
            </button> */}
        </div>
</Head>

        </>
    );
}