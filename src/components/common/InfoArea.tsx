import React from 'react'
import { SiWindicss } from 'react-icons/si'
import { WiHumidity } from 'react-icons/wi'
import { InfoWeatherProps } from '../../types/infoAreaProps'

export const InfoArea: React.FC<InfoWeatherProps> = ({ weatherData }) => {
    return (
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
    )
}

export default InfoArea