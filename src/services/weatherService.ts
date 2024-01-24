import axios from 'axios';

const api_key = "fc60a7af15d3d4eaf7941db38bd2da55";
const api_Endpoint = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await axios.get(api_Endpoint, {
      params: {
        q: city,
        units: 'metric',
        appid: api_key
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};