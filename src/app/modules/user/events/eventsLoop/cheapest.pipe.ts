import { Pipe, PipeTransform } from '@angular/core';
import { EventPacketDTO } from 'nswag-api/nswag-api-marathon';

@Pipe({
    name: 'cheapest',
    standalone: true,
})
export class CheapestPipe implements PipeTransform {
    transform(value: EventPacketDTO[], args?: any): any {
        if (!value) {
            return 0;
        }
        const cheapest = value.sort((a, b) => a.packetAmount - b.packetAmount);
        return cheapest[0]?.packetAmount;
    }
}
