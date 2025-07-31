import clearDay from "./images/ClearDay.jpg";
import clearNight from "./images/ClearNight.jpg";
import rainy from "./images/Rainy.jpg";
import snowy from "./images/Snowy.jpg";
import foggy from "./images/Foggy.jpg";
import windy from "./images/Windy.jpg";
import cloudy from "./images/CloudyOvercast.jpg";
import partlyCloudyDay from "./images/PartlyCloudyDay.jpg";
import partlyCloudyNight from "./images/PartlyCloudyNight.jpg";

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

export function updateBackground(condition) {
  const match = iconConditions.find((entry) => entry.icon === condition);
  const backgroundUrl = match ? match.url : "./images/Default.jpg";

  document.body.style.backgroundImage = `url(${backgroundUrl})`;
  console.log(`Background set to ${backgroundUrl}`);
}
