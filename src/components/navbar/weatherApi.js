import axios from "axios";

const baseUrl= 'https://api.open-meteo.com/v1/forecast?latitude=-34.92&longitude=-57.95&hourly=temperature_2m&current_weather=true';


export const getWeatherData = async (cityname) => {
    try{
        const {data} = await axios.get(baseUrl 
            );
        return data;
    }catch(error){
        throw error;
    }
}