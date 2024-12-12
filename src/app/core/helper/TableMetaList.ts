export class TableMetaList<T> {
    filterObject: any;
    totalRecords: number;
    filterObjectPred: any;
    cols: any[];
    itemList: T[] = [];
    temp: any;
    onLoadLazy(event: any) {
        this.filterObject = event;
        if (event !== '' && event != null) {
            this.filterObjectPred = event;
        }
        this.temp = Object.assign({}, this.filterObjectPred);

        this.temp.filters = JSON.stringify(this.filterObjectPred.filters);
    }
}
