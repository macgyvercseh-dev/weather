import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
 
function App() {
  //Chamar a api
  const [weather, setWeather] = useState(false);
  
  //hook state para obter localização de acordo com o estado da aplicação
  const [location, setLocation] = useState(false);


  // Usar para pedir permissão ao usuário para obter localização
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])


  const getWeather = async (lat, long) => {
    const res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }  
    });
    setWeather(res.data);
  }



  // Use para retornar ao usuário somente se ele aceitar obter informações de localização
  if (location == false) {
    return (
      <Fragment>
        Você precisa habilitar a localização no browser o/
      </Fragment>
    )
  } else if (weather == false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
        <hr/>
        <ul>
          <li>Temperatura atual: {weather['main']['temp']}°</li>
          <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Humidade: {weather['main']['humidity']}%</li>
        </ul>
      </Fragment>
    );
  }


  return (
    <Fragment>
      <h3>Clima nas suas Coordenadas (Exemplo)</h3>
      <hr />
      <ul>
        <li>Temperatura atual: x°</li>
        <li>Temperatura máxima: x°</li>
        <li>Temperatura minima: x°</li>
        <li>Pressão: x hpa</li>
        <li>Umidade: x%</li>
      </ul>
    </Fragment>
  );
}
 
export default App;