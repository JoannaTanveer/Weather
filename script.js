var historyBtn = document.querySelectorAll('.btn');

var submitBtn = document.querySelector('.btn-info')
let storageArray = JSON.parse(localStorage.getItem('local'))

let cityArray = storageArray || ['austin', 'seattle', 'los Angeles', 'new York', 'san Francisco', 'chicago', 'denver', 'atlanta']

//document.addEventListener('DOMContentLoaded', function() {
$( document ).ready(function() {
        
    
$('.btn-info').on('click', function (event){
// submitBtn.addEventListener("click", function (event){
    event.preventDefault();

    var searchElm = document.querySelector('.input-box');
   
   
    weatherApi(searchElm.value)
    cityArray.push(searchElm.value);
    appendHistoryList(cityArray)
    saveinLocalStorage("local", cityArray);
})    


function saveinLocalStorage (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
   
    }

function appendHistoryList (array) {
    $('.btn-group-vertical').html('');
    for (i=0; i < array.length ; i++) {
        let capitalize= array[i].charAt(0).toUpperCase() + array[i].slice(1)
        
        $('.btn-group-vertical').prepend (
            `<button type="button" class="btn" data-city="${array[i]}" id= "cityBtn">${capitalize}</button>`
        )
    }
}

appendHistoryList(cityArray);

$('.btn').on('click', function (event){
    event.preventDefault();
    console.log(event, 'clicked');
    let cityBtn = $(this).attr("data-city");
    console.log (cityBtn);
    weatherApi(cityBtn);
    
    })

function weatherApi (searchCity) {
    const key = '527517430ed7ab63b264a0ff97e01ae2'; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}`)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            console.log(json)
           
           $('#weatherDiv').html('');
           $('.fiveDay').html('');
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
            
                if (uv === 0 && uv <= 2.99){
                    $(uvDisp).addClass('green')
                
                }
                if (uv >= 3 && uv <= 5.99){
                    $(uvDisp).addClass('yellow')
                }
                  
                if (uv >= 6 && uv <= 7.99){
                    $(uvDisp).addClass('orange')
                }
                if (uv >= 8 ){
                    $(uvDisp).addClass('red')
                }


            fetch (`http://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${key}`)
                .then(function(response){
                    return response.json();
        
                })
                .then(function(json5Day){
               
                
                for (i=0; i< 40; i+=8){
                    var fiveDayTemp = parseInt((((json5Day.list[i].main.temp - 273.15)*1.8)+32),10);
                    var icon=json5Day.list[i].weather[0].icon
                    var humidity = json5Day.list[i].main.humidity;
                    var date= moment.unix(json5Day.list[i].dt).format('MM/DD/YY')
                    
                    $('.fiveDay').append( 
                        `<div class='weather-icon'><img src="icons/${icon}.png">
                        <h2>${date} </h2>
                        <h2>${fiveDayTemp}\xB0F ${humidity}% humidity </h2></div>`);
                    
  
                   }
                
                
                

                })
            
            
            })
                
        })

    }   
  


});

