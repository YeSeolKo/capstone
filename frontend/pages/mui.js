// import react from 'react';
// import {
//     Tabs,
//     TabsHeader,
//     TabsBody,
//     Tab,
//     TabPanel,
//     Grid,
//     GridItem,
//   } from '@material-tailwind/react'
  
//   export default function Mui() {
//     const data = [
//       {
//         label: "HTML",
//         value: "html",
//         desc: `It really matters and then like it really doesn't matter.
//         What matters is the people who are sparked by it. And the people 
//         who are like offended by it, it doesn't matter.`,
//       },
//       // ... (다른 데이터 객체들)
//     ];
  
//     return (
//       <Tabs value="html">
//         <TabsHeader>
//           {data.map(({ label, value }) => (
//             <Tab key={value} value={value}>
//               {label}
//             </Tab>
//           ))}
//         </TabsHeader>
//         <TabsBody>
//           {data.map(({ value, desc }) => (
//             <TabPanel key={value} value={value}>
//               <Grid>
//                 <GridItem colSpan={6}>
//                   <p>{desc}</p>
//                 </GridItem>
//                 <GridItem colSpan={6}>
//                   {/* 추가적인 그리드 아이템 */}
//                 </GridItem>
//               </Grid>
//             </TabPanel>
//           ))}
//         </TabsBody>
//       </Tabs>
//     );
//   }
  