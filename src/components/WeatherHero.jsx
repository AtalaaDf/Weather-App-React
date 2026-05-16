import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

function WeatherHero({data, loading, error}) {

    if(loading) return (
    <Card className="mt-2 mb-3 w-full shadow-sm rounded-2xl">
        <CardContent>
            <Skeleton className="h-8 w-48 mb-6" />  {/* nama kota */}
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" /> {/* icon */}
                    <Skeleton className="h-12 w-24" /> {/* suhu */}
                </div>
                <div className="flex flex-col gap-2 items-end">
                    <Skeleton className="h-6 w-32" /> {/* hari */}
                    <Skeleton className="h-4 w-40" /> {/* feels like */}
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Skeleton className="h-4 w-64 mx-auto" /> {/* deskripsi */}
        </CardFooter>
    </Card>
)
    if(error) return <div className="text-red-500">error : {error}</div>
    if(!data) return null

    const today = new Date().toLocaleDateString('id-ID',{
        weekday: 'long',
        day: 'numeric',
        month: 'short'
    })

    return (
        <Card className="mt-2 mb-3 w-full shadow-sm rounded-2xl">

            <CardContent className={"px-8 pt-6"}>

            <h1 className="text-2xl">
                {data.name},
                <span className="ml-2 bg-accent rounded-lg px-2 py-1">
                    {data.sys.country}
                    </span>
            </h1>

            <div className="flex justify-between items-start">

            <div className="mt-6 flex items-center gap-4">
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Icon" 
            className="w-24 h-24"/>
            <h2 className="text-5xl">
                {Math.round(data.main.temp)}°
            </h2>
            </div>

            <div className="flex flex-col items-end">
                <p>{today}</p>
                <br />
                <p>Terasa seperti {Math.round(data.main.feels_like)}°C</p>
            </div>

            </div>
            </CardContent>

            <CardFooter className={"flex items-center justify-center border-t"}>

            <p className="text-center pt-4 text-muted-foreground italic">
                {data.weather[0].description}
            </p>
            
            </CardFooter>

        </Card>
    )
}

export default WeatherHero