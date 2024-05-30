async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  document.querySelector('#weatherWidget').style.display = 'none'
  document.querySelector('#citySelect').addEventListener('change', async evt => {
    console.log('selection changed')
    try {
      document.querySelector('#citySelect').setAttribute('disabled', 'disabled')
      document.querySelector('#weatherWidget').style.display = 'none'
      document.querySelector('.info').textContent = 'Fetching weather data...'

      console.log(evt.target.value)
      let city = evt.target.value
      let url = `http://localhost:3003/api/weather?city=${city}`
      
      const res = await axios.get(url)

      // Log the API response to see the date structure
      console.log('API Response:', res.data);
      
      document.querySelector('#weatherWidget').style.display = 'block'
      document.querySelector('.info').textContent = ''
      evt.target.removeAttribute('disabled')

      let { data } = res

      // Log the data being set for debugging
      console.log('Weather Data:', data);

      document.querySelector('#apparentTemp div:nth-child(2)')
      .textContent = `${data.current.apparent_temperature}°`
      document.querySelector('#todayDescription')
      .textContent = descriptions.find(d => d[0] === data.current.weather_description)[1]
      document.querySelector('#todayStats div:nth-child(1)')
      .textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
      document.querySelector('#todayStats div:nth-child(2)')
      .textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
      document.querySelector('#todayStats div:nth-child(3)')
      .textContent = `Humidity: ${data.current.humidity}%`
      document.querySelector('#todayStats div:nth-child(4)')
      .textContent = `Wind: ${data.current.wind_speed}m/s`

      data.forecast.daily.forEach((day, idx) => {
        let card = document.querySelectorAll('.next-day')[idx]

        let weekDay = card.children[0]
        let apparent = card.children[1]
        let minMax = card.children[2]
        let precipit = card.children[3]

        // Log each date and its corresponding day of the week
        const dayOfWeek = getWeekDay(day.date);
        console.log(`Date: ${day.date}, Day of the Week: ${dayOfWeek}`);

        weekDay.textContent = dayOfWeek;
        apparent.textContent = descriptions.find(d => d[0] === day.weather_description)[1];
        minMax.textContent = `${day.temperature_min}°/${day.temperature_max}°`;
        precipit.textContent = `Precipitation: ${day.precipitation_probability * 100}%`;
      })

      document.querySelector('#location').firstElementChild.textContent = data.location.city
    } catch (err) {
      console.log('Promise rejected with an err.message -->', err.message)
    }
  })
  function getWeekDay(date) {
    const dateObj = new Date(date);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //had to change getDay() to getUTCDay() to avoid the time zone issue!!!!
    const dayIndex = dateObj.getUTCDay();
    return daysOfWeek[dayIndex];
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
