import React, { useState } from 'react';
import './styles/weatherCard.css';

const WeatherCard = ({weather, temp}) => {

    const [isCel, setIsCel] = useState(true);

    const handleTemp = () => {
        setIsCel(!isCel);
    }

  return (
    <div className='weathercard'>
        <h1 className='weathercard__title'>Weather App</h1>
        <h2 className='weathercard__city'>{weather?.name}, {weather?.sys.country}</h2>
        <section className='weathercard__body'>
            <figure className='weathercard__img'>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="weather img" />
            </figure>
            <article className='weathercard__data'>
                <h3 className='weathercard__description'>"{weather?.weather[0].description}"</h3>
                <ul className='weathercard__list'>
                    <li className='weathercard__item'><span>Wind Speed: </span><span>{weather?.wind.speed}</span></li>
                    <li className='weathercard__item'><span>Clouds: </span><span>{weather?.clouds.all} %</span></li>
                    <li className='weathercard__item'><span>Pressure: </span><span>{weather?.main.pressure} hPa</span></li>
                </ul>
            </article>
        </section>
        <h2 className='weathercard__temp'>
            {
            isCel ? 
                temp?.cel + '°C'
                : 
                temp?.fah + '°F'
            } 
        </h2>
        <button className='weathercard__button' onClick={handleTemp}>
            Change to {isCel ? '°F' : '°C'}
        </button>
    </div>
  )
}

export default WeatherCard