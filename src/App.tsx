import { useState, useEffect, useRef, type JSX } from "react";
import Header from "./components/Header";
import CitySearchForm from "./components/CitySearchForm";
import CityWeatherCard from "./components/CityWeatherCard";
import CurrentCityWeatherDetails from "./components/CurrentCityWeatherDetails";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import MockWeatherUi from "./components/MockWeatherUi";
import { useWeatherData } from "./hooks/useWeatherData";
import { useModal } from "./context/InfoModalContext";
import type { CityData } from "./types";



export default function App()
{
    const [selectedCity, setSelectedCity] = useState<CityData | undefined>(undefined);
    const { uiWeatherDetails } = useWeatherData(selectedCity);
    const { alert } = useModal();
    const summaryRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
    
    
    function renderRealOrMockUi(): JSX.Element | undefined
    {
        if (uiWeatherDetails.status === "IDLE")
        {
            return(<MockWeatherUi/>);
        }
        
        
        if (uiWeatherDetails.status === "SUCCESS")
        {
            return(
                <div className="city-forecast-wrapper">
                    <div className="grid-left-top">
                        <CityWeatherCard
                            cityData={uiWeatherDetails.uiWeatherDetails.cityData}
                            summaryRef={summaryRef}
                        />
                        <CurrentCityWeatherDetails
                            cityCardsData={uiWeatherDetails.uiWeatherDetails.cityCardsData}
                        />
                        <DailyForecast
                            dailyForecastData={uiWeatherDetails.uiWeatherDetails.dailyForecastData}
                        />
                    </div>
                    <div className="grid-right-bottom">
                        <HourlyForecast
                            hourlyForecastByDay={uiWeatherDetails.uiWeatherDetails.hourlyForecastByDay}
                            days={uiWeatherDetails.uiWeatherDetails.dailyForecastData.days}
                        />
                    </div>
                    
                </div>
            );
        }
    }
    
    
    function handleSetSelectedCity(city: CityData): void
    {
        setSelectedCity(city);
    }
    
    
    function handleShowError(message: string): void
    {
        alert(message);
    }
    
    
    useEffect(() =>
    {
        if (uiWeatherDetails.status === "ERROR")
        {
            handleShowError(uiWeatherDetails.message);
            return;
        }
    
    }, [uiWeatherDetails]);
    

    useEffect(() =>
    {
        if (uiWeatherDetails.status === "SUCCESS")
        {
            setTimeout(() =>
            {
                if (summaryRef.current !== null)
                {
                    summaryRef.current.focus();
                }
            });
        }
    
    }, [uiWeatherDetails]);
   
    
    return(
        <div className="app-wrapper">
            <Header/>
            <main>
                <h1 className="visually-hidden">
                    Weather Now Forecast Application
                </h1>
                <span className="hero-text">
                    How's the sky looking today?
                </span>
                <CitySearchForm
                    handleSetSelectedCity={handleSetSelectedCity}
                    handleShowError={handleShowError}
                />
                {renderRealOrMockUi()}
            </main>
        </div>
    );
}
