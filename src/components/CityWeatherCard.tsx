import type { UnitFormatter, CityWeatherCard } from "../types";
import { useUnitFormatter } from "../hooks/useUnitFormatter";
import "./CityWeatherCard.css";


type CityWeatherCardProps =
{
    cityData: CityWeatherCard;
    summaryRef: React.RefObject<HTMLDivElement | null>;
};


export default function CityWeatherCard(props: CityWeatherCardProps)
{
    const { cityData, summaryRef } = props;
    
    const { formatTemperature } = useUnitFormatter();
    const formattedTemperature: UnitFormatter =
        formatTemperature(cityData.currentTemperature);
    
    return(
        <article>
            <div
                className="visually-hidden"
                ref={summaryRef}
                tabIndex={-1}
            >
                {cityData.currentCity}, {cityData.currentCountry}.
                {cityData.srCurrentDate}.
                {cityData.currentWeatherIconData.srDescription}.
                Temperature: {formattedTemperature.value} degrees.
            </div>
            
            <header
                className="city-card-header"
                aria-hidden="true"
            >
                <h2>
                    {cityData.currentCity}, {cityData.currentCountry}
                </h2>
                <p>
                    <time
                        dateTime={cityData.currentDateString}
                    >
                        {cityData.currentDate}
                    </time>
                </p>
            </header>
            
            <div className="city-card-temperature" aria-hidden="true">
                <img
                    src={cityData.currentWeatherIconData.src}
                    alt={cityData.currentWeatherIconData.alt}
                />
                <span>
                    {formattedTemperature.value}{formattedTemperature.symbol}
                </span>
            </div>
        </article>
    );
}
