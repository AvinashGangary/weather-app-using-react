import React, { useEffect, useState } from "react";
 import cloud from "../images/Clouds.png"
 import clear from "../images/Clear.png"
 import rain from "../images/Rain.png"
 import err from "../images/error.png"
 import mist from "../images/mist.png"




const Weather = (city) => {
    const [data,setData] = useState("")
    const [search,setSearch] = useState()
    const [error,setError] = useState()

    const API_KEY="d89e5b39db8d03c24d5405f0879d35e2"


    const handleInput = (event) =>{
        setSearch(event.target.value)
    }
     

    const myFun = async () =>{
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
        const jsonData =await get.json()
        console.log(jsonData);
        console.log(search);
        setData(jsonData);
        setSearch("");
        
         
        if(search == ""){
           
          alert("Please Enter City Name")
          setError("Please Enter City Name")

        }
        else if(jsonData.cod == "404"){
          setError("Invalid name, City Not Fount")
        }
        else{
          setError("")
        }
        
    }
   
    //  console.log(data.main.temp);
    
      
   console.log(error);
     
  return (
    <>
      <div className="container">
        <div className="inputs">
          <input placeholder="Search Citys" value={search} onChange={handleInput}/>
          <button onClick={myFun}><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <div className="data">
 
         {
           error ? 
           <div className="errorPage">
            <h2>Opps</h2>
            <p>{error}</p>
            <img src={err} />
           </div> :  ""
           
         }

         {
          data && data.weather ?
          <div className="weathers">
            <h2  className="cityName">{data.name}</h2 >
            {data.weather[0].main == "Clouds" ? <img src={cloud}/> :"" }
            {data.weather[0].main == "Clear" ? <img src={clear}/> :"" }
            {data.weather[0].main == "Rain" ? <img src={rain}/> : ""}
            {data.weather[0].main == "Mist" ? <img src={mist}/> : ""}
            {data.weather[0].main == "Haze" ? <img src={mist}/> : ""}



             
            <h2 className="temprature">{Math.trunc(data.main.temp)}°C</h2>
            <p className="climate">{data.weather[0].description}</p>

          </div> :""
         }
         

        </div>
      </div>
    </>
  );
};

export default Weather;
