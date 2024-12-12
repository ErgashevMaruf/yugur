import { Injectable } from '@angular/core';
import { SpSelectItems } from 'app/modules/admin/sps/SpSelectItems';
import { AthletesClient } from 'nswag-api-marathon';
import { SelectItem, SelectItemClient } from 'nswag-api-sps';
import {
    throwError as _observableThrow,
    of as _observableOf,
    Observable,
    map,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpService {
    public SelectItemsAll: SelectItem[] = [];
    constructor(
        private spClient: SelectItemClient,
        private athletesClient: AthletesClient
    ) {}

    public GetSpByTableName(...args: string[]) {
        args.forEach((x) => {
            if (!this.SelectItemsAll[x]) {
                this.spClient.getSelectItems(x).subscribe((response) => {
                    this.SelectItemsAll[x] = response;
                });
            }
        });
    }

    public SpByTableNameSubscribable(
        tableName: string
    ): Observable<SelectItem[]> {
        return this.spClient.getSelectItems(tableName);
    }

    // public GetStaffsByRole(roleName: string) {
    //     this.athletesClient.getAthletesByRoleSelectItem(roleName).subscribe((x) => {
    //         this.SelectItemsAll[roleName] = x;
    //     });
    // }
    // public GetStaffsByRoleSubscribe(roleName: string) {
    //     return this.athletesClient.getAthletesByRoleSelectItem(roleName);
    // }
    get CascadeRegionDistrict() {
        return this.SelectItemsAll[SpSelectItems.SPRegions]?.map((x) => {
            x.districts = this.SelectItemsAll[
                SpSelectItems.SPDistricts
            ]?.filter((f) => {
                return f.rootCode == x.value;
            });
            return x;
        });
    }
    get GetDistrict() {
        return this.SelectItemsAll[SpSelectItems.SPDistricts];
    }

    get GetRegion() {
        return this.SelectItemsAll[SpSelectItems.SPRegions];
    }
    filterByValue(item: SpSelectItems | string, filterValue) {
        return this.SelectItemsAll[item]?.filter((x) => {
            return filterValue == x.value;
        })[0];
    }
    filterByValueReturnLabel(tableName: string, filterValue) {
        let result = this.SelectItemsAll[tableName]?.filter((x) => {
            return filterValue == x.value;
        })[0];
        if (result) {
            return result.label;
        }
        return '';
    }
    public filterTableNameByRootCode(
        item: SpSelectItems | string,
        rootCode: string
    ): SelectItem[] {
        if (this.SelectItemsAll[item]) {
            return this.SelectItemsAll[item].filter((x) => {
                return rootCode == x.rootCode;
            });
        }
    }
    public filterByRootCode(
        selectItems: SelectItem[],
        rootCode: string
    ): SelectItem[] {
        return selectItems.filter((x) => {
            return rootCode == x.rootCode;
        });
    }
    public filterTableNameByCode(
        item: SpSelectItems | string,
        code: string
    ): SelectItem[] {
        if (this.SelectItemsAll[item]) {
            return this.SelectItemsAll[item].filter((x) => {
                return code == x.code;
            });
        }
    }
}
