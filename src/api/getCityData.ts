import { z } from "zod";
import type
{
    GeocodingResults,
    UrlCityParameter,
    FetchCitiesReturn

} from "../types";


const GeocodingResultSchema = z.object({
    name: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    country: z.string(),
});


const GeocodingResultsSchema = z.object({
    results: z.array(GeocodingResultSchema).optional(),
});


export function mountCitySearchUrl(
    urlCityParameter: UrlCityParameter
):  string
{
    const geocodingEndpoint: string = "https://geocoding-api.open-meteo.com/v1/search";
    const url: URL = new URL(geocodingEndpoint);
    url.search = new URLSearchParams({
        name: urlCityParameter.city,
        count: "10",
        language: "en",
        format: "json",
    }).toString();
    
    return(url.toString());
}


export async function fetchCities(url: string): Promise<FetchCitiesReturn>
{
    try
    {
        const response: Response = await fetch(url);
        
        if (response.ok === false)
        {
            return({
                status: "API ERROR",
                message: "It seems to be an error with the API." +
                " Please try again later."
            });
        }
        
        const data: GeocodingResults = await response.json();
        const parseResult = GeocodingResultsSchema.safeParse(data);
        
        
        if (parseResult.success === false ||
            parseResult.data.results === undefined ||
            parseResult.data.results.length === 0
        )
        {
            return({
                status: "NOT FOUND",
                message: "No results found for the searched city",
            });
        }
        
        return({
            data: parseResult.data as GeocodingResults,
            status: "SUCCESS",
        });
    }
    catch
    {
        return({
            status: "NETWORK ERROR",
            message: "Network error. Please check" +
            " your connection and try again.",
        });
    }
}
