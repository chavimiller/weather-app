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
  return Math.round(celsius * 100) / 100;
}

export function updateBackground(condition) {
  const match = iconConditions.find((entry) => entry.icon === condition);
  const backgroundUrl = match ? match.url : "./images/Default.jpg";

  document.body.style.backgroundImage = `url(${backgroundUrl})`;
  console.log(`Background set to ${backgroundUrl}`);
}

export function updateWeatherDisplay(data) {
  locationName.textContent = data.resolvedAddress;
  degreesNum.textContent = `${data.days[0].temp}°F`;
  feelsLike.textContent = `/ feels like ${data.days[0].feelslike}°F`;
  dayDescription.textContent = data.days[0].conditions;
  uvIndex.textContent = data.days[0].uvindex;
  humidityPercent.textContent = `${Math.round(data.days[0].humidity)}%`;
  precip.textContent = `${Math.round(data.days[0].precipprob)}%`;

  const getTimeZone = data.timezone;
  const getSunriseEpoch = data.days[0].sunriseEpoch;
  const getSunsetEpoch = data.days[0].sunsetEpoch;

  const formatSunrise = format(
    toZonedTime(getSunriseEpoch * 1000, getTimeZone),
    "h:mm a",
    { getTimeZone }
  );
  const formatSunset = format(
    toZonedTime(getSunsetEpoch * 1000, getTimeZone),
    "h:mm a",
    { getTimeZone }
  );
  sunriseTime.textContent = formatSunrise;
  sunsetTime.textContent = formatSunset;
}

// UV Index Guidelines:
// A UV index of 0–2 is considered Low — no protection is needed.
// A UV index of 3–5 is Moderate — wearing sunscreen is recommended.
// A UV index of 6–7 is High — sunscreen, a hat, and sunglasses are recommended.
// A UV index of 8–10 is Very High — seek shade and protect your skin.
// A UV index of 11 or higher is Extreme — avoid sun exposure altogether.
