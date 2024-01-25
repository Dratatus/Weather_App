import axios from "axios";
import { WeatherDataProps } from "../types/WeatherDataProps";

const api_key = "fc60a7af15d3d4eaf7941db38bd2da55";
const api_Endpoint = "https://api.openweathermap.org/data/2.5/weather";

export const fetchCurrentWeather = async (lat: number, lon: number): Promise<WeatherDataProps> => {
    const url = `${api_Endpoint}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
};

export const fetchWeatherByCity = async (city: string): Promise<WeatherDataProps> => {
    const url = `${api_Endpoint}?q=${city}&appid=${api_key}&units=metric`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};