import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

function Forecast({ weather, forecast }) {
  const { data } = weather;

  const formatDay = (timestamp) => {
    const options = { weekday: "short" };
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", options);
  };

  const renderTemperature = (temperature) => {
    return Math.round(temperature);
  };

  return (
    <div>
      <div className="city-name">
        <h2>
          {data.city}, <span>{data.country}</span>
        </h2>
      </div>
      <div className="temp">
        {data.condition.icon_url && (
          <img
            src={data.condition.icon_url}
            alt={data.condition.description}
            className="temp-icon"
          />
        )}
        {renderTemperature(data.temperature.current)}°C
      </div>
      <p className="weather-des">{data.condition.description}</p>

      <div className="forecast">
        <h3>5-Day Forecast:</h3>
        <div className="forecast-container">
          {forecast.slice(0, 5).map((day) => (
            <div className="day" key={day.time}>
              <p className="day-name">{formatDay(day.time)}</p>
              {day.condition.icon_url && (
                <img
                  className="day-icon"
                  src={day.condition.icon_url}
                  alt={day.condition.description}
                />
              )}
              <p className="day-temperature">
                {renderTemperature(day.temperature.minimum)}°/
                <span>{renderTemperature(day.temperature.maximum)}°</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;
