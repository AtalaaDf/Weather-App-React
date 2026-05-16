function WeatherHero({data, loading, error}) {

    if(loading) return <div>Loading...</div>
    if(error) return <div className="text-red-500">error : {error}</div>
    if(!data) return null

    const today = new Date().toLocaleDateString('id-ID',{
        weekday: 'long',
        day: 'numeric',
        month: 'short'
    })

    return (
        <div className="mt-2 mb-3">
            <h1 className="text-2xl ml-6">
                {data.name},
                <span className="ml-2 bg-sky-600 rounded-lg px-2 py-1">
                    {data.sys.country}
                    </span>
            </h1>

            <div className="flex justify-between items-start ml-6">

            <div className="mt-6 flex items-center gap-4">
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Icon" />
            <h2>
                {Math.round(data.main.temp)}°
            </h2>
            </div>

            <div className="flex flex-col items-end mr-6">
                <p>{today}</p>
                <br />
                <p>Terasa seperti {Math.round(data.main.feels_like)}°C</p>
            </div>

            </div>

            <div className="text-center border-t mt-4 pt-4 text-muted-foreground italic">
                {data.weather[0].description}
            </div>

        </div>
    )
}

export default WeatherHero