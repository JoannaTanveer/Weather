var austinBtn = document.querySelector('.austin');
var seattleBtn = document.querySelector('.seattle');
var losangBtn = document.querySelector('.los-angeles');
var newyorkBtn = document.querySelector('.new-york');
var sanfranBtn = document.querySelector('.san-francisco');
var chicagoBtn = document.querySelector('.chicago');
var denverBtn = document.querySelector('.denver');
var atlantaBtn = document.querySelector('.atlanta');


var submitBtn = document.querySelector('.btn-info')











document.addEventListener('DOMContentLoaded', function() {


submitBtn.addEventListener("click", function (event){
    event.preventDefault();

    var searchElm = document.querySelector('.input-box')
    console.log(searchElm.value, "search input from here")
    var weatherDiv = document.querySelector('#weatherDiv')
   
    const key = '527517430ed7ab63b264a0ff97e01ae2'; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchElm.value}&appid=${key}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json)
            // Create all elements to put weather info in
            var city = json.name;
            var date =moment().format("MM/DD/YY")
            var cityTitle = document.createElement('h2');
            cityTitle.textContent=`Weather for ${ city  } on ${date}`;
            weatherDiv.append(cityTitle);

            var temp = json.main.temp;
            var tempF =parseInt((((temp - 273.15)*1.8)+32),10);
            var tempFDisp=document.createElement('h1');
            tempFDisp.textContent=`${tempF}\xB0F`;
            weatherDiv.append(tempFDisp);
            
            var humid = json.main.humidity;
            var humidityDisp = document.createElement('h3');
            humidityDisp.textContent=`${humid}% humidity`;
            weatherDiv.append(humidityDisp);

            var wind= json.wind.speed
            var windMPH =parseInt((wind*2.237),10);
            var windDisp =document.createElement('h3');
            windDisp.textContent=`${windMPH}MPH`;
            weatherDiv.append(windDisp);


            var lat=json.coord.lat;
            var lon=json.coord.lon;
            fetch(`http://api.openweathermap.org/data/2.5/uvi?appid=${ key }&lat=${ lat }&lon=${ lon }`)
                .then(function(response) {
                return response.json();
            })
                .then(function(jsonUV){
                console.log(jsonUV);

                var uv=jsonUV.value;
                var uvDisp=document.createElement('h3');
                uvDisp.textContent=`UV index:${uv}`;
                weatherDiv.append(uvDisp);
            
            fetch (`http://api.openweathermap.org/data/2.5/forecast?q=${searchElm.value}&appid=${key}`)
                .then(function(response){
                    return response.json();
        
                })
                .then(function(json5Day){
                console.log(json5Day, "5day");

                var locationIcon=document.querySelector('.weather-icon');
                var icon=json5Day.list[0].weather[0].icon
                console.log(icon, "icon code")
                // var iconDisp=document.createElement('img');
                locationIcon.innerHTML=`<img src="icons/${icon}.png">`;







                })
            
            
            
            
            
            
            
            
            })
        })

   

    
    



    })
})

austinBtn.addEventListener('click', function (event){
console.log(event, 'clicked');
})
