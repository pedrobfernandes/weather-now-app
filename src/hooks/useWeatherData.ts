import { useState, useEffect } from "react";
import { formatDate } from "../utils/date";
import { getWeatherIcon } from "../utils/weather";
import type
{
    UiWeatherDetails, CityWeatherCard,
    CurrentCityWeatherDetails, HourlyForecast,
    DailyForecast, HourlyCard,
    HourlyForecastByDay,
    WeatherIconData,
    CityData, FetchForecastReturn

} from "../types";

import { mountForecastSearchUrl, fetchForecastDetails } from "../api/getWeatherData";


type UiWeatherDetailsResult =
    | { status: "IDLE" }
    | { status: "SUCCESS"; uiWeatherDetails: UiWeatherDetails }
    | { status: "ERROR"; message: string }


export function useWeatherData(selectedCity: CityData | undefined)
{
    const [uiWeatherDetails, setuiWeatherDetails] =
        useState<UiWeatherDetailsResult>({ status: "IDLE" });
    
    
    
    function fillDayWithHours(
        hours: string[],
        temperatures: number[],
        icons: WeatherIconData[]
    ): HourlyCard[]
    {
        const dayArray: HourlyCard[] = [];
        
        for (let hourIndex = 0; hourIndex < hours.length; hourIndex++)
        {
            dayArray.push({
                hour: hours[hourIndex],
                temperature: temperatures[hourIndex],
                hourWeatherIcon: icons[hourIndex]
            });
        }
        
        return(dayArray)
    }
    
    
    function getHourlyForecastByDay(
        dailyData: DailyForecast,
        hourlyData: HourlyForecast
    ): HourlyForecastByDay
    {       
        const result: HourlyForecastByDay = {};
        
        for (let dayIndex = 0; dayIndex < dailyData.days.length; dayIndex++)
        {
            const start: number = dayIndex * 24;
            const end: number = start + 24;
            
            const dayArray: HourlyCard[] = fillDayWithHours(
                hourlyData.hours.slice(start, end),
                hourlyData.temperatures.slice(start, end),
                hourlyData.hourlyWeatherIconsData.slice(start, end)
            );
            
            result[dailyData.days[dayIndex]] = dayArray;
        }
        
        return(result);
    }
    
    
    async function fetchForecast(
        coordinates: {
            latitude: number,
            longitude: number
        }
    ): Promise<FetchForecastReturn>
    {
        const url: string = mountForecastSearchUrl(coordinates);
        return(await fetchForecastDetails(url));
    }
    
    
    async function loadWeather(): Promise<void>
    {
        if (selectedCity === undefined)
        {
            setuiWeatherDetails({ status: "IDLE" });
            return;
        }
        
        const forecast: FetchForecastReturn = await fetchForecast({
            latitude: selectedCity.latitude,
            longitude: selectedCity.longitude,
        });
        
        
        if (forecast.status !== "SUCCESS")
        {
            setuiWeatherDetails({ status: "ERROR", message: forecast.message });
            return;
        }
        
        
        const cityCard: CityWeatherCard =
        {
            currentTemperature: forecast.appData.currentWeather.temperature_2m,
            currentDate: formatDate(forecast.appData.currentWeather.time, "short"),
            srCurrentDate: formatDate(forecast.appData.currentWeather.time, "long"),
            currentDateString: forecast.appData.currentWeather.time,
            currentCity: selectedCity.city,
            currentCountry: selectedCity.country,
            currentWeatherIconData: getWeatherIcon(forecast.appData.currentWeather.weather_code),
        };
        
        const currentCityDetails: CurrentCityWeatherDetails =
        {
            feelsLike: forecast.appData.currentWeather.apparent_temperature,
            humidity: forecast.appData.currentWeather.relative_humidity_2m,
            wind: forecast.appData.currentWeather.wind_speed_10m,
            precipitation: forecast.appData.currentWeather.precipitation,
        };
        
        const dailyForecast: DailyForecast =
        {
            days: forecast.appData.dailyTemperatures.time,
            maxTemperatures: forecast.appData.dailyTemperatures.temperature_2m_max,
            minTemperatures: forecast.appData.dailyTemperatures.temperature_2m_min,
            dailyWeatherIconsData: forecast.appData.dailyTemperatures
                .weather_code.map(code => getWeatherIcon(code)),
        }
        
        const hourlyForecast: HourlyForecast =
        {
            hours: forecast.appData.hourlyTemperatures.time,
            temperatures: forecast.appData.hourlyTemperatures.temperature_2m,
            hourlyWeatherIconsData: forecast.appData.hourlyTemperatures
                .weather_code.map(code => getWeatherIcon(code)),
        };
        
        const uiWeatherDetails: UiWeatherDetails =
        {
            cityData: cityCard,
            cityCardsData: currentCityDetails,
            dailyForecastData: dailyForecast,
            hourlyForecastByDay: getHourlyForecastByDay(
                dailyForecast, hourlyForecast),
        };
        
        setuiWeatherDetails({ status: "SUCCESS", uiWeatherDetails: uiWeatherDetails });
    }
    
    
    useEffect(() =>
    {
        if (selectedCity === undefined)
        {
            return;
        }
        
        loadWeather();
    
    }, [selectedCity]);
    
    return({uiWeatherDetails});
}
