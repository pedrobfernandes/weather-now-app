import { z } from "zod";
import type
{
    ApiWeatherResponse,
    WeatherResponse,
    UrlCoordinatesParameter,
    FetchForecastReturn

} from "../types";


// zod
const CurrentWeatherSchema = z.object({
    apparent_temperature: z.number(),
    precipitation: z.number(),
    relative_humidity_2m: z.number(),
    temperature_2m: z.number(),
    time: z.string(),
    weather_code: z.number(),
    wind_speed_10m: z.number(),
});


const DailyTemperaturesSchema = z.object({
    temperature_2m_max: z.array(z.number()),
    temperature_2m_min: z.array(z.number()),
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
});


const HourlyTemperaturesSchema = z.object({
    temperature_2m: z.array(z.number()),
    time: z.array(z.string()),
    weather_code: z.array(z.number()),
});


const ApiWeatherResponseSchema = z.object({
    current: CurrentWeatherSchema,
    daily: DailyTemperaturesSchema,
    hourly: HourlyTemperaturesSchema,
});


// Parametros para a url
const currentParameters: string[] =
[
    "apparent_temperature",
    "precipitation",
    "relative_humidity_2m",
    "temperature_2m",
    "wind_speed_10m",
    "weather_code",
];


const dailyParameters: string[] =
[
    "temperature_2m_max",
    "temperature_2m_min",
    "weather_code",
];


const hourlyParameters: string[] =
[
    "temperature_2m",
    "weather_code",
];


export function mountForecastSearchUrl(
    urlCoordinatesParameter: UrlCoordinatesParameter
): string
{
    const forecastEndpoint: string = "https://api.open-meteo.com/v1/forecast";
    const url: URL = new URL(forecastEndpoint);
    url.search = new URLSearchParams({
        latitude: urlCoordinatesParameter.latitude.toString(),
        longitude: urlCoordinatesParameter.longitude.toString(),
        current: currentParameters.join(","),
        daily: dailyParameters.join(","),
        hourly: hourlyParameters.join(","),
    
    }).toString();
    
    return(url.toString());
}


export async function fetchForecastDetails(
    url: string):
Promise<FetchForecastReturn>
{
    try
    {
        const response: Response = await fetch(url);
        
        if (response.ok === false)
        {
            return({
                status: "API ERROR",
                message: "It seems to be an error with de Api." +
                " Please try again later.", 
            });
        }
        
        const data: ApiWeatherResponse = await response.json();
        const parseResult = ApiWeatherResponseSchema.safeParse(data);
        
        
        if (
            parseResult.success === false ||
            parseResult.data.current === undefined ||
            parseResult.data.daily === undefined ||
            parseResult.data.hourly === undefined ||
            parseResult.data.daily.temperature_2m_max.length === 0 ||
            parseResult.data.daily.temperature_2m_min.length === 0 ||
            parseResult.data.hourly.temperature_2m.length === 0 ||
            parseResult.data.hourly.time.length === 0 ||
            parseResult.data.hourly.weather_code.length === 0
        )
        {
            return({
                status: "NOT FOUND",
                message: "No forecast results available",
            });
        }
        
        
        const weatherResponse: WeatherResponse =
        {
            currentWeather: parseResult.data.current,
            dailyTemperatures: parseResult.data.daily,
            hourlyTemperatures: parseResult.data.hourly,
        };
        
        return({
            data: parseResult.data,
            appData: weatherResponse,
            status: "SUCCESS",
        });
        
        
    }
    catch
    {
        return({
            status: "NETWORK ERROR",
            message: "Network error. Please check" +
            " your connection and try again.",
        });
    }
}
