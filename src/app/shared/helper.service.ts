import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class HelperService {
    constructor(private _snackBar: MatSnackBar) {}
    showMessage(info: string) {
        this._snackBar.open(info, 'Закрыть', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
    showSuccessSave() {
        this._snackBar.open('Успешно сохранено!', 'Закрыть', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
    getFormattedDateYYYYMMDD(date): string {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return year + '-' + month + '-' + day;
    }
    getFormattedDateFromString(pDate: string) {
        let yyyy = pDate.split('-')[0].padStart(2, '0');
        let mm = pDate.split('-')[1].padStart(2, '0');
        let dd = pDate.split('-')[2].padStart(2, '0');

        return new Date(+yyyy, +mm, +dd);
    }
    getCountdownTimer(endDateInEpochMs: number) {
        const milliSecondsInASecond = 1000;
        const hoursInADay = 24;
        const minutesInAnHour = 60;
        const secondsInAMinute = 60;

        const timeDifference = endDateInEpochMs - Date.now();

        let days: number | string = Math.floor(
            timeDifference /
                (milliSecondsInASecond *
                    minutesInAnHour *
                    secondsInAMinute *
                    hoursInADay)
        );

        let hours: number | string = Math.floor(
            (timeDifference /
                (milliSecondsInASecond * minutesInAnHour * secondsInAMinute)) %
                hoursInADay
        );

        let minutes: number | string = Math.floor(
            (timeDifference / (milliSecondsInASecond * minutesInAnHour)) %
                secondsInAMinute
        );

        let seconds: number | string =
            Math.floor(timeDifference / milliSecondsInASecond) %
            secondsInAMinute;

        days = days > 9 ? days : '0' + days;
        hours = hours > 9 ? hours : '0' + hours;
        minutes = minutes > 9 ? minutes : '0' + minutes;
        seconds = seconds > 9 ? seconds : '0' + seconds;

        return { seconds, minutes, hours, days };
    }
}
