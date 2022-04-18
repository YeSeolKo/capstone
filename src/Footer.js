import React from "react";
import styled from"styled-components";

//css
const FooterBlock=styled.div`
  background:lightgrey;
  h1{
    color:green;
  }
  `;

const Footer=()=>{
    return (
        <FooterBlock>
            <footer>
                <h1>푸터</h1>
            </footer>
        </FooterBlock>
    );
};

export default Footer;