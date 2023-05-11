import tw from 'tailwind-styled-components';
import styled from 'styled-components';


export default function Card_col({children}) {
  return(
    <>
    {/* CardWrapper */}
    <div className="m-auto md:w-6/12 lg:w-6/12 xl:w-10/12">
      {/* Card */}
      <div className="rounded-xl bg-white shadow-xl">
        {/* Card Margin(아래) + Padding */}
        <div className="mb-4 p-4">
          {/* CardContent 열!  하나씩씩*/}
          <div className="flex gap-3">
            {children}
          </div>
        </div>

      </div>
    </div>
    

{/* 
const CardWrapper = tw.div`
  m-auto md:w-6/12 lg:w-6/12 xl:w-10/12
`;

const Card = tw.div`
  rounded-xl bg-white shadow-xl
`;

const CardPadding = tw.div`
  p-4
`;

const CardContent = tw.div`
  grid grid-rows-1 grid-flow-col flex justify-center items-center
`; */}

    </>
  );
}


