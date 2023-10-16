const apiKey = '1b2ba74cd65930aeea9c827c6f81ffc9';
const time = new Date();

//nimmt ein nummer und gibt Wochentage zurück
const dayName = (dayNummber) =>{
    let today = new Date();
    switch (dayNummber) {
        case 0:
            return"Sunday";
            break;
        case 1:
            return"Monday";
            break;
        case 2:
            return"Tuesday";
            break;
        case 3:
            return"Wednesday";
            break;
        case 4:
            return"Thursday";
            break;
        case 5:
            return"Friday";
            break;
        case 6:
            return"Saturday";
            break;
    }
} 

// wenn es regnet gibt richtige Element mit bestimmte description zurück
const checkRain =(rain, description) =>{
    if (rain) {
        let htmlElement= '<div class="flex"><p>${description}</p></div>'
        return htmlElement;
    }
    else return "";
}

// Zeigt Datum in Linke section
const leftSection = document.querySelector(".left");
let leftSectionDay= document.createElement("h2");
leftSectionDay.textContent= `${dayName(time.getDay())} ${time.getDate()}.${time.getMonth()}.${time.getFullYear()} `;
leftSection.appendChild(leftSectionDay);

// nimmt dataweather von API und zeigt alle benötigte Info in html Seite
const displayWeather = (dataWeather)=>{
    // Aktuelle Zeit in UTC
    const time = new Date();
    // Umrechnung der Zeitzone in Millisekunden
    const timezoneOffsetMilliseconds = dataWeather.timezone * 1000;  
    const localTime = new Date(time.getTime() + timezoneOffsetMilliseconds); 

    const city= dataWeather.name;
    const windSpeed = dataWeather.wind.speed;
    console.log(`windSpeed: ${windSpeed} km/h`);
    const cloudiness = dataWeather.clouds.all;
    let cloudinessDescription;

    let weatherDescription;

    switch (true) {
        case cloudiness < 20:
            weatherDescription = "Clear sky";
            break;
        case cloudiness < 50:
            weatherDescription = "Partly cloudy";
            break;
        case cloudiness < 80:
            weatherDescription = "Very cloudy";
            break;
        default:
            weatherDescription = "Very cloudy";
    }
    let rainDescription;
    // if rain
    if (dataWeather.rain) {
        const rainAmount = dataWeather.rain['1h']; // Regenmenge in der letzten Stunde
        if (rainAmount > 0.0 && rainAmount < 2.5) {
            rainDescription= "light rain 🌧️";
        } else if (rainAmount >= 2.5) {
            rainDescription= "Strong rain 🌧️🌧️";
        }
    }
    console.log(`cloudiness: ${cloudiness}%, Beschreibung: ${weatherDescription}`);
    //console.log("cloudiness", cloudiness);
    const pressure = dataWeather.main.pressure;
    console.log("pressure", pressure+ " hpa");
    const humidity= dataWeather.main.humidity;
    console.log("humidity", humidity + "%");

    const sunriseUnix = dataWeather.sys.sunrise;
    const sunsetUnix = dataWeather.sys.sunset;

    const sunriseTime = new Date(sunriseUnix * 1000);
    const sunsetTime = new Date(sunsetUnix * 1000);

    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000; // Offset in Millisekunden
    const localSunriseTime = new Date(sunriseTime.getTime() + timezoneOffset);
    const localSunsetTime = new Date(sunsetTime.getTime() + timezoneOffset);

    const sunriseFormatted = `${localSunriseTime.getUTCHours()}:${String(localSunriseTime.getUTCMinutes()).padStart(2, '0')}:${String(localSunriseTime.getUTCSeconds()).padStart(2, '0')}`;
    const sunsetFormatted = `${localSunsetTime.getUTCHours()}:${String(localSunsetTime.getUTCMinutes()).padStart(2, '0')}:${String(localSunsetTime.getUTCSeconds()).padStart(2, '0')}`;

    console.log("Sonnenaufgang:", sunriseFormatted);
    console.log("Sonnenuntergang:", sunsetFormatted);


    const geoCoordsLon= dataWeather.coord.lon ;
    const geoCoordsLat= dataWeather.coord.lat ;
    console.log("geoCoordsLon + geoCoordsLat" , geoCoordsLon , geoCoordsLat);
    const temperatureKelvin = dataWeather.main.temp; // Temperatur in Kelvin
    const temperatureCelsius = temperatureKelvin - 273.15; // Umrechnung in Grad Celsius
    console.log(`Temperatur: ${temperatureCelsius.toFixed(0)} °C`);
    const tempIconUrl= `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`;

    // Html Elements
    const leftSectionTime= document.querySelector(".time");
    leftSectionTime.innerHTML= `<h2>${localTime.getUTCHours()}:${localTime.getUTCMinutes()}:${localTime.getUTCSeconds()}</h2>`

    const bottomSection= document.querySelector(".bottom");
    bottomSection.innerHTML= `
    <div class="flex ">
    <h2 class="city">Weather in ${city}</h2>
    </div>
    <div class="flex">
    <img src=${tempIconUrl} alt="Weather Icon">
    <h3> ${temperatureCelsius.toFixed(0)} °C</h3>
    </div>
    ${checkRain(dataWeather.rain , rainDescription)}
    <div class="flex">
    <p>Local Time: </p>
    <p>${localTime.getUTCHours()}:${localTime.getUTCMinutes()}:${localTime.getUTCSeconds()}</p>
    </div>
    <div class="flex">
    <p>Wind speed </p>
    <p>${windSpeed}</p>
    </div>
    <div class="flex">
    <p>Cloudiness </p>
    <p>${weatherDescription}</p>
    </div>
    <div class="flex">
    <p>Pressure </p>
    <p>${pressure} hpa</p>
    </div>
    <div class="flex">
    <p>Humidity </p>
    <p>${humidity} hpa</p>
    </div>
    <div class="flex">
    <p>Sunrise </p>
    <p>${sunriseFormatted}</p>
    </div>
    <div class="flex">
    <p>Sunset </p>
    <p>${sunsetFormatted}</p>
    </div>
    <div class="flex">
    <p>Geo Coords </p>
    <p>${geoCoordsLat} * ${geoCoordsLon}</p>
    </div>
    `;
}

//für den aktuelle Location zu finden:
//https://www.shecodes.io/athena/8323-how-to-get-latitude-and-longitude-coordinates-in-javascript
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const urlCity= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        fetch(urlCity)
    .then(response => response.json())
    .then(data => {
        if (data.name) {
        console.log("data" , data);
        displayWeather(data)
    } else {
        console.log('Stadtname nicht gefunden.');
    }
    })
.catch(error => console.error('Fehler beim Abrufen der OpenWeatherMap-Daten:', error));

    });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

const btn= document.querySelector("#btn");
btn.addEventListener("click" , () =>{
    const inputStadt= document.querySelector("#stadt").value;
    console.log("input" , inputStadt);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputStadt}&appid=${apiKey}` 
    
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(dataWeather => {
            console.log('Wetterdaten1:', dataWeather);
            displayWeather(dataWeather);
            
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Daten:', error);
        });
});