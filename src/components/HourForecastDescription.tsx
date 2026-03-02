import type { WeatherIconData, UnitFormatter } from "../types";

type HourForecastDescriptionProps =
{
    hour: string;
    dayPeriod: string;
    temperature: UnitFormatter;
    weatherIconData: WeatherIconData;
};


export default function HourForecastDescription(props: HourForecastDescriptionProps)
{
    const { hour, dayPeriod, temperature, weatherIconData } = props;
    
    return(
        <li className="hour-forecast-card">
            <div className="hour-visual-container" aria-hidden="true">
                <div>
                    <img src={weatherIconData.src} alt={weatherIconData.alt}/>
                    <span>{hour} {dayPeriod}</span>
                </div>
                <span className="temp">{temperature.value}{temperature.symbol}</span>
            </div>
            <span className="visually-hidden">
                {weatherIconData.srDescription}.
                {hour} {dayPeriod}.
                Temperature: {temperature.value} degrees.
            </span>
        </li>
    );
}
