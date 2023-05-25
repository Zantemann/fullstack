import { useState, useEffect } from 'react'

const Filter = ({ newFilter, handleFilterChange }) => (
  <div>
    find countries <input value={newFilter} onChange={handleFilterChange} />
  </div>
)

const Countries = ({ filteredCountries, handleCountry, selectedCountry, weatherData }) => {
  if (filteredCountries.length === 1) {
    return showData(filteredCountries[0], weatherData)
  } else if (selectedCountry) {
    return showData(selectedCountry, weatherData)
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => handleCountry(country)}>show</button>
          </p>
        ))}
      </div>
    )
  }
}

const showData = (country, weatherData) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weatherData?.main?.temp} Celcius</p>
      {weatherData?.weather[0]?.icon && <img src={`https://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`} alt="Weather Icon" />}
      <p>wind {weatherData?.wind?.speed} m/s</p>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.log(error))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelectedCountry(null)
    setWeatherData(null)
    
    if (filteredCountries.length === 1) {
      handleCountry(filteredCountries[0])
    }
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  )

  const handleCountry = (country) => {
    setSelectedCountry(country)
    //fetchData(country.latlng[0], country.latlng[1])
  }

  /*const fetchData = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_API_KEY
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.log(error)
    }
  }*/
    useEffect(() => {
      if (selectedCountry) {
        const apiKey = process.env.REACT_APP_API_KEY;
        const { latlng } = selectedCountry;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}&units=metric`;
  
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => setWeatherData(data))
          .catch((error) => console.log(error));
      }
    }, [selectedCountry]);


  

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries filteredCountries={filteredCountries} handleCountry={handleCountry}
      selectedCountry={selectedCountry} weatherData={weatherData}/>
    </div>
  )
}

export default App