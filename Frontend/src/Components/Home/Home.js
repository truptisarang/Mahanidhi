import React, { useEffect, useState } from "react";
import { carousel } from "../CarouselData";
import '../Home/Home.css'
import Carousel from "./Carousel";

const Home = () =>{
    

    return(
        <>
            <div id='homeContainer'>
                <div id="heroSection">
                    <img src="rupee_symbol-removebg-preview.png" width={150} height={150}></img>
                   <h1 style={{"fontSize":"3rem"}}>भारत निधि  |  Bharat Nidhi</h1>
                   <p>A secure, transparent, and efficient blockchain-based fund disbursement system.</p>
                </div>
                <div id="department">
                    <h1>Department</h1>
                </div>
            </div>
        </>
    )
}

export default Home;