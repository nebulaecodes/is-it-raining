const button = document.getElementById("get-weather");
button.addEventListener("click", function() {
    const city = document.getElementById("city-input").value;
    const apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherResult= document.getElementById("weather-result");

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("City not found");
        }
        if (response.status === 404) {
            alert("City not found. Please enter a valid city name.");
            throw new Error("City not found");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const cityName = data.name;
        const temperature = Math.round(data.main.temp);
        const feelsLike = Math.round(data.main.feels_like);
        const weatherDescription = data.weather[0].description;
        const weatherResult = document.getElementById("weather-result");

        let weatherEmoji = "🌤️";
        let weatherMessage = "Nope, it's dry";
        let weatherClass = "dry";

        if (weatherDescription.toLowerCase().includes("rain")) {
            weatherEmoji = "🌧️";
            weatherMessage = "Uh oh, it's raining";
            weatherClass = "rainy";
            const rainContainer = document.getElementById("rain-container");
            if (rainContainer) {
            rainContainer.innerHTML = "";
            for (let i = 0; i < 100; i++) {
                const drop = document.createElement("div");
                drop.classList.add("raindrop");
                drop.style.left = Math.random() * 100 + "vw";
                drop.style.animationDuration = Math.random() * 3 + 2 + "s";
                drop.style.animationDelay = Math.random() * 2 + "s";
                drop.style.opacity = Math.random() * 0.4 + 0.5;
                rainContainer.appendChild(drop);
            }
            }
        
        } else if (weatherDescription.includes("cloud")) {
            weatherEmoji = "☁️";
        } else if (weatherDescription.includes("clear")) {
            weatherEmoji = "☀️";
        }

        let resultHTML = `
            <h2 class="weather-message ${weatherClass}">${weatherMessage} in ${cityName} ${weatherEmoji}</h2>
            <p>The temperature is ${temperature}°C</p>
            <p>It feels like ${feelsLike}°C</p>
            <p>There's ${weatherDescription}</p>
        `;

        weatherResult.innerHTML = resultHTML;

        
    })
    .catch(error => {
        weatherResult.innerHTML = `<p class="error">Oops! I couldn't find that place 😢</p>`;
    });
    if (!city) {
        weatherResult.innerHTML = `<p class="error">Please enter a city first 🌍</p>`;
        return; // don’t proceed to fetch
      }
})

const cityInput = document.getElementById("city-input");
cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        button.click();
    }
});

