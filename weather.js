const image = document.querySelector(".js-weather");
const para = document.querySelector(".temp");

const COORDS = "coords";
const API_KEY = "1c82a037c4b945c9d871e89fb9c481a8";

// 경로 저장 및 날씨 받아오기
function saveCoords() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const curPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            localStorage.setItem(COORDS, JSON.stringify(curPosition));
            paintWeather(curPosition.latitude, curPosition.longitude);
        },
        function (e) {
            console.log(e);
        }
    );
}
function paintWeather(latitude, longitude) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            const temp = json.main.temp;
            const place = json.name;
            const icon = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;

            image.src = icon;
            image.innerText = `${temp}℃,${place}`;
            para.innerText = `${temp}℃,${place}`;
            //weather.append(img);
        });
}
function loadCoords() {
    const coords = localStorage.getItem(COORDS);
    if (coords === null) {
        saveCoords();
    } else {
        const parseCoords = JSON.parse(coords);
        paintWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
