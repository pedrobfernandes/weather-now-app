import type { CurrentWeatherDescription, UnitFormatter, CurrentCityWeatherDetails } from "../types";
import type { JSX } from "react";
import { useUnitFormatter } from "../hooks/useUnitFormatter";
import CurrentUnitDescription from "./CurrentUnitDescription";
import "./CurrentCityWeatherDetails.css";


type CurrentCityWeatherDetailsProps =
{
    cityCardsData: CurrentCityWeatherDetails;
};



export default function CurrentCityWeatherDetails(props: CurrentCityWeatherDetailsProps)
{
    const { cityCardsData } = props;
    
    const { formatTemperature, formatWindSpeed, formatPrecipitation } = useUnitFormatter();
    
    const formattedTemperature: UnitFormatter = formatTemperature(cityCardsData.feelsLike);
    const formattedWindSpeed: UnitFormatter = formatWindSpeed(cityCardsData.wind);
    const formattedPrecipitation: UnitFormatter = formatPrecipitation(cityCardsData.precipitation);
    
    const windDescription: string = 
        `${formattedWindSpeed.value} ${
            formattedWindSpeed.symbol === "mph"
                ? "miles per hour"
                : "kilometers per hour"
        }`;
    
    const  precipitationDescription: string =
        `${formattedPrecipitation.value} ${
            formattedPrecipitation.symbol === "in"
                ? "inches"
                : "millimiters"
        }`;
    
    const details: CurrentWeatherDescription[] =
    [
        {
            title: "Feels Like",
            value: formattedTemperature.value,
            unit: formattedTemperature.symbol,
            srDescription: `${formattedTemperature.value} degrees`,
        },
        
        {
            title: "Humidity",
            value: cityCardsData.humidity,
            unit: "%",
            srDescription: `${cityCardsData.humidity} percent`
        },
        
        {
            title: "Wind",
            value: formattedWindSpeed.value,
            unit: formattedWindSpeed.symbol,
            srDescription: windDescription,
        },
        
        {
            title: "Precipitation",
            value: formattedPrecipitation.value,
            unit: formattedPrecipitation.symbol,
            srDescription: precipitationDescription,
        },
    ];
    
    
    function renderDetailsCard(
        item: CurrentWeatherDescription
    ): JSX.Element
    {
        return(
            <CurrentUnitDescription
                key={item.title}
                title={item.title}
                value={item.value}
                unit={item.unit}
                srDescription={item.srDescription}
            />
        );
    }
    
    
    function getDetailsCards(): JSX.Element[]
    {
        const detailsCards: JSX.Element[] = details.map((
            item: CurrentWeatherDescription) =>
        {
            return(
                renderDetailsCard(item)
            );
        });
        
        return(detailsCards)
    }
    
    
    return(
        <section aria-labelledby="weather-metrics">
            <h3
                id="weather-metrics"
                className="visually-hidden"
            >
                Weather details
            </h3>
            <dl className="current-weather-description-container">
                {getDetailsCards()}
            
            </dl>
        </section>
    );
}
