import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";

export default function Rotas(){
    return(
        <BrowserRouter>
            <Navbar />
                <Routes>
                        <Route path="/" element={<Home/>}/> 
                </Routes>
        </BrowserRouter>
    );
}