import { useUnit } from "../context/UnitContext";
import { celsiusToFahrenheit, kmhToMph, mmToInch } from "../utils/units";
import type { UnitFormatter } from "../types";


export function useUnitFormatter()
{
    const { unit } = useUnit();
    
    
    function formatTemperature(value: number): UnitFormatter
    {
        if (unit === "imperial")
        {
            return({
                value: Number(celsiusToFahrenheit(value).toFixed(0)),
                symbol: "º",
            });
        }
        
        return({
            value: Number(value.toFixed(0)),
            symbol: "º",
        })
    }
    
    
    function formatWindSpeed(value: number): UnitFormatter
    {
        if (unit === "imperial")
        {
            return({
                value: Number(kmhToMph(value).toFixed(0)),
                symbol: "mph"
            });
        }
        
        return({
            value: Number(value.toFixed(0)),
            symbol: "km/h",
        });
    }
    
    
    function formatPrecipitation(value: number): UnitFormatter
    {
        if (unit === "imperial")
        {
            return({
                value: Number(mmToInch(value).toFixed(0)),
                symbol: "in",
            });
        }
        
        return({
            value: Number(value.toFixed(0)),
            symbol: "mm"
        });
    }
    
    
    return({
        formatTemperature,
        formatWindSpeed,
        formatPrecipitation
    });
}
