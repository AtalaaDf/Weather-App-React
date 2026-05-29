import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bookmark, BookmarkOff, Globe } from 'lucide-react'

const pool = ['Tokyo', 'London', 'New York', 'Dubai', 
            'Paris', 'Sydney', 'Seoul', 'Cairo']

            function getDisplayCities(pinnedCities){
                const available = pool.filter(c => !pinnedCities.includes(c))
                const shuffled = [...available].sort(() => Math.random() - 0.5)
                const needed = 4 - pinnedCities.length
                const randomFill = shuffled.slice(0, needed)
                return [...pinnedCities, ...randomFill]
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

    function togglePin(kota){
        const updated = pinnedCities.includes(kota)
        ? pinnedCities.filter(c => c !== kota)
        : [...pinnedCities, kota]
        setPinnedCity(updated)
        localStorage.setItem('pinnedCities', JSON.stringify(updated))
    }

        if(loading) return (
        <div className="grid grid-cols-4 gap-3">
        <Skeleton className="h-48 rounded-xl"/>
        <Skeleton className="h-48 rounded-xl"/>
        <Skeleton className="h-48 rounded-xl"/>
        <Skeleton className="h-48 rounded-xl"/>
        </div>
)

    return (
        <div className="mt-2">
            <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-blue-500"/>
            <h2 className="text-lg font-medium">World Weather</h2>
            </div>
        <div className="grid grid-cols-4 gap-3">

        {citiesData.map((city) => (
            <Card key={city.id}>
                <CardContent className={"flex flex-col items-center text-center"}>

                    <div className="">
                        <img src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="Icon" 
                        className="w-24 h-24"/>
                    </div>

                    <h1 className="text-2xl">
                        {city.name}
                    </h1>

                    <div className="text-sm text-muted-foreground">
                        {city.sys.country}
                    </div>

                    <div className="text-4xl font-medium">{Math.round(city.main.temp)}°</div>
                    
                    <Button variant="ghost" onClick={() => togglePin(city.name)}>
                        {pinnedCities.includes(city.name) 
                        ? <><Bookmark className="h-4 w-4"/> Unpin</>
                        : <><BookmarkOff className="h-4 w-4"/> Pin</>
                        }
                    </Button>
                </CardContent>

                <CardFooter className={"flex items-center justify-center border-t"}>

            <p className="text-center pt-4 text-muted-foreground italic">
                {city.weather[0].description}
            </p>
            
            </CardFooter>
            </Card>
        ))}
        </div>
        </div>
    )
}

export default WorldWeather