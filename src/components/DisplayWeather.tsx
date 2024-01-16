import React from 'react'
import { MainWrapper } from './styles.module'
import { AiOutlineSearch } from "react-icons/ai"
import { WiHumidity } from "react-icons/wi"
import { SiWindicss } from "react-icons/si"
import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill, BsCloudFog2Fill } from "react-icons/bs"
import { RiLoaderFill } from "react-icons/ri"
import { TiWeatherPartlySunny } from "react-icons/ti"


const DisplayWeather = () => {
    return (
        <MainWrapper>
            <div className="container">
                <div className="SearchArea">
                    <input type='text' placeholder='enter a city'></input>

                    <div className="SearchCircle">
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

export default DisplayWeather
