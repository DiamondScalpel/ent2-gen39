
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
const key = 'e54209b51751ce01f2ab7b6f5e59af90';

function App() {

  const [weather, setWeather] = useState();
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const success = (pos) => {
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  }
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  
  useEffect(() => {
    if (coords) {
      const {lat, lon} = coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      axios.get(url)
        .then((res) => {
          const kel = res.data.main.temp;
          const cel = (kel - 273.15).toFixed(2);
          const fah = (cel * 9/5 + 32).toFixed(2);
          setTemp({cel: cel, fah:fah});
          setWeather(res.data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
          }, 550);
        });
    }
  }, [coords]);
  

  console.log(weather);
  

  return (
    <div className='app'>
      {
        isLoading ?
        <figure className='app__img'>
          <img src="https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/8/e/6/8e6f33126207a47f09f7c6ac5333057c1f45b5de.gif" alt="Loading..." />
        </figure>
        :
        <WeatherCard
          weather={weather}
          temp={temp}
        />
      }
    </div>
  )
}

export default App
