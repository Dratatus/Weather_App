import React, { useEffect } from "react";
import { MainWrapper } from "../styles/weather.module";
import { AiOutlineSearch } from "react-icons/ai";
import { WeatherDataProps } from "../types/WeatherDataProps";
import Loading from "./common/Loading";
import { fetchWeatherByCords, fetchWeatherByCity } from "../services/weatherApiService";
import InfoArea from "./common/InfoArea";
import WeatherArea from "./common/WeatherArea";


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
        const fetchWeather = async () => {
            setLoading(true);
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const currentWeather = await fetchWeatherByCords(latitude, longitude);
                    setWeatherData(currentWeather);
                });
            } catch (error) {
                console.error("Error fetching current weather:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

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
                        <WeatherArea weatherData={weatherData} />
                        <InfoArea weatherData={weatherData} />
                    </>
                ) : (< Loading />)
                }
            </div>
        </MainWrapper>
    )
}


export default DisplayWeather;
