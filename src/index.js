import "./styles.css";
import { getWeatherData } from "./api";
import { toggleDegreeUnit, updateBackground, updateDegrees } from "./ui";
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
    updateBackground(currentWeatherData.days[0].icon);
    updateWeatherDisplay(currentWeatherData);
    updateDegrees(currentWeatherData);
    console.log(
      `Icon value provided to background function: ${currentWeatherData.days[0].icon}`
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
    updateBackground(currentWeatherData.days[0].icon);
    updateWeatherDisplay(currentWeatherData);
    updateDegrees(currentWeatherData);
  } catch (error) {
    console.error("Error loading default weather", error);
  }
})();
