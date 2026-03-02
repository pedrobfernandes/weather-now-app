export type Unit = "metric" | "imperial";


export type UnitFormatter =
{
    value: number,
    symbol: string;
};


export type WeekdayFormat = "short" | "long";


export type CurrentWeather =
{
    apparent_temperature: number;
    precipitation: number;
    relative_humidity_2m: number;
    temperature_2m: number;
    time: string;
    weather_code: number;
    wind_speed_10m: number;

};


export type DailyTemperatures =
{
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    weather_code: number[];
};


export type HourlyTemperatures =
{
    temperature_2m: number[];
    time: string[];
    weather_code: number[];
};


export type CityWeatherCard =
{
    currentTemperature: number;
    currentDate: string;
    srCurrentDate: string;
    currentDateString: string;
    currentCity: string;
    currentCountry: string;
    currentWeatherIconData: WeatherIconData;
};


export type CurrentCityWeatherDetails =
{
    feelsLike: number;
    humidity: number;
    wind: number;
    precipitation: number;
};


export type DailyForecast =
{
    days: string[];
    maxTemperatures: number[];
    minTemperatures: number[];
    dailyWeatherIconsData: WeatherIconData[];
};


export type HourlyCard =
{
    hour: string;
    temperature: number;
    hourWeatherIcon: WeatherIconData;
}


export type HourlyForecast =
{
    hours: string[];
    temperatures: number[];
    hourlyWeatherIconsData: WeatherIconData[];
};


export type HourlyForecastByDay = Record<string, HourlyCard[]>;


export type UiWeatherDetails =
{
    cityData: CityWeatherCard;
    cityCardsData: CurrentCityWeatherDetails;
    dailyForecastData: DailyForecast;
    hourlyForecastByDay: HourlyForecastByDay;
};


export type CurrentWeatherDescription =
{
    title: string;
    value: number;
    unit: string;
    srDescription: string;
};


export type DailyForecastDescription =
{
    shortDay: string;
    longDay: string;
    maxTemperature: number;
    minTemperature: number;
    weatherIconData: WeatherIconData;
};


export type DaysFormat =
{
    label: string;
    isoDay: string;
}


export type ApiWeatherResponse =
{
    current: CurrentWeather;
    daily: DailyTemperatures;
    hourly: HourlyTemperatures;
};



export type WeatherResponse =
{
    currentWeather: CurrentWeather;
    dailyTemperatures: DailyTemperatures;
    hourlyTemperatures: HourlyTemperatures;
};


export type GeocodingResult =
{
    name: string;
    latitude: number;
    longitude: number;
    country: string;
}

export type GeocodingResults =
{
    results: GeocodingResult[];
};


export type CityData =
{
    latitude: number;
    longitude: number;
    city: string;
    country: string;
}

export type UrlCityParameter =
{
    city: string;
};

export type UrlCoordinatesParameter =
{
    latitude: number;
    longitude: number;
};


export type FetchCitiesReturn =
    | { status: "SUCCESS"; data: GeocodingResults }
    | { status: "API ERROR"; message: string; }
    | { status: "NOT FOUND"; message: string; }
    | { status: "NETWORK ERROR"; message: string; }



export type FetchForecastReturn =
    | { status: "SUCCESS"; data: ApiWeatherResponse; appData: WeatherResponse }
    | { status: "API ERROR"; message: string; }
    | { status: "NOT FOUND"; message: string; }
    | { status: "NETWORK ERROR"; message: string; }



export type WeatherCategory =
    | "sun"
    | "partly-cloudy"
    | "overcast"
    | "drizzle"
    | "rain"
    | "snow"
    | "fog"
    | "storm";


export type WeatherRule =
{
    category: WeatherCategory;
    match: (code: number) => boolean;
};


export type WeatherIconData =
{
    src: string;
    alt: string;
    srDescription: string;
}
