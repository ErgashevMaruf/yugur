import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberFormat' })
export class NumberFormatPipe implements PipeTransform {
  transform(value: number): string {
    if(!value)
    {
        return '0';
    }
    return value.toLocaleString('sv-SE');
  }
}
