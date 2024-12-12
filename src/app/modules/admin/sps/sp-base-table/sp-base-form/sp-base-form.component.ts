import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpService } from 'app/core/services/sp.service';
import { SelectItem, SPClient, SPUpdateModel } from 'nswag-api-sps';
import { SpsService } from '../../sps.service';
import { SpRootItems, SpSelectItems } from '../../SpSelectItems';
@Component({
    selector: 'app-sp-base-form',
    templateUrl: './sp-base-form.component.html',
    styleUrls: ['./sp-base-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SpBaseFormComponent implements OnInit {
    constructor(
        private spsService: SpsService,
        private spService: SpService,
        private spClient: SPClient,
        public matDialogRef: MatDialogRef<SpBaseFormComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any
    ) {
        this.selItem = _data.item;
    }
    codeSelectItems: SelectItem[];
    filterList: any[] = [];
    filterList2: any[] = [];
    selItem: SPUpdateModel;
    curRootTableName: string;
    titleDialog: string;
    capacityField: string;
    dateTimeField: string;

    preLoader = false;

    ngOnInit(): void {
        this.titleDialog = this.spsService._curSpsInfo.label;
        this.curRootTableName = SpRootItems[this.spsService._curSpsInfo.code];
    }

    onSave(): void {
        if (this.preLoader) {
            return;
        }
        this.preLoader = true;
        //this._fuseProgressBarService.show();

        this.spClient
            .addUpdate(this.spsService._curSpsInfo.code, this.selItem)
            .subscribe(
                (item) => {
                    if (
                        this.spsService._curSpsInfo.code ==
                            SpSelectItems.SpsInfos &&
                        this.selItem.id == 0
                    ) {
                        this.spClient
                            .createNewTableSPS(this.selItem.code)
                            .subscribe();
                        this.spsService.getSpsInfo();
                    }

                    this.matDialogRef.close('saved');
                    //this._fuseProgressBarService.hide();
                },
                (err) => {
                    alert(
                        'Не удалось сохранить. Ошибка ввода данных. Hato malumot kiritildi!'
                    );
                }
            );
    }
}
