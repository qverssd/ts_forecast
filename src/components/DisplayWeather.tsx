import React from "react";
import { WeatherMainContainer } from "../css/style.modules";
import ForecastComponent from "./ForecastComponent";
import LeftWeather from "./LeftWeather";
import "here should be loading img/gif" from "put source here";
import {
    WeatherData,
    fetchCurrentWeather,
    fetchForecast,
    fetchWeatherData,
    ForecastData,
} from "../modules/modules";

const DisplayWeather = () => {
    const [weatherCondition, setWeatherCondition] = React.useState("");
    const [currentWeather, setCurrentWeather] = React.useState<WeatherData | null>
    (null);
    const [forecastData, setForecastData] = React.useState<ForecastData[]>([]);
    const [loading, setLoading] = React.useState(false);

    const getBackgroundClassFromWeather = (weather: string) => {
        switch(weather) {
            case "Rain":
            case "Drizzle":
                return "rainy-bg";
            case "Clear":
                return "sunny-bg";
            case "Cloudy":
                return "cloudy-bg";
            case "Mist":
                return "foggy-bg";
            default:
                return "default-bg";
        }
    };

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                Promise.all([
                    fetchCurrentWeather(latitude, longitude),
                    fetchForecast(latitude, longitude)
                ]).then(([currentWeatherData, forecastData]) => {
                    setCurrentWeather(currentWeatherData);
                    setForecastData(forecastData);
                    setLoading(true);
                });
            },
            (error) => {
                console.error(error);
                setLoading(false);
            }
        );
    }, []);

    const handleSearch =async (city: string) => {
       try {
        const { currentWeatherData, forecastList } = await fetchWeatherData(city);
        setCurrentWeather(currentWeatherData);
        setForecastData(forecastList);
       } catch (error) {
        console.error("No Result.");
        
       }
    };

    return (
        <WeatherMainContainer>
            <div className="container">
                <div className={getBackgroundClassFromWeather(weatherCondition)}>
                    <div className="splitWeather">
                        <LeftWeather
                        currentWeatherProp={currentWeather}
                        onSearch={handleSearch} 
                        />
                        <div className="rightSideBar">
                            {loading ? (
                                <ForecastComponent
                                onWeatherConditionChange={setWeatherCondition}
                                forecastData={forecastData}
                                searchedCity={currentWeather}
                                />
                            ) : (
                                <div className="loadingWeather">
                                    <img src={'loading img should be here'} alt="img" />
                                    <p>Loading Forecast</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </WeatherMainContainer>
    );
};

export default DisplayWeather;