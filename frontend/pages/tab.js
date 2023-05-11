import styled from "styled-components";
import react,{useState} from "react";
import tw from "tailwind-styled-components";

const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
`;

const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  width: 40%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${props => (props.active ? "1px solid #ccc" : "")};
  border-bottom: ${props => (props.active ? "none" : "")};
  background-color: ${props => (props.active ? "white" : "lightgray")};
  height: ${props => (props.active ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;
const Content = styled.div`
  ${props => (props.active ? "" : "display:none")}
`;
const Section=styled.section`
    color: #374151;
`;
const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-top: 6rem;
  margin-bottom: 6rem;
  display: flex;
  flex-wrap: wrap;
`;


//-------------------------------------

export default function TabExample(){
    const [active, setActive] = useState(0);
    const handleClick = e => {
      const index = parseInt(e.target.id, 0);
      if (index !== active) {
        setActive(index);
      }
    };

    return(

        <>
       

        {/* //------------------ */}
      <Tabs>
        <Tab onClick={handleClick} active={active === 0} id={0}>탭1
        </Tab>

        <Tab onClick={handleClick} active={active === 1} id={1}>
          탭2
        </Tab>
      </Tabs>
      <>
      {/* 내용 */}
        <Content active={active === 0}>
        <div className="grid grid-cols-4 gap-">
            <p>dd</p>
            <p>sgd</p>
              
          </div>
        </Content>
        <Content active={active === 1}>
          <h1>Content 2</h1>
        </Content>
      </>
      {/* <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs> */}
        </>
    );
}
