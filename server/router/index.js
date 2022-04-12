const express = require('express');
const router = express.Router();

//클라이언트에서 서버로 데이터를 요청해보자 
router.get('/',(req,res)=>{
    res.send({data : 'hello world!'});
})

module.exports = router;
