import React from "react";
import { BsWind } from "react-icons/bs";
import { FaCloudMoonRain } from "react-icons/fa";

import { ForecastData, celsiusToFahrenheit, dateFormatted, convertUnixTimestampToTimeNoTimezone } from "../modules/modules";

interface forecastProps{
    dt_txt: string;

    temp: number;
    main: string;
    description: string;
    speed: string;
    minMaxData: ForecastData[];
    isCelsius: boolean;
}

const ShowForecast: React.FC<forecastProps> = ({
    dt_txt,

    temp,
    main,
    description,
    speed,
    minMaxData,
    isCelsius,
}) => {
    const TemperatureDisplay: React.FC<{
        value: number;
        isCelsius: boolean;
        celsiusToFahrenheit: (celsius: number) => number;
    }> = ({ value, isCelsius, celsiusToFahrenheit }) => (
        <p>
            {isCelsius ? value.toFixed(0) : celsiusToFahrenheit(value).toFixed(0)}
            <span className="celsiusFahr">{isCelsius ? "°C" : "F"}</span>
        </p>
    );

    return (
        <div>
            <div className="topSectionWeather">
                <div className="forecastDescription">
                    <h1 style={{ textTransform: "capitalize" }}>{description}</h1>
                    <p>{dateFormatted(dt_txt)}</p>

                    <em>
                        {speed} Km/h
                        <span className="windIcon">
                            {" "}
                            <BsWind />
                        </span>
                    </em>
                </div>
                <div className="sideWeatherUnit">
                    <h1>
                        {isCelsius ? temp.toFixed(0) : celsiusToFahrenheit(temp).toFixed(0)}{" "}
                        <span>°</span> <span>{
                        isCelsius ? "C" : "F"}
                        </span>
                    </h1>
                    <p>{main}</p>
                </div>
            </div>



        <div className="middleForecasting">
            <div className="forecastHeading">
                <h1>Forecast</h1>
                <FaCloudMoonRain className="forecastIcon" />
            </div>

            <div className="forecastHourly">
                <div className="heading">
                    <p>Time</p>
                    <p>Min</p>
                    <p>Max</p>

                    {minMaxData.map((forecastHourly, index) => (
                        <div className="minMaxWeatherHourly" key={index}>
                            <p>{convertUnixTimestampToTimeNoTimezone(forecastHourly.dt
                                )}</p>
                                <TemperatureDisplay value={forecastHourly.main.temp_min}
                                isCelsius={isCelsius}
                                celsiusToFahrenheit={celsiusToFahrenheit}
                                />
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </div>
    );
};

export default ShowForecast;