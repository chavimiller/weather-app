import clearDay from "./images/ClearDay.jpg";
import clearNight from "./images/ClearNight.jpg";
import rainy from "./images/Rainy.jpg";
import snowy from "./images/Snowy.jpg";
import foggy from "./images/Foggy.jpg";
import windy from "./images/Windy.jpg";
import cloudy from "./images/CloudyOvercast.jpg";
import partlyCloudyDay from "./images/PartlyCloudyDay.jpg";
import partlyCloudyNight from "./images/PartlyCloudyNight.jpg";

import { toZonedTime, format } from "date-fns-tz";

const locationName = document.querySelector(".location-name");
const degreesNum = document.querySelector(".degrees");
const feelsLike = document.querySelector(".feels-like");
const dayDescription = document.querySelector(".description");
const uvIndex = document.querySelector("#uv-index");
const humidityPercent = document.querySelector("#humidity-percent");
const precip = document.querySelector("#precipitation-percent");
const sunriseTime = document.querySelector("#sunrise-time");
const sunsetTime = document.querySelector("#sunset-time");
const dailyBlock = document.querySelector(".daily-block");

let isFahrenheit = true;
let currentDegrees;
let feelsLikeTemp;

const iconConditions = [
  { icon: "snow", url: snowy },
  { icon: "rain", url: rainy },
  { icon: "fog", url: foggy },
  { icon: "wind", url: windy },
  { icon: "cloudy", url: cloudy },
  { icon: "partly-cloudy-day", url: partlyCloudyDay },
  { icon: "partly-cloudy-night", url: partlyCloudyNight },
  { icon: "clear-day", url: clearDay },
  { icon: "clear-night", url: clearNight },
];

function fToC(fahr) {
  const celsius = (fahr - 32) * (5 / 9);
  return Math.round(celsius);
}

export function updateDegrees(data) {
  currentDegrees = Math.round(data.currentConditions.temp);
  feelsLikeTemp = Math.round(data.currentConditions.feelslike);
  isFahrenheit = true;
  updateDegreeUI();
}

function updateDegreeUI() {
  const displayTemp = isFahrenheit ? currentDegrees : fToC(currentDegrees);
  const displayFeels = isFahrenheit ? feelsLikeTemp : fToC(feelsLikeTemp);
  const unit = isFahrenheit ? "°F" : "°C";

  degreesNum.textContent = `${displayTemp}${unit}`;
  feelsLike.textContent = `${displayFeels}${unit}`;
}

export function toggleDegreeUnit() {
  isFahrenheit = !isFahrenheit;
  updateDegreeUI();
}

export function updateBackground(condition) {
  const match = iconConditions.find((entry) => entry.icon === condition);
  const backgroundUrl = match ? match.url : "./images/Default.jpg";

  document.body.style.backgroundImage = `url(${backgroundUrl})`;
  console.log(`Background set to ${backgroundUrl}`);
}

function timeZoneDisplay(timezone, epoch) {
  const formattedTime = format(toZonedTime(epoch * 1000, timezone), "h:mm a", {
    timeZone: timezone,
  });
  return formattedTime;
}

export function updateWeatherDisplay(data) {
  locationName.textContent = data.resolvedAddress;
  dayDescription.textContent = data.currentConditions.conditions;
  uvIndex.textContent = data.currentConditions.uvindex;
  humidityPercent.textContent = `${Math.round(
    data.currentConditions.humidity
  )}%`;
  precip.textContent = `${Math.round(data.currentConditions.precipprob)}%`;

  sunriseTime.textContent = timeZoneDisplay(
    data.timezone,
    data.currentConditions.sunriseEpoch
  );
  sunsetTime.textContent = timeZoneDisplay(
    data.timezone,
    data.currentConditions.sunsetEpoch
  );
}

export function updateForecast(data) {
  for (let i = 1; i < 6; i++) {
    let dailyForecast = document.createElement("div");
    let day = document.createElement("div");
    let dailyTemp = document.createElement("div");

    let epoch = data.days[i].datetimeEpoch;
    let timeZone = data.timezone;

    let convertedEpoch = toZonedTime(epoch * 1000, timeZone);
    let dayOfWeek = format(convertedEpoch, "EEEE", { timeZone });
    console.log(dayOfWeek);

    day.textContent = dayOfWeek;
    dailyTemp.textContent = data.days[i].temp;

    dailyBlock.appendChild(dailyForecast);
    dailyForecast.appendChild(day);
    dailyForecast.appendChild(dailyTemp);
  }
}

// UV Index Guidelines:
// A UV index of 0–2 is considered Low — no protection is needed.
// A UV index of 3–5 is Moderate — wearing sunscreen is recommended.
// A UV index of 6–7 is High — sunscreen, a hat, and sunglasses are recommended.
// A UV index of 8–10 is Very High — seek shade and protect your skin.
// A UV index of 11 or higher is Extreme — avoid sun exposure altogether.
