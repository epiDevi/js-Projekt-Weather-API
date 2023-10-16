//const url= `https://api.openweathermap.org/data/2.5/weather?q=${inputStadt}&appid=${apiKey}`
    //https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=1b2ba74cd65930aeea9c827c6f81ffc9
    //const url =`http://api.openweathermap.org/geo/1.0/direct?q=${inputStadt}&limit=5&appid=${apiKey}` !!!! mit diese Link bekomme ich Stadtname Alt-Köln zurück

// +++++++++ Falls ich mit lat und lon arbeite möchte 
            //get lat un lon für eingegebene Stadt
            // const lat = dataWeather.coord.lat;
            // const lon = dataWeather.coord.lon;
            // const lat = dataWeather[0].lat;
            // const lon = dataWeather[0].lon; 

            // Erstellen einer neuen URL mit lat und lon
            // const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            // return fetch (weatherApiUrl)
            //     .then(weatherResponse => {
            //         return weatherResponse.json();
            //     })
            //     .then (weatherData => {
            //         console.log('Wetterdaten name:', weatherData);
            //     })
            // +++++++++