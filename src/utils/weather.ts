import type { WeatherRule, WeatherCategory, WeatherIconData } from "../types";


const rules: WeatherRule[] =
[
    { category: "sun", match: (code) => code === 0 },
    { category: "partly-cloudy", match: (code) => code === 1 || code === 2 },
    { category: "overcast", match: (code) => code === 3 },
    { category: "fog", match: (code) => code === 45 || code === 48 },
    { category: "drizzle", match: (code) => code >= 51 && code <= 55 },
    { category: "rain", match: (code) => code >= 61 && code <= 65 },
    { category: "snow", match: (code) =>
    (code >= 71 && code <= 75) ||
    code === 77 ||
    (code >= 85 && code <= 86)
    },
    { category: "storm", match: (code) => code >= 95 && code <= 99 },
];


const iconsMapping: Record<WeatherCategory, WeatherIconData> =
{
    sun: { src: "/assets/images/icon-sunny.webp", alt: "Sunny", srDescription: "Sunny" },
    "partly-cloudy": { src: "/assets/images/icon-partly-cloudy.webp", alt: "Partly cloudy", srDescription: "Partly Cloudy" },
    overcast: { src: "/assets/images/icon-overcast.webp", alt: "Overcast", srDescription: "Overcast" },
    fog: { src: "/assets/images/icon-fog.webp", alt: "Foggy", srDescription: "Foggy" },
    drizzle: { src: "/assets/images/icon-drizzle.webp", alt: "Light drizzle", srDescription: "Light drizzle" },
    rain: { src: "/assets/images/icon-rain.webp", alt: "Rain", srDescription: "Rain" },
    snow: { src: "/assets/images/icon-snow.webp", alt: "Snow", srDescription: "Snow" },
    storm: { src: "/assets/images/icon-storm.webp",alt: "Thunderstorm", srDescription: "Thunderstorm" },
};


function getWeatherCategory(code: number): WeatherCategory
{
    for (const rule of rules)
    {
        if (rule.match(code) === true)
        {
            return(rule.category);
        }
    }
    
    return("sun");
}


export function getWeatherIcon(code: number): WeatherIconData
{
    const category: WeatherCategory = getWeatherCategory(code);
    return(iconsMapping[category]);
}
