import React,{useContext} from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
//import { Link } from "react-router-dom";


//css-스타일드 컴포넌트 사용 ㄱㄱ 
const HeaderBlock=styled.div`
  background:lightgrey;
  h1{
    color:green;
  }
  `;

const Header=()=>{

  //스타일드 컴포넌트로 헤드 감싸줌 ㄱㄱ 
 return (
    <HeaderBlock>
      <header>
        <h1>헤더</h1>
        <Navbar/>
      </header>
    </HeaderBlock>
  );
}

export default Header;
