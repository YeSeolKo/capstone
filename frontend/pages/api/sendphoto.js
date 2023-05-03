import axios from "axios"

// function showStatus(status){
//     switch( status ){
//         case 200:
//             return 'ok'
//         case 404:
//             return 'Not Found'
//     }
// }

export default async function handler(req,res){
    const{imgsrc}=req.body

    //POST요청일 때만 success 
    if (req.method== 'POST'){
        const{imgsrc} = req.body;
    
        res.status(200).json({message:'success!'}); 
        
    }
    else {res.status(500).json({error:'error'})}
    // try{
    //     res.status(200).json({message:'success!'}) //요청 성공
    // } catch(error){
    //     res.status(500).json({error:'failed ${error}'})
    // }
}