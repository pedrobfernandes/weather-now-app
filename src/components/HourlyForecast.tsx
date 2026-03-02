import { useState, type JSX } from "react";
import HourForecastDescription from "./HourForecastDescription";
import { getHourAndPeriod, formattedDay } from "../utils/date";
import { useUnitFormatter } from "../hooks/useUnitFormatter";
import * as Select from "@radix-ui/react-select";
import { IconDropdown } from "../icons/IconDropdown";
import { IconCheckmark } from "../icons/IconCheckmark";
import type { DaysFormat, HourlyCard, HourlyForecastByDay } from "../types";

import "./HourlyForecast.css";
import "./RadixSelect.css";


type HourlyForecastProps =
{
    hourlyForecastByDay: HourlyForecastByDay;
    days: string[];
};


export default function HourlyForecast(props: HourlyForecastProps)
{
    const { hourlyForecastByDay, days } = props;
    const [selectedDay, setSelectedDay] = useState<string>(days[0]);
    const { formatTemperature } = useUnitFormatter();
    
      
    const daysSelector: DaysFormat[] = days.map((day: string) =>
    {
        return({
            label: formattedDay(day, "long"),
            isoDay: day,
        });
    });
    
    
    function renderDaySelectorOptions(): JSX.Element[]
    {
        const options: JSX.Element[] = daysSelector.map((day: DaysFormat) =>
        {
            return(
                <Select.Item
                    className="radix-select-item"
                    key={day.isoDay}
                    value={day.isoDay}
                >
                    <Select.ItemText>
                        {day.label}
                    </Select.ItemText>
                    <Select.ItemIndicator>
                        <IconCheckmark/>
                    </Select.ItemIndicator>
                </Select.Item>
            );
        });
        
        return(options);
    }
    
    
    function getHourForecastDescriptionCards(): JSX.Element[]
    {
        const cards: JSX.Element[] = hourlyForecastByDay[selectedDay].map(
            (item: HourlyCard) =>
        {
            const { hour, period } = getHourAndPeriod(item.hour);
            return(
                <HourForecastDescription
                    key={item.hour}
                    hour={hour}
                    dayPeriod={period}
                    temperature={formatTemperature(item.temperature)}
                    weatherIconData={item.hourWeatherIcon}
                />
            );
        });
        
        return(cards);
    }
 
    return(
        <section aria-labelledby="hourly-forecast-title">
            <div className="hourly-forecast-section-container">
                <div className="hourly-forecast-header-container">
                    <h3 id="hourly-forecast-title">Hourly forecast</h3>
                        <span
                            className="visually-hidden"
                            id="day-selector-label"
                        >
                            Choose a day from the list
                        </span>
                        <Select.Root
                            value={selectedDay}
                            onValueChange={setSelectedDay}
                        >
                            <Select.Trigger
                                className="day-selector"
                                aria-describedby="day-selector-label"
                            >
                                <Select.Value/>
                                <Select.Icon>
                                    <IconDropdown/>
                                </Select.Icon>
                            </Select.Trigger>
                            <Select.Content
                                position="popper"
                                align="start"
                                className="radix-selector-content day-selector-content"
                            >
                                <Select.Viewport>
                                    {renderDaySelectorOptions()}
                                </Select.Viewport>
                            </Select.Content>
                        </Select.Root>
                </div>
                <ul className="hourly-forecast-container">
                    {getHourForecastDescriptionCards()}
                </ul>
            </div>
        </section>
    );
}
