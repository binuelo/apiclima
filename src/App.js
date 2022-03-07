import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import clim from "./image/nube.gif"

function App() {
const [city, setcity] = useState({});
 const [climate, setclimate] = useState({});
const [tempe,setTempe] = useState({})
const [winds, setWinds] = useState({})
const [isDc, setIsDc] = useState(true);
const [k, setK] = useState({});
const[mi,setMi]= useState({})
 useEffect(()=>{
 const succes = pos => {
   const latitude =pos.coords.latitude;
   const longitude =pos.coords.longitude;
   console.log(longitude)
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c13d14ae34672a6f48ae4f5bd2e4cd21`).then((res) => {
    setclimate(res.data)
    setcity(res.data.name)
    setTempe(res.data.main?.temp)
    setWinds(res.data.wind?.speed)
    console.log("data")
    console.log(res.data)
    console.log("Clima")
    console.log(res.data.main?.temp)
    console.log("Viento")
    console.log(res.data.wind?.speed)

    })}
navigator.geolocation.getCurrentPosition(succes);

  },[])
  const convert = () => {
    if (isDc) {
      setTempe(tempe - 273.2);
      setWinds(winds*1.16)
      setK("C°")
      setMi("Kms")
      setIsDc(false);
    } else {
      setTempe(tempe + 273.2);
      setWinds(winds/1.16)
      setK("K°")
      setMi("Mi")
      setIsDc(true);
    }
  };

  return (
    <div className="App">
  <div className="container">
  <div className="city">
      <h1> Wheather App</h1>
      <h2> {city} {climate.sys?.country}</h2>
    </div>
    <div className="image">
        <img src={clim}/>
    </div> 
<div className="data">
<h2>{climate.weather?.[0].main}: {climate.clouds?.all} % </h2>
     <h2>{climate.weather?.[0].description}</h2>
     <h2> {tempe} {k}</h2>
     <h2> Viento: {winds} {mi}</h2>
    </div>
    
    <div className="button">
    <button onClick={convert} >
          {isDc ? "convert" : "convertir"}
        </button>
    </div>
  </div>
    </div>
  );
}

export default App;

