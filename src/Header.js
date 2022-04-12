import React from "react";
import { Link } from "react-router-dom";

//헤더입니다 를 누르면 /페이지로 이동
function Header(props){
    return(
        <>
            <Link to="/"> 
                 <h1>헤더 입니다.</h1>
            </Link>
        </>
    );
}
export default Header;