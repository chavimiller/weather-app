const myApiKey = "8MWEEWA77AGXY3REP34Y2PKHW";

const iconConditions = [
  { icon: "snow", url: "./images/Snowy.jpg" },
  { icon: "rain", url: "./images/Rainy.jpg" },
  { icon: "fog", url: "./images/Foggy.jpg" },
  { icon: "wind", url: "./images/Windy.jpg" },
  { icon: "cloudy", url: "./images/Cloudy.jpg" },
  { icon: "partly-cloudy-day", url: "./images/PartlyCloudyDay.jpg" },
  { icon: "partly-cloudy-night", url: "./images/PartlyCloudyNight.jpg" },
  { icon: "clear-day", url: "./images/Sunny.jpg" },
  { icon: "clear-night", url: "./images/ClearNight.jpg" },
];

function fToC(fahr) {
  const celsius = (fahr - 32) * (5 / 9);
  return Math.round(celsius * 100) / 100;
}

export async function getWeatherData(input = "Jerusalem") {
  let location = input;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=us&key=${myApiKey}&contentType=json`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
