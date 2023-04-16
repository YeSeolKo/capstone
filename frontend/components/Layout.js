import Header from './home/Header';
import Footer from './home/Footer';

//css: py= padding

export default function Layout({ children}){
    return(
        <>
            <Header/>
            <div>{children}</div>
            <Footer/>
        </>
    );
}