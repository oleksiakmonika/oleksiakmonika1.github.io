import React from "react";
import Header from '../Home/Header';
import TodayUsdChfEur from './TodayUsdChfEur';
import Month from './Month';
import Today from './Today';
import Footer from './Footer';


const Home = () => (
    <div id='home'>

        <Header/>
        <TodayUsdChfEur/>
        <Today/>

        <Month/>
        <Footer/>
    </div>
)
export default Home;