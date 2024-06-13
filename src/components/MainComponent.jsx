import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from './SearchComponent';
import WeatherDisplayComponent from './WeatherDisplayComponent';
import FavoriteComponent from './FavoriteComponent';

const API_KEY = '0f3dfcac350fa9058e9ad26e5c7e3148'; // Replace with your OpenWeatherMap API key

const MainComponent = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const response = await axios.get('http://localhost:3000/favorites');
            setFavorites(response.data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const searchCity = async (city) => {
        try {
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&APPID=${API_KEY}`);
            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&APPID=${API_KEY}`);
    
            const filteredForecast = filterForecast(forecastResponse.data.list);
            setCurrentWeather(weatherResponse.data);
            setForecast(filteredForecast);
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    const filterForecast = (forecastList) => {
        const daySet = new Set();
        const filtered = forecastList.filter(item => {
            const date = new Date(item.dt_txt).getDate();
            if (!daySet.has(date)) {
                daySet.add(date);
                return true;
            }
            return false;
        }).slice(0, 5);
        return filtered;
    };

    const addFavorite = async (city) => {
        try {
            await axios.post('http://localhost:3000/favorites', { name: city });
            fetchFavorites();
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };

    const removeFavorite = async (city) => {
        try {
            await axios.delete(`http://localhost:3000/favorites/${city}`);
            fetchFavorites();
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    const toggleUnit = () => {
        setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    };

    const handleCityClick = (cityName) => {
        searchCity(cityName);
    };

    return (
        <>
        <div className='heading'>Weather Insights</div>
        <div className="main-container">
            <div className="container">
                <SearchComponent onSearch={searchCity} />
                <button className="toggle-button" onClick={toggleUnit}>
                    {unit === 'metric' ? 'Convert to Fahrenheit' : 'Convert to Celsius'}
                </button>
            </div>
            {currentWeather && <WeatherDisplayComponent weather={currentWeather} forecast={forecast} unit={unit} />}
            <FavoriteComponent favorites={favorites} onRemove={removeFavorite} onAdd={addFavorite} onCityClick={handleCityClick} />
        </div>
        </>
    );
};

export default MainComponent;
