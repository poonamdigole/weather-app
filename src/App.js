import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Pune");
  const [weatherDescription, setWeatherDescription] = useState("");

  async function loadWeatherData() {
  let response = " ";
    try {
       response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f652964084c552e8c0492237a3fabd9c`);
      setWeatherData(response.data);
    }
    catch (error) {
      console.log(error);
    }


  }

  useEffect(() => {
    loadWeatherData();
  }, [])

  useEffect(() => {
    loadWeatherData();
  }, [city])

  useEffect(() => {
    setWeatherDescription(`${weatherData?.weather?.[0]?.main} (${weatherData?.weather?. 
    [0]?.description})`)
  }, [weatherData])



  


  return (
    <div className='container'>
      <h1>Weather for {city}</h1>
      <input type='text' className='input-box' value={city} onChange={(e) => {
        setCity(e.target.value);
      }} />

      <p>City : {weatherData?.name}</p>
      <p>Temperature : {`${(weatherData?.main?.temp - 273).toFixed(2)}`}</p>
      <p>Description : {weatherDescription} </p>
      <p>Visibility : {weatherData?.visibility} meters</p>
    </div>

  );
}

export default App;
