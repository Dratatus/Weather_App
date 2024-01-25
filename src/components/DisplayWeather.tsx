import React, { useEffect, useState } from "react";
import { MainWrapper } from "./weather.module";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import { WeatherDataProps } from "../types/WeatherDataProps";
import iconChanger from "./common/IconChanger";
import Loading from "./common/Loading";
import { fetchCurrentWeather, fetchWeatherByCity } from "../services/weatherApiService";


const DisplayWeather: React.FC = () => {

    const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(null);
    const [isLoading, setLoading] = React.useState(false)
    const [searchCity, setSearchCity] = React.useState("")

    const handleSearch = async () => {
        if (searchCity.trim() === "") {
            return;
        }
        setLoading(true);
        try {
            const data = await fetchWeatherByCity(searchCity);
            setWeatherData(data);
            setLoading(false);
        } catch (error) {
            console.error("No results found:", error);
            setLoading(false)
        }
    };

    useEffect(() => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const currentWeather = await fetchCurrentWeather(latitude, longitude);
                setWeatherData(currentWeather);
            } catch (error) {
                console.error("Error fetching current weather:", error);
            } finally {
                setLoading(false);
            }
        });
    }, []);


    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
                ([currentWeather]) => {
                    setWeatherData(currentWeather)
                    setLoading(false)
                    console.log(currentWeather)
                }
            )
        })
    }, [])

    return (
        <MainWrapper>
            <div className="container">
                <div className="searchArea">
                    <input type='text' placeholder='enter a city'
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                    />

                    <div className="searchCircle">
                        <AiOutlineSearch className='searchIcon' onClick={handleSearch}></AiOutlineSearch>
                    </div>
                </div>

                {weatherData && !isLoading ? (
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
                ) : (< Loading />)
                }
            </div>
        </MainWrapper>
    )
}


export default DisplayWeather;
