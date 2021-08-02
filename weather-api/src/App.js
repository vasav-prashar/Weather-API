import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css' 
import './App.css';

function App() {
  const [place,setPlace]=useState("");
  const [placeData,setPlaceData]=useState({});
  const [error,setError]=useState("Enter a Location")
  const updatePlaceData=()=>{
   
      fetch(
       `https://api.weatherapi.com/v1/current.json?key=05877d88cbf84f14a50194900212707&q=${place}`)
      .then((res)=>res.json())
      .then((data)=> {
        console.log(data);
        setPlaceData(data);
        try{
          console.log(data.location.name);
          setPlaceData(data);
          setError("");
          }
          catch(error){
            console.log(data.error.message);
            setPlaceData("");
            setError(data.error.message);
          }
      
      });
  
  

  }
  
  
  
  return (
    <div className="App">
      <div className="title"></div>
      <div className="Container">
        <div className="row">
          <div className="col-12 form">
            <input type="text" value={place}
            placeholder="ENTER CITY"
            onChange={(e)=>{
              setPlace(e.target.value);
            }}/>
            <button className="btn btn-outline-success" type="submit" onClick={updatePlaceData}>SUBMIT</button>  
          </div>
          <div className="offset-md-4 col-12 col-md-4 weather">
            <div className="card">
              {placeData.location ? (
                <div>
                <img src={placeData.current.condition.icon} alt=""/>
                <div className="temp">{placeData.current.temp_c}°</div>
                <div className="desc">{placeData.current.condition.text}</div>
              <div className="area"><br></br>{placeData.location.name},{placeData.location.region}</div>
              <div className="additional">
              <br></br>
                <div className="wind">Wind Speed: {placeData.current.wind_kph} Km/h</div>
                <div className="humidity">Humidity: {placeData.current.humidity}</div>
                <div className="wind_direction">Wind Direction: {placeData.current.wind_dir}</div>

              </div>
              <div className="time"><br></br><br></br>Last Updated: {placeData.current.last_updated}</div>
              </div>
              ):(
            <h2>{error}</h2>)}
          </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
