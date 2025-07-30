const myApiKey = "8MWEEWA77AGXY3REP34Y2PKHW";
const location = "Jerusalem";

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
const coewn = 2 / 1;

function fToC(fahr) {
  const celsius = (fahr - 32) * (5 / 9);
  return Math.round(celsius * 100) / 100;
}

export async function getWeatherData() {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=us&key=${myApiKey}&contentType=json`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(
      `Temperature: ${weatherData.days[0].temp}°F (${fToC(
        weatherData.days[0].temp
      )}°C)`
    );
    console.log(`Feels Like: ${weatherData.days[0].feelslike}°F`);
    console.log(`Humidity: ${weatherData.days[0].humidity}%`);
    console.log(
      `Percent Chance of Rainfall: ${weatherData.days[0].precipprob}%`
    );
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
