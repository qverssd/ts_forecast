import React from "react";
import ShowForecast from "./ShowForecast";
import { ForecastData, WeatherData } from "../modules/modules";

interface ForecastComponentProps {
    forecastData: ForecastData[];
    searchedCity: WeatherData | null;
    onWeatherConditionChange: (condition: string) => void;
}

const ForecastComponent: React.FC<ForecastComponentProps> = ({
    onWeatherConditionChange,
    searchedCity,
    forecastData,
}) => {
    const [isCelsius, setIsCelsius] = React.useState(true);


    const handleToggle = () => {
        setIsCelsius((prevIsCelsius) => !prevIsCelsius);
    };

    React.useEffect(() => {
        if (forecastData && forecastData.length > 0) {
            const currentWeatherCondition = forecastData[0].weather[0].main;
            onWeatherConditionChange(currentWeatherCondition);
        }
    }, [forecastData, onWeatherConditionChange]);



    return (
        <>
        <div className="forecastContainer">
            <div className="temperatureToggle">
                <p className={isCelsius ? "active" : ""}>°C</p>
                <label className="switch">
                    <input
                    type="checkbox"
                    checked={!isCelsius}
                    onChange={handleToggle}
                    />
                    <span className="slider"></span>
                </label>
                <p className={!isCelsius ? "active" : ""}>°F</p>
            </div>
            <div className="cityName">
                <h1>{searchedCity?.name}</h1>
                <p>{searchedCity?.sys.country}</p>
            </div>
            {forecastData.length > 0 && forecastData[0].dt_txt && (
                <ShowForecast
                dt_txt={forecastData[0].dt_txt}
                temp={forecastData[0].main.temp}
                main={forecastData[0].weather[0].main}
                description={forecastData[0].weather[0].description}
                speed={forecastData[0].wind.speed}
                minMaxData={forecastData.slice(0, 4)}
                isCelsius={isCelsius}
                />
            )}
         </div>
        </>
    );
};

export default ForecastComponent;