import axios from 'axios';
import {useEffect, useState} from'react';


export default function Homep(props){
    const {dateTime}=props;

    return (
        <div>
            {dateTime||"Loading.."}
        </div>
    )
}

export async function getServerSideProps(){
    const response= await axios.get("http://worldtimeapi.org/api/ip");

    return{
        props:{
            dateTime:response.data.datetime
        }
    }
}
    
    // useEffect(async()=>{
    //     const response = await axios. get('https://worldtimeapi.org/api/ip');
    //     setDateTime(response.data.datetime);
    //     console.log('hi')
    // },[]);

//     return(
//         <div>
//             {/* {dateTime || "Loading..."} */}
//             <button>hi</button>
//         </div>
//     )
// }





// const index=({data})=>{
//     const test=data&&data.title;
//     return <div>{test}</div>
// }

// //getservsideprops 외부 데이터를 next.js서버에서 받아와서 초기 데이터로 setting하고 페이지로 전달
// export const getServerSideProps = async()=>{
//     try{
//         const res= await fetch(''); //fetch로 요청을 받은 response를 
//         if(res.status ===200) //success 
//             {
//                 const data = await res.json();
//                 return {props:{data}};//Props에 data를 담고 return시키면
//                 //index함수에 data를 전달해 렌더링 할 수 있다. 
//             }
//     }catch(e){
//         console.log(e);
//     }
// }

// export default index; //index가 page임 !!!!! 