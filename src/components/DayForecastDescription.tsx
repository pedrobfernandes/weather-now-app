import type { WeatherIconData, UnitFormatter } from "../types";

type DayForecastDescriptionProps =
{
    shortDay: string;
    longDay: string;
    weatherIconData: WeatherIconData;
    maxTemperature: UnitFormatter;
    minTemperature: UnitFormatter;
};


export default function DayForecastDescription(props: DayForecastDescriptionProps)
{
    const { shortDay, longDay, weatherIconData, maxTemperature, minTemperature } = props;
    
    return(
        <li className="day-forecast-container">
            <div className="day-visual-container" aria-hidden="true">
                <strong
                    className="day-name"
                >
                    {shortDay}
                </strong>
            
                <img
                    src={weatherIconData.src}
                    alt={weatherIconData.alt}
                />
                
                <div className="day-temperatures-container">
                    <span>{maxTemperature.value}{maxTemperature.symbol}</span>
                    <span>{minTemperature.value}{minTemperature.symbol}</span>
                </div>
            </div>
            <span className="visually-hidden">
                {longDay}. {weatherIconData.srDescription}.
                Maximum temperature: {maxTemperature.value} degrees.
                Minimum temperature: {minTemperature.value} degrees.
            </span>
        </li>
    );
}
