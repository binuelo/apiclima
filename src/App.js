/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import clim from "./image/nube.gif"


function App() {
const [city, setCity] = useState("");
const [climate, setClimate] = useState("");
const [tempe,setTempe] = useState("")
const [winds, setWinds] = useState("")
const [isDc, setIsDc] = useState(true);
const [k, setK] = useState();
const[mi,setMi]= useState()
 
 const succes = pos => {
   const latitude =pos.coords.latitude;
   const longitude =pos.coords.longitude;
   console.log(longitude)
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c13d14ae34672a6f48ae4f5bd2e4cd21`).then((res) => {
    setClimate(res.data)
    setCity(res.data.name)
    setTempe(res.data?.main.temp)
    setWinds(res.data?.wind.speed)

    console.log("data")
    console.log(res.data)
    console.log("location")
    console.log(res.data.name)
    console.log("Clima")
    console.log(res.data.main?.temp)
    console.log(res.data.main?.pressure)
    console.log("Viento")
    console.log(res.data.wind?.speed)
    console.log("weTher");
    console.log(climate.weather?.[0].main);
    console.log(climate.clouds?.all);

    })}
    useEffect(()=>{   
  navigator.geolocation.getCurrentPosition(succes);
  },[])
  const convert = () => {
    if (isDc) {
      setTempe(tempe - 273.2);
      setWinds(winds*1.16)
      setK("C°")
      setMi("Km")
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
      Wheather App
      <h1> 
        {city} {climate.sys?.country}
      </h1>
    </div>
   <div className="image">
       <img src={clim} alt="" /> 
    </div> 

    <div className="data">
      <h3> <b>Wind Speed: </b> {winds} {mi}</h3>
      <h3> <b>Day:</b> {climate.weather?.[0].main}</h3>
      <h3> <b>Clouds:</b> {climate.clouds?.all}  </h3>
      <h3> <b>Pressure:</b>{tempe} {k} </h3>
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

