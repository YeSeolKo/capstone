import React from 'react';
import { Html } from '@react-three/fiber';


//  export default function Loading(){

//      return(
//         <>
//       <Html>
//       <div>
//         <h1>Loading...</h1>
//         {/* Add any additional loading indicators or animations */}
//       </div>
//     </Html>
//         </>
//        );
//      }


const Loading = () => {
    return (
      <Html>
        <div>
          <h1>Loading...</h1>
          {/* Add any additional loading indicators or animations */}
        </div>
      </Html>
    );
  };
  
  export default function LoadingPage() {
    return (
      <div>
        <Loading />
      </div>
    );
  }
