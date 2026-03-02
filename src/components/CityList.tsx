import { useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import type { KeyboardEvent } from "react";
import type { CityData } from "../types";
import "./CityList.css";


type CityListProps =
{
    cities: CityData[];
    handleCitySelection: (city: CityData) => void;
    isListOpen: boolean;
    handleCloseCitiesList: () => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
};


export default function CityList(props: CityListProps)
{
    const { cities, handleCitySelection, isListOpen, handleCloseCitiesList, inputRef } = props;
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const listRef = useRef<HTMLUListElement | null>(null);
    
    
    function getNetxIndex(value: number, direction: string): number
    {
        if (direction === "down")
        {
            if (value < cities.length - 1)
            {
                return(value + 1);
            }
            
            return(0)
        }
        
        if (value > 0)
        {
            return(value - 1);
        }
        
        return(cities.length - 1);
    }
    
    
    function handleKeyDown(
        event: KeyboardEvent<HTMLUListElement>
    ): void
    {
        if (isListOpen === false)
        {
            return;
        }
        
        
        if (event.key === "Escape")
        {
            handleCloseCitiesList();
            
            setTimeout(() =>
            {
                if (inputRef.current !== null)
                {
                    inputRef.current.focus();
                }
            
            }, 0);
        }
        
        
        if (event.key === "Tab")
        {
            handleCloseCitiesList();
        }
        
        
        if (event.key === "ArrowDown")
        {
            event.preventDefault();
            setActiveIndex((previous) =>
            {
                const nextIndex: number = getNetxIndex(previous, "down");
                return(nextIndex);
            });
        }
        
        if (event.key === "ArrowUp")
        {
            event.preventDefault();
            setActiveIndex((previous) =>
            {
                const nextIndex: number = getNetxIndex(previous, "up");
                return(nextIndex)
            });
        }
        
        if (event.key === "Enter" && activeIndex >= 0)
        {
            handleCitySelection(cities[activeIndex]);
        }
    }
    
    
    useEffect(() =>
    {
        if (isListOpen === true && listRef.current !== null)
        {
            listRef.current.focus();
            setActiveIndex(0);
        }
    
    }, [isListOpen]);
    
    
    useEffect(() =>
    {
        if (activeIndex < 0)
        {
            return;
        }
        
        const activeElement = document.getElementById(`city-option-${activeIndex}`);
        if (activeElement !== null)
        {
            activeElement.scrollIntoView({ block: "nearest" });
        }
    
    }, [activeIndex]);
    
    
    function renderCityListChoices(): JSX.Element[]
    {
        const citiesList = cities.map((cityOption, index) =>
        {
            return(
                <li
                    id={`city-option-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    key={`${cityOption.latitude}-${cityOption.longitude}`}
                    onClick={() => handleCitySelection(cityOption)}
                    className={index === activeIndex ? "active" : ""}
                >
                   {cityOption.city}, {cityOption.country}
                </li>
            );
        });
        
        return(citiesList);
    }
    
    
    return(
        <>
        <ul className="cities-list-dropdown"
            aria-labelledby="list-description"
            role="listbox"
            tabIndex={0}
            ref={listRef}
            onKeyDown={handleKeyDown}
            aria-activedescendant={activeIndex >= 0 ? `city-option-${activeIndex}` : undefined}
            aria-label="Cities results"
        >
            {renderCityListChoices()}
        </ul>
        </>
    );
}
