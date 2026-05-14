import { useEffect, useState } from "react"
import WeatherHero from '@/components/WeatherHero'
import WeatherDetails from '@/components/WeatherDetails'
import WorldWeather from '@/components/WorldWeather'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function Home() {
    const [weatherData, setWeatherData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(null)

    function fetchWeatherByCoords (lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`)
            .then(res=>{
                if (!res.ok) throw new Error('failed to fetch weather')
                    return res.json()
            })
            .then(data => {
                setWeatherData(data)
                setLoading(false)
            })
            .catch(err=> {
                setError(err.message)
                setLoading(false)
            })
    }

    function getLocation(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude
                const lon = position.coords.longitude
                fetchWeatherByCoords(lat, lon) 
            },
            (error) => {
                setError(error.message)
            }
        )
        }
        
    useEffect(() => {
    getLocation()
    }, [])

    return(
        <div>
        <WeatherHero data={weatherData} loading={isLoading} error={isError}/>
        <WeatherDetails data={weatherData} loading={isLoading}/>
        <WorldWeather/>
        </div>
    )
}
export default Home