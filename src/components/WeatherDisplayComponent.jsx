import React from 'react';

const WeatherDisplayComponent = ({ weather, forecast, unit }) => {
    return (
        <div className="weather-container">
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>Weather: {weather.weather[0].description}</p>
            <h3>5-day Forecast</h3>
            <div className="forecast-container">
                {forecast.map((day, index) => (
                    <div key={index} className="forecast-item">
                        <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                        <p>{day.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
                        <p>{day.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherDisplayComponent;
