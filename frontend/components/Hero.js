import Animation from './Animation';
import Link from 'next/link';

export default function Hero(){
    return(
    <>
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="font-gmarket title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">나만의 3d 캐릭터 제작하기!
        <br className="hidden lg:inline-block"/>
      </h1>
      <p className="font-gmarket mb-8 leading-relaxed"> 고예설 demo 제작 중</p>
      <div className="flex justify-center">

        
          <Link href='/create'>
        <a className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">create 버튼!</a>
        </Link>
        
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
    <Animation/>
    </div>
  </div>
</section>
</>
);
}