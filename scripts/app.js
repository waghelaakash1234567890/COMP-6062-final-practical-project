const app = Vue.createApp({
  data() {
    return {
      myFullName: "Akash",
      user: {},
      city: "London",
      province: "Ontario",
      country: "Canada",
      weather: {
        temperature: "",
        wind: "",
        description: "",
        location: "",
        latitude: "",
        longitude: "",
        population: ""
      },
      word: "",
      dictionary: {
        word: "",
        phonetic: "",
        definition: ""
      }
    };
  },
  methods: {
    fetchUser() {
      fetch("http://comp6062.liamstewart.ca/random-user-profile")
        .then(response => response.json())
        .then(data => {
          this.user = data;
        })
        .catch(error => console.error("Error fetching user:", error));
    },
    fetchWeather() {
      const url = `http://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.temperature) {
            this.weather.temperature = data.temperature;
            this.weather.wind = data.wind_speed;
            this.weather.description = data.weather_description;
            this.weather.location = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
            this.weather.latitude = data.location.latitude;
            this.weather.longitude = data.location.longitude;
            this.weather.population = data.location.population;
          } else {
            alert("Weather data not available. Check every field input.");
          }
        })
        .catch(error => console.error("Error fetching weather:", error));
    },
    fetchDefinition() {
      if (!this.word.trim()) return;

      fetch(`https://comp6062.liamstewart.ca/define?word=${this.word}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            this.dictionary = data[0];
          } else {
            this.dictionary = { word: "", phonetic: "", definition: "No definition found." };
          }
        })
        .catch(error => console.error("Error fetching definition:", error));
    }
  },
  mounted() {
    this.fetchUser();
  }
});

app.mount("#app");
