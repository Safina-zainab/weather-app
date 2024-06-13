import React from 'react';

const FavoriteComponent = ({ favorites, onRemove, onAdd, onCityClick }) => {
    return (
        <div className="favorite-container">
            <h3>Favorite Cities</h3>
            <ul className="favorite-list">
                {favorites.map((city) => (
                    <li key={city.id} className="favorite-item">
                        <span onClick={() => onCityClick(city.name)}>{city.name}</span>
                        <button onClick={() => onRemove(city.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button className='favorite-btn' onClick={() => onAdd(prompt('Enter city name to add to favorites'))}>Add Favorite</button>
        </div>
    );
};

export default FavoriteComponent;
