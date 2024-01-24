import React, { useEffect, useState } from "react";
import { MainWrapper } from "./weather.module";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import {
    BsFillSunFill,
    BsCloudyFill,
    BsFillCloudRainFill,
    BsCloudFog2Fill,
} from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";
import { WeatherDataProps } from "../interfaces/WeatherData";


const DisplayWeather: React.FC = () => {

    const api_key = "fc60a7af15d3d4eaf7941db38bd2da55";
    const api_Endpoint = "https://api.openweathermap.org/data/2.5/weather";

    const fetchCurrentWeather = async (lat: number, lon: number) => {
        const url = `${api_Endpoint}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    }
    
    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
                ([currentWeather]) => {
                    console.log(currentWeather)
                }
            )
        })
    })

    return (
        <MainWrapper>
            <div className="container">
                <div className="searchArea">
                    <input type='text' placeholder='enter a city' />

                    <div className="searchCircle">
                        <AiOutlineSearch className='searchIcon'></AiOutlineSearch>
                    </div>
                </div>

                <div className="weatherArea">
                    <h1>Auckland</h1>
                    <span>Nz</span>
                    <div className="icon">
                        icon
                    </div>
                    <h1>18c</h1>
                    <h2>cloudy</h2>
                </div>

                <div className="bottomInfoArea">
                    <div className="humidityLevel">
                        <WiHumidity className="windIcon"></WiHumidity>
                        <div className="humidInfo">
                            <h1>60%</h1>
                            <p>Humidity</p>
                        </div>
                    </div>


                    <div className="wind">
                        <SiWindicss className='windIcon'></SiWindicss>
                        <div className="humidInfo">
                            <h1>2.35km/h</h1>
                            <p>wind speed</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainWrapper>
    )
}


export default DisplayWeather;
