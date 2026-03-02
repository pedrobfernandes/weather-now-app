import type { WeekdayFormat } from "../types";


export function formatDate(dateStr: string, monthFormat: WeekdayFormat): string
{
    const date: Date = new Date(dateStr);
    const formattedDate: string = date.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: monthFormat,
            day: "numeric"
        }
    );
    
    return(formattedDate);
}


export function formatHour(hourStr: string): string
{
    const date: Date = new Date(hourStr);
    const formattedHour: string = date.toLocaleTimeString(
        "en-US",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }
    );
    
    return(formattedHour)
}


export function getHourAndPeriod(hourStr: string):
    { hour: string, period: string}
{
    const formatted: string = formatHour(hourStr);
    const [time, period] = formatted.split(" ");
    const hour: string = time.split(":")[0];
    
    return({ hour, period })
}


export function formattedDay(
    dayStr: string,
    weekdayFormat: WeekdayFormat
): string
{
    const date: Date = new Date(dayStr);
    const formattedDay: string = date.toLocaleDateString(
        "en-US",
        { weekday: weekdayFormat }
    );
    
    return(formattedDay);
}
