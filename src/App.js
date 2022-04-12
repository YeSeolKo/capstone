import React from "react";
import {BrowserRouter,Routes,Route}from"react-router-dom";
import Header from "./Header";
import Main from "./Main";
import NotFound from "./NotFound";
import Product from "./Product";


const App=()=>{
  return (
   <div className="App">
     <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/product/*" element={<Product />}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
