import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'eventStatus',
    standalone: true,
})
export class EventStatusPipe implements PipeTransform {
    status = [
        {
            title: 'Active',
            id: 0,
            class: 'text-[#0CAEEB]',
        },
        {
            title: 'ParticipantsFull',
            id: 1,
            class: 'text-red-600',
        },
        {
            title: 'Finish',
            id: 3,
            class: 'text-[#67BD50]',
        },
        {
            title: 'Results',
            id: 5,
            class: 'text-[#FFD778]',
        },
    ];

    transform(value: number): any {
        return this.status.find(el=>el.id==value);
    }
}
