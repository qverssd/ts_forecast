import axios from "axios";


const api_key = process.env.REACT_APP_API_KEY;
const api_Endpoint = process.env.REACT_APP_API_ENDPOINT;

export interface WeatherData {
  name: string;
  dt: number;

  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };

  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  wind: {
    speed: number;
  };

  weather: {
    main: string;
    description: string;
  }[];
}

export interface ForecastData {
  dt_txt: string; 
  dt: number;
  city: {
    country: string;
    name: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };

  weather: {
    main: string;
    description: string;
    icon: string;
  }[];

  wind: {
    speed: string;
  };
}

export const fetchWeatherData = async (city: string) => {
  try {
    const weatherResponse = await axios.get(
      `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`
    );
    const forecastResponse = await axios.get(
      `${api_Endpoint}forecast?q=${city}&appid=${api_key}&units=metric`
    );

    const currentWeatherData: WeatherData = weatherResponse.data;
    const forecastList: ForecastData[] = forecastResponse.data.list;
    return { currentWeatherData, forecastList };
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const fetchCurrentWeather = async (lat: number, lon: number) => {
  const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchForecast = async (
  lat: number,
  lon: number
): Promise<ForecastData[]> => {
  const url = `${api_Endpoint}forecast?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  const response = await axios.get(url);
  return response.data.list;
};

export const convertUnixTimestampToTime = (
  timestamp: number,
  timezoneOffset: number
) => {
  const date = new Date((timestamp + timezoneOffset) * 1000); // Apply timezone offset and convert to milliseconds
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const amPm = hours < 12 ? "AM" : "PM";
  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};

export const convertUnixTimestampToTimeNoTimezone = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const amPm = hours < 12 ? "AM" : "PM";

  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};

export const dateFormatted = (dateString: string | number | Date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as Intl.DateTimeFormatOptions;
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

export const celsiusToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;


export const fontFamily = {
  roboto: "'Roboto', sans-serif",
  wind: "'Shadows Into Light', cursive",
  description: "'Quicksand', sans-serif",
  temprature: "'Lumanosimo', cursive",
  input: "'Signika Negative', sans-serif",
};