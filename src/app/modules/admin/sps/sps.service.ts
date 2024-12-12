import { Injectable } from '@angular/core';
import { SelectItem, SelectItemClient } from 'nswag-api-sps';
import { ReplaySubject } from 'rxjs';
import { SpSelectItems } from './SpSelectItems';
@Injectable({
    providedIn: 'root',
})
export class SpsService {
    public _spsInfo: ReplaySubject<SelectItem[]> = new ReplaySubject<
        SelectItem[]
    >(1);
    public _selectSp: ReplaySubject<SelectItem> = new ReplaySubject<SelectItem>(
        1
    );
    public _curSpsInfo: SelectItem;
    constructor(private selectItemClient: SelectItemClient) {
        this.getSpsInfo();
    }
    public getSpsInfo() {
        this.selectItemClient
            .getSelectItems(SpSelectItems.SpsInfos)
            .subscribe((items) => {
                this._spsInfo.next(items.filter((x) => x.value));
            });
    }
}
