// 4044426436a1b6511ef2bc709ad95976

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "4044426436a1b6511ef2bc709ad95976",
    baseURL: "https://api.openweathermap.org/data/2.5/"
  }
  
  // Event Listener Function On Keypress

  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', (evt) => {
    if(evt.keyCode == 13) { //Enter Key
      getWeatherReport(searchbox.value)
    }
  });

  //Get Weather Report
  
  function getWeatherReport (city) {
    fetch(`${weatherApi.baseURL}weather?q=${city}&units=metric&APPID=${weatherApi.key}`)
      .then(weather => {
        return weather.json();
      }).then(showWeatherReport);
  }

  //Show Weather report
  
  function showWeatherReport (weather) {
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;


    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  

    let weatherType = document.querySelector('.current .weather');
    weatherType.innerText = weather.weather[0].main;
  

    let minMaxTemp = document.querySelector('.hi-low');
    minMaxTemp.innerText = `${Math.floor(weather.main.temp_min)}°c / ${Math.ceil(weather.main.temp_max)}°c`;

    
    let date= document.querySelector('.location .date');
    let todayDate= new Date();
    date.innerText= dateManage(todayDate);
  

    if(weatherType.textContent== 'Clear'){
       
      document.body.style.backgroundImage= "url('images/clear.jpg')";
    }
 
  
    else if(weatherType.textContent== 'Clouds'){
      
        document.body.style.backgroundImage= "url('images/cloud.jpg')";
    }

    else if(weatherType.textContent== 'Mist'){
      
        document.body.style.backgroundImage= "url('images/mist.jpg')";
    }

    else if(weatherType.textContent== 'Haze'){
      
        document.body.style.backgroundImage= "url('images/haze.jpg')";
    }

    else if(weatherType.textContent== 'Rain'){
      
        document.body.style.backgroundImage= "url('images/rain.jpg')";
    }

    else if(weatherType.textContent== 'Snow'){
      
        document.body.style.backgroundImage= "url('images/snow.jpg')";
    }

    else if(weatherType.textContent== 'Thunderstorm'){
      
        document.body.style.backgroundImage= "url('images/thunderstorm.jpg')";
    }
    
    else if(weatherType.textContent== 'Sunny'){
      
        document.body.style.backgroundImage= "url('images/sunny.jpg')";
    }
  
  }
  
  //Manage Date

  function dateManage(dateArg){

    let days= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
  
    let months=["januray", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
  
    let year= dateArg.getFullYear();
    let month= months[dateArg.getMonth()];
    let date= dateArg.getDate();
    let day= days[dateArg.getDay()];
  
    return `${day} ${date} ${month}, ${year}`;
  
  }



