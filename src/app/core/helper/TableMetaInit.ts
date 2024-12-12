/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TableMetaData } from '../../../nswag-api/nswag-api-sps';

export class TableMetaInit extends TableMetaData {
    filters: any = {};
    first: number = 0;
    globalFilter: any = null;
    rows: number = 10;
    sortOrder: number = 1;
    filterJSON() {
        const temp: any = Object.assign({}, this);
        temp.filters = JSON.stringify(temp.filters);
        return temp;
    }
}
