const myApiKey = "8MWEEWA77AGXY3REP34Y2PKHW";

export async function getWeatherData(input = "Jerusalem") {
  let location = input;
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=us&key=${myApiKey}&contentType=json&lang=en`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
