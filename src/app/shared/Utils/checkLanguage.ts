import { environment } from 'app/core/env/environment';

export default function GetCalendarByLanguage(currentLanguage: string) {
    if (currentLanguage == 'ru' || currentLanguage == null)
        return environment.calendarRu;
    else if (currentLanguage == 'uzCyr') return environment.calendarUzCyr;
    else return environment.calendarUzLat;
}

export function GetFullCalendarByLanguage(currentLanguage: string) {
    if (currentLanguage == 'ru' || currentLanguage == null)
        return environment.fullCalendarRu;
    else if (currentLanguage == 'cyrl') return environment.fullCalendarUzCyr;
    else return environment.fullCalendarUzLat;
}
export function GetReceptionTypeByLanguage(currentLanguage: string) {
    if (currentLanguage == 'ru' || currentLanguage == null)
        return environment.ReceptionTypeRu;
    else if (currentLanguage == 'cyrl') return environment.ReceptionTypeUzCyr;
    else return environment.ReceptionTypeUzLat;
}
