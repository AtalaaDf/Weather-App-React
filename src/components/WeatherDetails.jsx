import { Wind, Droplets, Eye, Cloudy, Gauge, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function getWindDirection(deg) {
    const directions = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 
                       'Selatan', 'Barat Daya', 'Barat', 'Barat Laut']
    return directions[Math.round(deg / 45) % 8]
}

function WeatherDetails({data, loading}) {
    
    if (loading) return(
        <Card>
            <CardContent>
                <div className="grid grid-cols-4 gap-3">
                    <Skeleton className="col-span-3 h-32 rounded-xl"/>
                    <Skeleton className="col-span-1 h-32 rounded-xl"/>
                </div>
                <div className="grid grid-cols-4 gap-3 mt-3">
                    <Skeleton className="h-24 rounded-xl"/>
                    <Skeleton className="h-24 rounded-xl"/>
                    <Skeleton className="h-24 rounded-xl"/>
                    <Skeleton className="h-24 rounded-xl"/>
                </div>
            </CardContent>
        </Card>
    )
    if (!data) return null

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit'
})
const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('id-ID', {
    hour: '2-digit', minute: '2-digit'
})
const windSpeed = Math.round(data.wind.speed * 3.6)
const windDirection = getWindDirection(data.wind.deg) 

const visibility = (data.visibility / 1000).toFixed(1)
const min = Math.round(data.main.temp_min)
const max = Math.round(data.main.temp_max)
    
    
    return (
        <Card>
            <CardContent>
                <h2 className="text-lg font-medium mb-3">Detail cuaca</h2>
    
                <div className="grid grid-cols-4 gap-3">

                    <Card className="col-span-3 items-start flex gap-6">
                        <CardContent className={"flex items-center gap-12"}>
                            <div>
                            <Sunrise className='h-16 w-16 text-yellow-300'/>
                                <p className='text-sm text-muted-foreground'>Matahari Terbit</p>
                                <p className='text-xl font-medium'>{sunrise}</p>
                            </div>
                            <div className='w-px h-12 bg-border'/>
                            <div>
                            <Sunset className='h-16 w-16 text-yellow-300'/>
                                <p className='text-sm text-muted-foreground'>Matahari Terbenam</p>
                                <p className='text-xl font-medium'>{sunset}</p>
                            </div>
                            <div className='w-px h-12 bg-border'/>
                            <div className='flex gap-4 items-center'>
                                <div className='text-center'>
                                    <p className='text-blue-500'>Min</p>
                                    <p className='text-xl font-medium'>{min}°</p>
                                </div>
                                <div className='text-center'>
                                    <p className='text-red-500'>Max</p>
                                    <p className='text-xl font-medium'>{max}°</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={"items-center col-span-1"}>   
                        <CardContent className={"flex flex-col items-center justify-center text-center"}>
                            <Wind className='h-8 w-8 text-sky-300'/>
                            <p className='text-sm text-muted-foreground'>Angin</p>
                            <p className='text-xl font-medium'>{windSpeed} km/h</p>
                            <p className='text-xl font-medium'>Arah : {windDirection}</p>
                        </CardContent>
                    </Card>

                </div>

                <div className="grid grid-cols-4 gap-3 mt-3">
                <Card className={"items-center"}>
                    <CardContent className={"flex flex-col items-center justify-center text-center"}>
                    <Droplets className="h-6 w-6 text-blue-400"/>
                    <p className='text-sm text-muted-foreground'>kelembaban</p>
                    <p className='text-xl font-medium'>{data.main.humidity}%</p>
                    </CardContent>
                </Card>
                <Card className={"items-center"}>
                    <CardContent className={"flex flex-col items-center justify-center text-center"}>
                        <Eye className="h-6 w-6 text-blue-400"/>
                        <p className='text-sm text-muted-foreground'>jarak pandang</p>
                        <p className='text-xl font-medium'>{visibility} km</p>
                    </CardContent>
                </Card>
                <Card className={"items-center"}>
                    <CardContent className={"flex flex-col items-center justify-center text-center"}>
                        <Cloudy className="h-6 w-6 text-blue-400"/>
                        <p className='text-sm text-muted-foreground'>tutupan awan</p>
                        <p className='text-xl font-medium'>{data.clouds.all}%</p>
                    </CardContent>
                </Card>
                <Card className={"items-center"}>
                    <CardContent className={"flex flex-col items-center justify-center text-center"}>
                        <Gauge className="h-6 w-6 text-blue-400"/>
                        <p className='text-sm text-muted-foreground'>tekanan udara</p>
                        <p className='text-xl font-medium'>{data.main.pressure} hPa</p>
                    </CardContent>
                </Card>
                </div>

            </CardContent>
        </Card>
    )
}

export default WeatherDetails