
let httpRequest = new XMLHttpRequest();



httpRequest.onload = function() { 
console.log(httpRequest.responseText);


// console.log(httpRequest.responseText);
result = JSON.parse(httpRequest.responseText);


function createDailyWeather(obj){

    for(let i = 0; i < obj.list.length; i = i+8){
        let data = obj.list[i].dt_txt.slice(0,10);
        let time = obj.list[i].dt_txt.slice(10,-3);
        let icon = `http://openweathermap.org/img/wn/${obj.list[i].weather[0].icon}@2x.png`;
        let deg = `${Math.round(obj.list[i].main.temp)}°C`;
        console.log(obj.list[i].dt_txt.slice(0,10))
        ///

        let divObj = document.createElement('div');
        divObj.classList.add('object-weather')
        let div = document.createElement('div');
        let p = document.createElement('p');
        let p1 = document.createElement('p')
        let span = document.createElement('span');
        let main = document.querySelector('.main')
        let iconImg = document.createElement('img');
        iconImg.src = icon;

        ///
        main.appendChild(divObj);
        p1.innerText = data;
        span.innerText = time;
        div.appendChild(p1); 
        div.appendChild(span);
        divObj.appendChild(div);
        divObj.appendChild(iconImg);
        p.innerText = deg;

        divObj.appendChild(p);


    }
    

}


document.querySelector('.cityInput').innerText = result.city.name;
document.querySelector('.userTime').innerText = new Date().toLocaleTimeString().slice(0,-3);

let actualWeather = result.list[0];
document.querySelector('.actualDegree').innerText = `${Math.round(actualWeather.main.temp)}°C`
document.querySelector('.status').innerText = actualWeather.weather[0].main;
document.querySelector('.actual-windy-speed').innerText = actualWeather.wind.speed + ' m/s';
let icon = actualWeather.weather[0].icon;
console.log(icon);
document.querySelector('.actual-img').src = `http://openweathermap.org/img/wn/${icon}@2x.png`

createDailyWeather(result);
console.log(actualWeather);


};


let selectedCity = String(prompt('Select a city'));

httpRequest.open('GET', `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=a94d0a5ac08570add4b47b8da933f247&units=metric`);



httpRequest.send();