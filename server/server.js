const express = require('express');
const app = express();
const basic = require('./router/index');
//cors 오류 발생하지 않게 하려고 cors 모듈 설치했음 
const cors=require('cors');
//request 
const request = require('request');


app.use(cors());
app.use('/api', basic);

//리액트는 기본적으로 3000번 포트를 사용하도록 설정되어있기 때문에
//server단은 3001번을 포트로 설정해주었음.

const port=8080;
app.listen(port,()=>{console.log(`Listening on port ${port}..`)});

//서버 실행: cd server , node server.js 
//localhost:8080/api 들어가면 나옴. 

//server 폴더에서 nodemon 설치 
