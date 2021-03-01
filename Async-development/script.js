

document.querySelector('#form').addEventListener('submit', showWeatherBlock);

function showWeatherBlock(event) {
    event.preventDefault();
    let city = document.querySelector('#city').value;
    let country = document.querySelector('#country').value;
    let promise = new Promise((resolve, reject) => {
        let response= fetch(`http://api.weatherstack.com/current?access_key=398b72a14594b34c8ae70e20cc025c73&query=${city},${country}`);
        response.then(result => {return result.json()}).
        then(data => {
            if (data.success===false) {
                reject(createErrorBlock());
                
            } else {
                console.log(data);
                resolve(data);
            }
        })
      });
    
    promise.then(result => createWeatherBlock(result), null);
    
    document.querySelector('#form').reset();
}

function createWeatherBlock(data) {
    
    if (document.querySelector('.weather-block')) {
        document.querySelector('.weather-block').remove();
    }
    let weatherBlock = document.createElement('div');
    weatherBlock.classList.add('weather-block');

    let locationBlock = document.createElement('h2');
    let locationText = document.createTextNode(`${data.location.name}, ${data.location.country}`);
    locationBlock.classList.add('location');
    locationBlock.append(locationText);
    
    let weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather');

    let currentIconBlock = document.createElement('img');
    currentIconBlock.classList.add('icon');
    currentIconBlock.src = data.current.weather_icons[0];

    let currentDegreesBlock = document.createElement('div');
    let currentDegreesText = document.createTextNode(`${data.current.temperature}°C`);
    currentDegreesBlock.classList.add('degrees');
    currentDegreesBlock.append(currentDegreesText);

    weatherInfo.append(currentIconBlock);
    weatherInfo.append(currentDegreesBlock);

    let additionalParametrs = document.createElement('ul');
    additionalParametrs.classList.add('additional-parametrs');  

    let feelslikeBlock = document.createElement('li');
    let feelslikeText = document.createTextNode(`Feels like ${data.current.feelslike}°C`);
    feelslikeBlock.append(feelslikeText);  
    
    let observationTimeBlock = document.createElement('li');
    let observationTimeText = document.createTextNode(`Time: ${data.current.observation_time}`);
    observationTimeBlock.append(observationTimeText);  

    let weatherDescriptionsBlock = document.createElement('li');
    let weatherDescriptionsText = document.createTextNode(`Today is ${data.current.weather_descriptions[0]}`);
    weatherDescriptionsBlock.append(weatherDescriptionsText);   
   
    let windSpeed = document.createElement('li');
    let windSpeedText = document.createTextNode(`Speed: ${data.current.wind_speed} kmph`);
    windSpeed.append(windSpeedText);  

    let pressureBlock = document.createElement('li');
    let pressureText = document.createTextNode(`Pressure: ${data.current.pressure} mb`);
    pressureBlock.append(pressureText);  

    let windDirection = document.createElement('li');
    let windDirectionText = document.createTextNode(`Wind: ${data.current.wind_dir}`);
    windDirection.append(windDirectionText);  

    additionalParametrs.append(observationTimeBlock);
    additionalParametrs.append(feelslikeBlock);
    additionalParametrs.append(weatherDescriptionsBlock);
    additionalParametrs.append(windDirection);
    additionalParametrs.append(windSpeed);
    additionalParametrs.append(pressureBlock);
    
    

    weatherBlock.append(locationBlock);
    weatherBlock.append(weatherInfo);
    weatherBlock.append(additionalParametrs);

    document.body.append(weatherBlock);
}

function createErrorBlock() {
    if (document.querySelector('.weather-block')) {
        document.querySelector('.weather-block').remove();
    }

    let weatherBlock = document.createElement('div');
    weatherBlock.classList.add('weather-block');
    let currentIconBlock = document.createElement('img');
    let weatherInfo = document.createElement('div');
    weatherInfo.classList.add('weather');
    currentIconBlock.classList.add('icon');
    currentIconBlock.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Смайлик-грустный.svg/768px-Смайлик-грустный.svg.png";
    
    let locationBlock = document.createElement('p');
    let locationText = document.createTextNode(`Wrong data that u entered`);
    locationBlock.classList.add('error');
    weatherInfo.append(currentIconBlock);
    locationBlock.append(locationText);
    weatherBlock.append(weatherInfo);
    weatherBlock.append(locationBlock);

    document.body.append(weatherBlock);

}