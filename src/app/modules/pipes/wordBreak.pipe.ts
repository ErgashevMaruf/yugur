import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordBreak',
  standalone:true
})
export class WordBreakPipe implements PipeTransform {

  transform(value: string, length?: any): any {
    if(value.length<=length)
    {
        return value
    }
    else{
        return value.slice(0, length)+'...'
    }
  }

}
