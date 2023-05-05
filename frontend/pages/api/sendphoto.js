import axios from "axios"

export default async function handler(req,res){
    //POST요청일 때만 success 
    if (req.method== 'POST'){
        const config={
            headers:{
                'Content-type':'multipart/form-data',
                'Accpet':'*',
                'withCredentials':'true'//cors관련 
            }
        };
        // const formData = req.body;
        axios.post('http://127.0.0.1:5000/postImage',req.body,config)
         .then((response)=>{
             console.log(response.data);
         })}
         

        //console.log(formData);
        // console.log(req.body)
        // const{imgsrc} = req.body;
    
//         res.status(200).json({message:'success!'}); 
        
//     }
//     else {res.status(500).json({error:'error'})}
//     // try{
//     //     res.status(200).json({message:'success!'}) //요청 성공
//     // } catch(error){
//     //     res.status(500).json({error:'failed ${error}'})
//     // }
        }