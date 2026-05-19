import { useEffect, useState } from "react"

const pool = ['Tokyo', 'London', 'New York', 'Dubai', 
            'Paris', 'Sydney', 'Seoul', 'Cairo']

            function getDisplayCities(pinnedCities){
                if (pinnedCities.length === 0) {
                    return [...pool].sort(() => Math.random() - 0.5).slice(0, 4)
                } else{
                    return pinnedCities
                }
            }

            const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

function WorldWeather() {
    const [citiesData, setCitiesData]= useState([])
    const [loading, setLoading]= useState(true)
    const [pinnedCities, setPinnedCity]= useState(
        JSON.parse(localStorage.getItem('pinnedCities') || '[]')
    )

async function fetchCitiesWeather(cities){
        setLoading(true)
        try {
            const result = await Promise.all(
                cities.map(async(city)=> {
                    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`)
                    return res.json()
                })
            )
            setCitiesData(result)
        } catch (error) {
            console.error("gagal fetch data:", error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const cities = getDisplayCities(pinnedCities)
        fetchCitiesWeather(cities)
    }, [])

    return (
        <div>World Weather</div>
    )
}

export default WorldWeather