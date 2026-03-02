import { useState, useEffect } from "react";
import { mountCitySearchUrl, fetchCities } from "../api/getCityData";
import type { CityData, FetchCitiesReturn } from "../types";


type CitiesResult =
    | { status: "IDLE" }
    | { status: "SUCCESS"; cities: CityData[] }
    | { status: "ERROR"; message: string }



export function useGeocodingData(city: string)
{
    const [cities, setCities] = useState<CitiesResult>({ status: "IDLE" });
    
    
    async function fetchCoordinates():
        Promise<void>
    {
        if (city.trim() === "")
        {
            setCities({ status: "IDLE" });
            return;
        }
        
        const url: string = mountCitySearchUrl({city: city});
        const results: FetchCitiesReturn = await fetchCities(url);
        
        if (results.status !== "SUCCESS")
        {
            console.log("GEOCODING RESULT:", results);
            setCities({ status: "ERROR", message: results.message });
            return;
        }
        
        
        const citiesData: CityData[] = results.data.results.map((item) =>
        {
            return({
                latitude: item.latitude,
                longitude: item.longitude,
                city: item.name,
                country: item.country,
            });
        });
        
        console.log("GEOCODING RESULT:", results);
        setCities({ status: "SUCCESS", cities: citiesData });
    }
    
    
    useEffect(() =>
    {
        fetchCoordinates();
    
    }, [city]);
    
    return({cities});

}
