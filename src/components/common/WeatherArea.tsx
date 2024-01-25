import React from 'react'
import { InfoWeatherProps } from '../../types/infoAreaProps'
import iconChanger from './IconChanger'

export const WeatherArea: React.FC<InfoWeatherProps> = ({ weatherData }) => {
    return (
        <div className="weatherArea">
            <h1>{weatherData.name}</h1>
            <span>{weatherData.sys.country}</span>
            <div className="icon">
                {iconChanger(weatherData.weather[0].main)}
            </div>
            <h1>{weatherData.main.temp.toFixed(0)} °C</h1>
            <h2>{weatherData.weather[0].main}</h2>
        </div>
    )
}

export default WeatherArea