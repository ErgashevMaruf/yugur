import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone:true,
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value==0)
    {
        return 'InProgrees'
    }
    if(value==2)
    {
        return 'Rejected'
    }
    if(value==3)
    {
        return 'Inserted'
    }
    if(value==5)
    {
        return 'registeredUser'
    }
    if(value==8)
    {
        return 'Canceled'
    }
    if(value==10)
    {
        return 'Completed'
    }
  }

}
