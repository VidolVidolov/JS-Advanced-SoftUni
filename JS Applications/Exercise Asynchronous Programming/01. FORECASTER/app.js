function attachEvents() {
    let inputField = document.getElementById('location');
    let getWeatherButton = document.getElementById('submit');
    let allInfoURL = 'https://judgetests.firebaseio.com/locations.json';

    let forecastDiv = document.getElementById('forecast');
    let curentForecast = document.getElementById('current');
    let upcomingForecast = document.getElementById('upcoming');

    let label = document.getElementsByClassName('label');
    let divForSpansInUpcomingForecast = generateElement('div', 'forecast-info', '');

    let symbols = {
        Sunny: '&#x2600', // ☀
        "Partly sunny": '&#x26C5', // ⛅
        Overcast: '&#x2601', // ☁
        Rain: '&#x2614', // ☂
        Degrees: '&#176',   // °
    }

    getWeatherButton.addEventListener('click', () => {

        fetch(allInfoURL)
            .then((response) => response.json())
            .then(data => {
                let currentCity = data.find(x => x.name == inputField.value);

                if (!currentCity) { // here im checking for wrong input and if the input is invalid i make the heading div with text error 
                    forecastDiv.style = 'display: block';
                    label[0].textContent = 'Error (Refresh the page for further use)';
                    return;
                }
                let todayInfoURL = `https://judgetests.firebaseio.com/forecast/today/${currentCity.code}.json`;
                let nextDaysInfoURL = `https://judgetests.firebaseio.com/forecast/upcoming/${currentCity.code}.json`;

                let today = fetch(todayInfoURL)
                    .then(res => res.json())

                let nextDays = fetch(nextDaysInfoURL)
                    .then(res => res.json())

                Promise.all([today, nextDays])
                    .then(([today, nextDays]) => {
                        // this block is for when getting a new City weather to "refresh" the information not to append to the older one
                        let first = document.getElementsByClassName('forecasts');
                        let second = document.getElementsByClassName('forecast-info');
                        if (first.length != 0 && second.length != 0) {
                            first[0].remove();
                            let children = upcomingForecast.children[1];
                            [...children.children].forEach(x => x.remove());
                        }
                        // it ends here , remove it if you want the original task 
                        forecastDiv.style = 'display: block';
                        label[0].textContent = 'Current conditions';
                        todysWeather(today);
                        [...nextDays.forecast].forEach((element) => {
                            upcomingWeather(element);
                        });
                        upcomingForecast.appendChild(divForSpansInUpcomingForecast);
                    })
                    .catch((err) => {
                        forecastDiv.style = 'display: block';
                        label[0].textContent = 'Error (Refresh the page for further use)';
                    });

            })
            .catch((err) => {
                forecastDiv.style = 'display: block';
                label[0].textContent = 'Error (Refresh the page for further use)';
            });
    })

    function upcomingWeather(currDay) {

        let mainSpan = generateElement('span', 'upcoming', '');
        let symbolSpan = generateElement('span', 'symbol', symbols[currDay.condition]);
        let tempSpan = generateElement('span', 'forecast-data', `${currDay.low}${symbols.Degrees}/${currDay.high}${symbols.Degrees}`);
        let conditionSpan = generateElement('span', 'forecast-data', currDay.condition);

        mainSpan.appendChild(symbolSpan);
        mainSpan.appendChild(tempSpan);
        mainSpan.appendChild(conditionSpan);

        divForSpansInUpcomingForecast.appendChild(mainSpan);
    }
    function todysWeather(today) {
        let forecats = generateElement('div', 'forecasts', '');
        let conditionSymbol = generateElement('span', 'condition symbol', symbols[today.forecast.condition]);
        let mainSpan = generateElement('span', 'condition', '');
        let citySpan = generateElement('span', 'forecast-data', `${today.name}`);
        let tempSpan = generateElement('span', 'forecast-data', `${today.forecast.low}${symbols.Degrees}/${today.forecast.high}${symbols.Degrees}`);
        let conditionSpan = generateElement('span', 'forecast-data', `${today.forecast.condition}`);

        mainSpan.appendChild(citySpan);
        mainSpan.appendChild(tempSpan);
        mainSpan.appendChild(conditionSpan);

        forecats.appendChild(conditionSymbol);
        forecats.appendChild(mainSpan);

        curentForecast.appendChild(forecats);
    }
    function generateElement(type, classes, text) {

        let createElement = document.createElement(type);
        createElement.className = classes;
        createElement.innerHTML = text;

        return createElement;
    }
}

attachEvents();