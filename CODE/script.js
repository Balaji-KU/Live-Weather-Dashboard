<script>
  // 🔑 Replace this with your real OpenWeatherMap API key
  const apiKey = "YOUR_REAL_API_KEY_HERE";

  async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const weatherDiv = document.getElementById("weather");

    // Clear previous results
    weatherDiv.innerHTML = "";

    if (!city) {
      weatherDiv.innerHTML = `<p style="color:red;">⚠️ Please enter a city name.</p>`;
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.message || "Unable to fetch weather");
      }

      // ✅ Display weather info
      weatherDiv.innerHTML = `
        <div class="weather-card">
          <h2>${data.name}, ${data.sys.country}</h2>
          <p>🌡 Temperature: ${data.main.temp} °C</p>
          <p>💧 Humidity: ${data.main.humidity} %</p>
          <p>🌬 Wind: ${data.wind.speed} m/s</p>
          <p>☁️ Weather: ${data.weather[0].description}</p>
        </div>
      `;
    } catch (error) {
      weatherDiv.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
      console.error("Error:", error);
    }
  }
</script>
