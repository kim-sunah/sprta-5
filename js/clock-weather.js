const h1 = document.getElementById('h1'),
  h2 = document.getElementById('h2'),
  m1 = document.getElementById('m1'),
  m2 = document.getElementById('m2'),
  s1 = document.getElementById('s1'),
  s2 = document.getElementById('s2');
const clockAmPm = document.querySelector('.today-info__ampm');
const weatherImgComp = document.querySelector(
  '.weather-info__main-weather img'
);
const tempComp = document.querySelector('.weather-info__city-info__temp');
const cityComp = document.querySelector('.weather-info__city-info__city');
const dateComp = document.querySelector('.today-info__date');
const weatherImg = [
  '01.png',
  '02.png',
  '03.png',
  '04.png',
  '09.png',
  '10.png',
  '11.png',
  '13.png',
  '50.png',
  'default.png',
];

// const clock = {
//   getClock: function () {
//     const now = new Date();
//     if (now.getHours() > 12) {
//       clockAmPm.innerText = 'PM';
//     } else {
//       clockAmPm.innerText = 'AM';
//     }
//     const hours = String(now.getHours()).padStart(2, 0);
//     const minutes = String(now.getMinutes()).padStart(2, 0);
//     const seconds = String(now.getSeconds()).padStart(2, 0);

//     h1.innerText = hours.substring(0, 1);
//     h2.innerText = hours.substring(1, 2);
//     m1.innerText = minutes.substring(0, 1);
//     m2.innerText = minutes.substring(1, 2);
//     s1.innerText = seconds.substring(0, 1);
//     s2.innerText = seconds.substring(1, 2);
//   },
//   setDate: function () {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, 0);
//     const day = String(today.getDate()).padStart(2, 0);
//     const date = `${year}. ${month}. ${day}`;
//     dateComp.innerText = date;
//   },
// };

// clock.getClock();
// setInterval(() => {
//   clock.getClock();
// }, 1000);

// clock.setDate();

// function onGeoOk(position) {
//   const lat = position.coords.latitude;
//   const long = position.coords.longitude;
//   const units = 'metric';
//   const api = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&units=${units}&appid=${APIKEY}&lang=kr`;

//   fetch(api)
//     .then((res) => res.json())
//     .then((json) => {
//       const source = weatherImg.filter(
//         (i) => i.substring(0, 2) === json.weather[0].icon.substring(0, 2)
//       );
//       weatherImgComp.src = `img/weather/${source}`;
//       tempComp.innerText = Math.round(json.main.temp) + '°C';
//       cityComp.innerText = json.name;
//     });
// }

// function onGeoError() {
//   alert('날씨 정보를 불러올 수 없습니다.');
// }

// navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
