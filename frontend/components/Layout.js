import Header from './home/Header';
import Footer from './home/Footer';

//css: py= padding

export default function Layout({ children}){
    return(
        <>
            {/* <div className="bg-[url('/bg-img.jpg')]"> */}
            <div className='bg-gradient-to-r from-blue-100 via-pink-100 to-white'>
            <Header/>
            <div>{children}</div>
            </div>
            <Footer/>
        </>
    );
}