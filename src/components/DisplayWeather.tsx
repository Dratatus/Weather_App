import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
import "./displayWeather.css"

interface WeatherDataProps {
    city: string;
    desc: string;
    temp: number;
    image: string;
    wind: number;
    pressure: number;
}

const DisplayWeather: React.FC = () => {
    const api_key = "fc60a7af15d3d4eaf7941db38bd2da55";
    const api_Endpoint = "https://api.openweathermap.org";
    const [weatherData, setWeatherData] = useState<WeatherDataProps[]>([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem('weatherApi');
        if (storedData) {
            setWeatherData(JSON.parse(storedData));
        }
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(`${api_Endpoint}/data/2.5/weather`, {
                params: {
                    q: inputValue,
                    units: 'metric',
                    appid: api_key
                }
            });
            const data = response.data;
            const newWeather: WeatherDataProps = {
                city: data.name,
                desc: data.weather[0].description,
                temp: Math.round(data.main.temp),
                image: data.weather[0].icon,
                wind: data.wind.speed,
                pressure: data.main.pressure,
            };
            setWeatherData(prev => [...prev, newWeather]);
            localStorage.setItem('weatherApi', JSON.stringify([...weatherData, newWeather]));
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const renderWeatherData = (data: WeatherDataProps, index: number) => (
        <div key={index} className="weatherArea">
            <h1>{data.city}</h1>
            <h1>{data.temp}°C</h1>
            <h2>{data.desc}</h2>
            {data.image && (
                <img src={`http://openweathermap.org/img/wn/${data.image}.png`} alt="Weather icon" />
            )}
        </div>
    );

    return (
            <div className="container">
                <div className="SearchArea">
                    <input type='text' placeholder='Enter a city' value={inputValue} onChange={handleInputChange}></input>
                    <div className="SearchCircle" onClick={fetchWeatherData}>
                        <AiOutlineSearch className='searchIcon'></AiOutlineSearch>
                    </div>
                </div>

                {weatherData.map(renderWeatherData)}
            </div>
    );
};

export default DisplayWeather;