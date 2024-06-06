import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WeatherData } from "../modules/modules";
import CurrentWeather from "./CurrentWeather";
import SearchWeather from "./SearchWeather";

interface CurrentWeatherProps {
    currentWeatherProp: WeatherData | null;
    onSearch: (city: string) => void;
}

const LeftWeather: React.FC<CurrentWeatherProps> = 
({ currentWeatherProp, onSearch }) => {
    return (
        <div className="leftSideBar">
            <div className="title">
                <h1>Forecast Fusion</h1>
                <TiWeatherPartlySunny className="logoIcon" />
            </div>
            <div className="searchBar">
                <SearchWeather onSearch={onSearch} />
            </div>
            <div className="searchedData">
                <CurrentWeather currentWeather={currentWeatherProp} />
            </div>
        </div>
    );
};

export default LeftWeather;