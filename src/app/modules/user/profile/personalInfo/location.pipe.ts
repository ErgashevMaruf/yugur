import { Pipe, PipeTransform } from '@angular/core';
import { SpSelectItems } from 'app/modules/admin/sps/SpSelectItems';
import { SelectItem, UserRegistrDTO } from 'nswag-api-auth';
import { SelectItemClient } from 'nswag-api-sps';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';

@Pipe({
    name: 'location',
    standalone: true,
})
export class LocationPipe implements PipeTransform {
    constructor(private _selectItem: SelectItemClient) {}

    transform(value: UserRegistrDTO, args?: any): Observable<string> {
        let country = this._selectItem.getSelectItems('Countries');
        let region = this._selectItem.getSelectItems(SpSelectItems.SPRegions);
        let district = this._selectItem.getSelectItems(
            SpSelectItems.SPDistricts
        );

        let arr = [];
        if (value?.spDistrictId) {
            arr.push(district.pipe(mapper(value.spDistrictId, 'value')));
        }
        if (value?.spRegionId) {
            arr.push(region.pipe(mapper(value.spRegionId, 'value')));
        }
        if (value?.spCountryId) {
            arr.push(country.pipe(mapper(value.spCountryId, 'code')));
        }
        if (arr.length == 0) {
            return of('-');
        }

        return combineLatest(arr).pipe(
            switchMap((el) => {
                return of(el.join(', '));
            })
        );
    }
}
function mapper(value: number, key: 'code' | 'value') {
    return map((res: SelectItem[]) => {
        let label = res.find((el) => +el[key] == +value)?.label;
        return label;
    });
}
