import React , {useState} from 'react';
import './App.css';
import axios from 'axios';
import Webname from './components/webName/Webname';

function App() {

  const [data , setData] = useState({})
  const [location , setLocation ] = useState('')

const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=525a8d214702b9043b85fbd71afffe64`
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid=525a8d214702b9043b85fbd71afffe64

const searchLocation = (event) =>{
  if(event.key === 'Enter'){
    axios.get(url).then((response)=>{
      setData(response.data)
      console.log(response.data)
  })
  setLocation('')
  }
}

  return (
    // <>
    <div className="app">
    <Webname />
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">{data.name},{data.main ? <span>{data.sys.country}</span> : null} </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className="discription">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidty</p>
            </div>
            <div className="wind">
              {data.main ? <p className='bold'>{Math.round(data.wind.speed * 1.609)} KM/H</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>}

      </div>
    </div>
    // </>
  );
}

export default App;
