import DayForecastDescription from "./DayForecastDescription";
import { useUnitFormatter } from "../hooks/useUnitFormatter";
import { formattedDay } from "../utils/date";
import type { JSX } from "react";
import type { DailyForecastDescription, DailyForecast, UnitFormatter } from "../types";

import "./DailyForecast.css";


type DailyForecastProps =
{
    dailyForecastData: DailyForecast;
};


export default function DailyForecast(props: DailyForecastProps)
{
    const { dailyForecastData } = props;
    const { formatTemperature } = useUnitFormatter();
    
    
    const dailyForecastDescriptions: DailyForecastDescription[] =
        dailyForecastData.days.map((day: string, index: number) =>
        {
            return({
                shortDay: day,
                longDay: day,
                weatherIconData: dailyForecastData.dailyWeatherIconsData[index],
                maxTemperature:  dailyForecastData.maxTemperatures[index],
                minTemperature: dailyForecastData.minTemperatures[index],
            });
        });
    
    
    function renderDayForecastCard(
        item: DailyForecastDescription
    ): JSX.Element
    {
        const formattedMaxTemperature: UnitFormatter = formatTemperature(item.maxTemperature)
        const formattedMinTemperature: UnitFormatter = formatTemperature(item.minTemperature);
        return(
            <DayForecastDescription
                key={item.shortDay}
                shortDay={formattedDay(item.shortDay, "short")}
                longDay={formattedDay(item.longDay, "long")}
                weatherIconData={item.weatherIconData}
                maxTemperature={formattedMaxTemperature}
                minTemperature={formattedMinTemperature}
            />
        );
    }
    
    
    function getDayForecastCards(): JSX.Element[]
    {
        const dayForecastCards: JSX.Element[] = dailyForecastDescriptions.map(
            (item: DailyForecastDescription) =>
        {
            return(renderDayForecastCard(item));
        });
        
        return(dayForecastCards);
    }
    
    
    return(
        <section aria-labelledby="daily-forecast-title">
            <h3 id="daily-forecast-title">Daily Forecast</h3>
            
            <ul className="daily-forecast-container">
                {getDayForecastCards()}
            </ul>
            
        </section>
    );
}
