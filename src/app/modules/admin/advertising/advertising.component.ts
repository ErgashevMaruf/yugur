import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { ImgCropperComponent } from 'app/shared/imgCropper/imgCropper.component';
import {
    AdvertisingClient,
    AdvertisingDTO,
    TableMetaData,
} from 'nswag-api-marathon';
import { TableModule } from 'primeng/table';
import { AdvertisingformComponent } from './advertisingform/advertisingform.component';

@Component({
    selector: 'app-advertising',
    templateUrl: './advertising.component.html',
    styleUrls: ['./advertising.component.css'],
    standalone:true,
    imports:[TableModule, TranslocoModule, AdvertisingformComponent]
})
export default class AdvertisingComponent implements OnInit {
    totalItems: number;
    constructor(
        private advertisingClient: AdvertisingClient,
        private dialog: MatDialog,
        private fb: FormBuilder
    ) {}
    imgBase64: string;
    adv: AdvertisingDTO | null;
    createAdvertising: FormGroup;
    advertisings: AdvertisingDTO[];
    tableFilter: TableMetaData = {} as TableMetaData;
    show = false;
    ngOnInit() {
        this.createAdvertising = this.fb.group({
            id: [0],
            imageFileId: ['', Validators.required],
            titleInfo: ['', Validators.required],
            advertisingStatus: [false],
        });
    }
    uploadImg(file: any) {
        const dialog = this.dialog.open(ImgCropperComponent, {
            data: {
                imageFile: file,
                width: 350,
                height: 400,
            },
        });
        dialog.afterClosed().subscribe((res) => {
            this.imgBase64 = res.base64;
            this.createAdvertising.get('imageFileId').setValue(res.id);
        });
    }
    loadAdvertising($event) {
        this.tableFilter = Object.assign(this.tableFilter, $event);
        this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
        this.advertisingClient.list(this.tableFilter).subscribe((res) => {
            this.advertisings = res.result.items;
            this.totalItems = res.result.totalItems;
        });
    }
    openEdit(adv: AdvertisingDTO) {
        this.adv = adv;
        this.show = true;
    }
    openForm(state: boolean) {
        this.adv = null;
        this.show = state;
    }
    updateList(event) {
        let index = this.advertisings.findIndex((el) => el.id == event.id);
        if (event.id) {
            if (index == -1) {
                this.advertisings.push(event);
            } else {
                this.advertisings[index] = event;
            }
        } else {
            this.advertisings.splice(index, 1);
        }
        this.show = false;
    }
}
