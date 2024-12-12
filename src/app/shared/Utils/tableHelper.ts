import { inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { TableMetaData } from 'nswag-api-marathon';
import { Table } from 'primeng/table';

export class TableHelper {
    // static _transloco = inject(TranslocoService);

    // static to = this._transloco.translate('TO');
    // static from = this._transloco.translate('FROM');
    // static showing = this._transloco.translate('showing');
    // static entries = this._transloco.translate('entries');
    // Showing {first} to {last} of {totalRecords} entries
    // static pageInfo =
    //     this.showing +
    //     ' ' +
    //     '{first}' +
    //     ' ' +
    //     this.from +
    //     ' ' +
    //     '{last}' +
    //     ' ' +
    //     this.to +
    //     ' ' +
    //     '{totalRecords}' +
    //     ' ' +
    //     this.entries;

    static skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    static clearFilter(event: TableMetaData) {
        for (const [key, value] of Object.entries(event.filters)) {
            if (event.filters[key]?.value == null) {
                delete event.filters[key];
            }
        }
    }
    static clear(table: Table, searchFields: any[]) {
        for (let x of searchFields) {
            x = null;
        }
        table.clear();
    }
}
