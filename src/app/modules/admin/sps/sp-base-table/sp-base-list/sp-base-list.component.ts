import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import onExportExcel from 'app/core/helper/ExportExcel';
import { SpBaseFormComponent } from '../sp-base-form/sp-base-form.component';
import {
    BaseSPEntity,
    BaseSPViewModel,
    SelectItem,
    SPClient,
} from 'nswag-api/nswag-api-sps';
import { FuseLoadingService } from '@fuse/services/loading';
import { TableMetaInit } from 'app/core/helper/TableMetaInit';
import { SpsService } from '../../sps.service';
import { TableMetaList } from 'app/core/helper/TableMetaList';
import { SpRootItems } from '../../SpSelectItems';
import { SpService } from 'app/core/services/sp.service';
import { HelperService } from 'app/shared/helper.service';

@Component({
    selector: 'app-sp-base-list',
    templateUrl: './sp-base-list.component.html',
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class SpBaseListComponent implements OnInit {
    constructor(
        private spsService: SpsService,
        private spService: SpService,
        private spClient: SPClient,
        private _fuseProgressBarService: FuseLoadingService,
        public dialog: MatDialog,
        private helperService: HelperService
    ) {}
    @Input() rootSelectItems: SelectItem[];
    @Input() titleCode: string = 'config.code';
    @Input() titleComment: string = 'config.comment';

    tableList: TableMetaList<BaseSPViewModel> =
        new TableMetaList<BaseSPViewModel>();
    selItem: BaseSPEntity = new BaseSPEntity();
    curRootTableName: string;

    dataList: any[] = [];
    filterList: any = [];
    dialogRef: any;
    curSelItem: SelectItem;
    ngOnInit(): void {
        this.tableList.cols = [
            { field: 'number', header: 'config.n', order: 0 },
            { field: 'nameRu', header: 'sp.nameRu', order: 30 },
            { field: 'nameUz', header: 'sp.nameUz', order: 40 },
            { field: 'code', header: this.titleCode, order: 20 },
            { field: 'active', header: 'sp.active', order: 60 },
        ];

        //справочники родители
        this.spService.GetSpByTableName(
            SpRootItems.Districts,
        );

        //изменение - выбор другой таблицы из списка
        this.spsService._selectSp.subscribe((x) => {
            //on change tableName resetFilter
            if (this.tableList.filterObjectPred) {
                this.tableList.filterObjectPred.filters = {};
            }

            if (this.curSelItem) {
                this.curSelItem = x;
                this.onloadLazy(null);
            } else {
                this.curSelItem = x;
            }
            this.curRootTableName = SpRootItems[x.code];
        });
    }

    onloadLazy(event) {
        this._fuseProgressBarService.show();
        this.tableList.onLoadLazy(event);
        this.spClient
            .spItemsList(this.curSelItem.code, this.tableList.temp)
            .subscribe(
                (item) => {
                    if (this.curRootTableName) {
                        item.items.map((m) => {
                            m.code = this.spService.filterByValueReturnLabel(
                                this.curRootTableName,
                                m.spRootCode
                            );
                        });
                    }
                    this.tableList.itemList = item.items;
                    this.tableList.totalRecords = item.totalItems;
                    this._fuseProgressBarService.hide();
                },
                (error) => {
                    this._fuseProgressBarService.hide();
                }
            );
    }
    // //check later for delete
    // onChange(filter: string) {
    //     this.dataList = this.rootSelectItems;
    //     if (filter == null) {
    //         this.filterList = this.dataList.slice(0, 100);
    //     }
    //     const filterValue = filter ?? ''.toLowerCase();
    //     this.filterList = this.dataList
    //         .filter((option) =>
    //             option.label.toLowerCase().includes(filterValue)
    //         )
    //         .splice(0, 100);
    // }
    onRowSelect(event) {
        if (this.selItem.id != 0) {
            this._fuseProgressBarService.show();
            this.spClient
                .getSpById(this.spsService._curSpsInfo.code, this.selItem.id)
                .subscribe({
                    next: (item) => {
                        this.selItem = item;
                        this.composeDialog();
                    },
                    complete: () => {
                        this._fuseProgressBarService.hide();
                    },
                });
        }
    }
    showDialogToAdd() {
        this.selItem = new BaseSPEntity();
        this.selItem.id = 0;
        this.composeDialog();
    }
    exportExcel() {
        let exportData = [];
        exportData.push([
            '№',
            'Название (рус)',
            'Название (узб)',
            this.titleCode,
            'Дата изменения',
            'Состояние',
            'ID',
            this.titleComment,
        ]);

        let i = 0;
        let filterExport = new TableMetaInit();
        filterExport.rows = 1000000;
        //this._fuseProgressBarService.show();

        this.spClient
            .spItemsList(this.spsService._curSpsInfo.code, filterExport)
            .subscribe((item) => {
                item.items.map((item) => {
                    exportData.push([
                        ++i,
                        item.nameRu,
                        item.nameUz,
                        item.code,
                        item.active,
                        item.id,
                        item.dateTimeField,
                        item.comment,
                        item.capacity,
                    ]);
                });
                onExportExcel(exportData);
                //this._fuseProgressBarService.hide();
            });
    }
    composeDialog() {
        this.dialogRef = this.dialog.open(SpBaseFormComponent, {
            width: '90%',
            disableClose: true,
            data: {
                item: this.selItem,
            },
        });

        this.dialogRef.afterClosed().subscribe((response) => {
            if (response === 'saved') {
                this.helperService.showSuccessSave();
                this.onloadLazy(null);
            }
        });
    }
}
