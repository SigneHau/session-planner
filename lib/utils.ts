import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility: combine a base date (calendar) with a time string in this format "HH:mm:ss"
  export const combineDateAndTime = (baseDate: Date, timeStr: string) => {
    // Split the time string by ":" and change each to an int so the date object can take it
    const parts = timeStr.split(":").map((timePart) => parseInt(timePart, 10) || 0)
    // Destructure the parts array into a new array with hour, minute, seconds that the Date object can process
    const [hours = 0, minutes = 0, seconds = 0] = parts
    // create new Date so we don't mutate the calendar Date
    const newDateObject = new Date(baseDate)
    // Set the time on the date object
    newDateObject.setHours(hours, minutes, seconds, 0)

    return newDateObject
  }