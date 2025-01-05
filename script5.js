const apiKey = 'de864f0de98ff13c4d2ba617e368aa61'; // Replace with your OpenWeatherMap API key

// Fetch weather data for the given location
async function fetchWeather() {
    const location = document.getElementById('location').value.trim();

    if (!location) {
        alert('Please enter a location');
        return;
    }

    document.getElementById('weatherInfo').innerHTML = 'Loading...';

    try {
        // Fetch weather data from OpenWeatherMap API
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        // Check for errors
        if (data.cod === '404') {
            document.getElementById('weatherInfo').innerHTML = '<p class="error">Location not found. Please try again.</p>';
            return;
        }

        // Extract weather information
        const { name, main, weather, wind } = data;
        const temperature = main.temp;  // Temperature in Celsius
        const description = weather[0].description;
        const humidity = main.humidity;
        const windSpeed = wind.speed;

        // Display the weather information including temperature
        document.getElementById('weatherInfo').innerHTML = `
            <h2>Weather in ${name}</h2>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Condition:</strong> ${description}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = '<p class="error">Error fetching weather data. Please try again later.</p>';
    }
}
