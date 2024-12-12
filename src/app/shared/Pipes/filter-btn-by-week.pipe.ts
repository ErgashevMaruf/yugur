import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filterBtnByWeek',
    pure: false,
})
export class FilterByBtnWeekPipe implements PipeTransform {
    transform(items: any[], pattern: any): any {
        let result = items.find(
            (x) => x.curDate == pattern.curDate && x.ihours == pattern.curHour
        );
        if (result != undefined) {
            return result.data;
        }
        return result;
    }
}
