import "./styles.css";
import { getWeatherData } from "./api";
import { updateBackground } from "./ui";
import { updateWeatherDisplay } from "./ui";

const searchBar = document.querySelector("#search-bar");
const submitSearch = document.querySelector("#submit-search");

submitSearch.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchValue = searchBar.value.trim();
  try {
    const weather = await getWeatherData(searchValue);
    updateBackground(weather.days[0].icon);
    updateWeatherDisplay(weather);
    console.log(
      `Icon value provided to background function: ${weather.days[0].icon}`
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

(async () => {
  try {
    const defaultWeather = await getWeatherData();
    updateBackground(defaultWeather.days[0].icon);
    updateWeatherDisplay(defaultWeather);
  } catch (error) {
    console.error("Error loading default weather", error);
  }
})();
