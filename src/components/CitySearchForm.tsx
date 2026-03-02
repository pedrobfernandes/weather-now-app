import { useState, useEffect, useRef, type JSX } from "react";
import CityList from "./CityList";
import { useGeocodingData } from "../hooks/useGeocodingData";
import "./CitySearchForm.css";
import type { CityData } from "../types";



type CitySearchFormProps =
{
    handleSetSelectedCity: (city: CityData) => void;
    handleShowError: (message: string) => void;
}


export default function CitySearchForm(props: CitySearchFormProps)
{
    const { handleSetSelectedCity, handleShowError } = props;

    const [inputValue, setInputValue] = useState<string>("");
    const [searchedCity, setSearchedCity] = useState<string>("");
    const [isListOpen, setIsListopen] = useState<boolean>(false);
    
    const { cities } = useGeocodingData(searchedCity);
    
    
    const inputRef: React.RefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    
    
    function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>): void
    {
        event.preventDefault();
        if (inputValue.trim() === "")
        {
            return;
        }
        
        setSearchedCity(inputValue);
        setInputValue("");
    }
    
    
    function handleCloseCitiesList(): void
    {
        setSearchedCity("");
        setIsListopen(false);
    }
    
    
    function handleCitySelection(city: CityData): void
    {
        handleSetSelectedCity(city);
        handleCloseCitiesList();
    }
    
    
    function renderCityChoiceDropdown(): JSX.Element | undefined
    {
        
        if (cities.status === "SUCCESS")
        {
            return(
                <CityList
                    cities={cities.cities}
                    handleCitySelection={handleCitySelection}
                    isListOpen={isListOpen}
                    handleCloseCitiesList={handleCloseCitiesList}
                    inputRef={inputRef}
                />
            );
        }
    }
    
    
    useEffect(() =>
    {
        if (cities.status === "ERROR")
        {
            handleShowError(cities.message);
            return;
        }
    
    }, [cities]);
    
    useEffect(() =>
    {
        if (cities.status === "SUCCESS")
        {
            setIsListopen(true);
        }
    
    }, [cities]);
    
    
    return(
        <form onSubmit={handleSubmit}>
            <label
                htmlFor="city-input"
                className="visually-hidden"
            >
                Search for a city to see the weather
            </label>
            <input
                ref={inputRef}
                id="city-input"
                type="text"
                placeholder="Search for a place"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            <button type="submit">
                Search
            </button>
            {renderCityChoiceDropdown()}
        </form>
    );
}
