import "./styles.css";
import { getWeatherData } from "./api";
import {
  toggleDegreeUnit,
  updateBackground,
  updateDegrees,
  updateForecast,
} from "./ui";
import { updateWeatherDisplay } from "./ui";

const searchBar = document.querySelector("#search-bar");
const submitSearch = document.querySelector("#submit-search");
const degrees = document.querySelector(".degrees");
let currentWeatherData;

submitSearch.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchValue = searchBar.value.trim();
  try {
    currentWeatherData = await getWeatherData(searchValue);
    updateBackground(currentWeatherData.currentConditions.icon);
    updateWeatherDisplay(currentWeatherData);
    updateDegrees(currentWeatherData);
    updateForecast(currentWeatherData);
    console.log(
      `Icon value provided to background function: ${currentWeatherData.currentConditions.icon}`
    );
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
});

degrees.addEventListener("click", () => {
  toggleDegreeUnit();
});

(async () => {
  try {
    currentWeatherData = await getWeatherData();
    updateBackground(currentWeatherData.currentConditions.icon);
    updateWeatherDisplay(currentWeatherData);
    updateDegrees(currentWeatherData);
    console.log(
      `all of data in api for days: ${currentWeatherData.days[1]} ----- ${currentWeatherData.days[6]}`
    );
    updateForecast(currentWeatherData);
  } catch (error) {
    console.error("Error loading default weather", error);
  }
})();
