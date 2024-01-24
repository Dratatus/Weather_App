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
import { WeatherDataProps } from "../interfaces/WeatherDataProps";


const DisplayWeather: React.FC = () => {

    const api_key = "fc60a7af15d3d4eaf7941db38bd2da55";
    const api_Endpoint = "https://api.openweathermap.org/data/2.5/weather";

    const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(null);

    const [isLoading, setLoading] = React.useState(false)

    const[searchCity, setSearchCity] = React.useState("")

    const fetchCurrentWeather = async (lat: number, lon: number) => {
        const url = `${api_Endpoint}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    }

    const iconChanger = (weather: string) => {
        let iconElement: React.ReactNode;
        let iconColor: string;

        switch (weather) {
            case "Rain":
                iconElement = <BsFillCloudRainFill />
                iconColor = "#272829";
                break;

            case "Clear":
                iconElement = <BsFillSunFill />
                iconColor = "#FFC436";
                break;

            case "Clouds":
                iconElement = <BsCloudyFill />
                iconColor = "#102C57";
                break;

            case "Mist":
                iconElement = <BsCloudFog2Fill />
                iconColor = "#279EFF";
                break;

            default:
                iconElement = <TiWeatherPartlySunny />
                iconColor = "#7B2869"
        }

        return (
            <span className="icon" style={{ color: iconColor }}>
                {iconElement}
            </span>
        )
    }

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
                ([currentWeather]) => {
                    setWeatherData(currentWeather)
                    setLoading(true)
                    console.log(currentWeather)
                }
            )
        })
    }, [])

    return (
        <MainWrapper>
            <div className="container">
                <div className="searchArea">
                    <input type='text' placeholder='enter a city' />

                    <div className="searchCircle">
                        <AiOutlineSearch className='searchIcon'></AiOutlineSearch>
                    </div>
                </div>

                {weatherData && isLoading ? (
                    <>
                        <div className="weatherArea">
                            <h1>{weatherData.name}</h1>
                            <span>{weatherData.sys.country}</span>
                            <div className="icon">
                                {iconChanger(weatherData.weather[0].main)}
                            </div>
                            <h1>{weatherData.main.temp.toFixed(0)} °C</h1>
                            <h2>{weatherData.weather[0].main}</h2>
                        </div>

                        <div className="bottomInfoArea">
                            <div className="humidityLevel">
                                <WiHumidity className="windIcon"></WiHumidity>
                                <div className="humidInfo">
                                    <h1>{weatherData.main.humidity}</h1>
                                    <p>Humidity</p>
                                </div>
                            </div>


                            <div className="wind">
                                <SiWindicss className='windIcon'></SiWindicss>
                                <div className="humidInfo">
                                    <h1>{weatherData.wind.speed} km/h</h1>
                                    <p>wind speed</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="loading">
                        <RiLoaderFill className="loadingIcon" />
                        <p>Loading</p>
                    </div>
                )
                }


            </div>
        </MainWrapper>
    )
}


export default DisplayWeather;
