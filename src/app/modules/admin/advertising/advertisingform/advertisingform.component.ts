import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { ImgCropperComponent } from 'app/shared/imgCropper/imgCropper.component';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { WarningComponent } from 'app/shared/messages/warning/warning.component';
import { HttpStatusCode } from 'nswag-api/nswag-api-auth';
import {
    AdvertisingClient,
    AdvertisingDTO,
    AdvertisingStatus,
    FilesClient,
} from 'nswag-api/nswag-api-marathon';
import { CheckboxModule } from 'primeng/checkbox';
import { catchError, throwError } from 'rxjs';

@Component({
    selector: 'app-advertisingform',
    templateUrl: './advertisingform.component.html',
    styleUrls: ['./advertisingform.component.css'],
    standalone:true,
    imports:[ReactiveFormsModule, TranslocoModule, CheckboxModule]
})
export class AdvertisingformComponent implements OnInit {
    constructor(
        private advertisingClient: AdvertisingClient,
        private dialog: MatDialog,
        private fb: FormBuilder,
        private fileClient: FilesClient
    ) {}
    imgBase64: string;
    createAdvertising: FormGroup;
    @Input() advertising: AdvertisingDTO;
    @Output() advertisingState = new EventEmitter<AdvertisingDTO | number>();
    ngOnInit() {
        this.createAdvertising = this.fb.group({
            id: [0],
            imageFileId: ['', Validators.required],
            titleInfo: ['', Validators.required],
            advertisingStatus: [false],
        });
        if (this.advertising) {
            this.createAdvertising.patchValue(this.advertising);
            this.createAdvertising
                .get('advertisingStatus')
                .setValue(
                    this.advertising.advertisingStatus ==
                        AdvertisingStatus.Active
                        ? true
                        : false
                );
            this.fileClient
                .getImageByIdFromFolderInBase64(this.advertising.imageFileId)
                .subscribe((res) => {
                    this.imgBase64 = res;
                });
        }
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
    saveAndUpdate() {
        let advertisingDTO = new AdvertisingDTO(this.createAdvertising.value);
        advertisingDTO.advertisingStatus = this.check(
            advertisingDTO.advertisingStatus
        );
        if (advertisingDTO.id) {
            this.advertisingClient.update(advertisingDTO).pipe(
                catchError((error: HttpErrorResponse) => {
                    let data = ''
                    if(error.status==HttpStatusCode.NotFound)
                    {
                    data = 'notFound'
                    }
                    else{
                        data = 'notSave'
                    }
                this.dialog.open(ErrorComponent, {
                    data: data
                })
                  return throwError(() => error);
                })
              ).subscribe((res) => {
                this.advertisingState.emit(res.result);
            });
        } else {
            this.advertisingClient.save(advertisingDTO).pipe(
                catchError((error: HttpErrorResponse) => {
                    let data = ''
                    if(error.status==HttpStatusCode.BadRequest)
                    {
                    data = 'notSave'
                    }
                this.dialog.open(ErrorComponent, {
                    data: data
                })
                  return throwError(() => error);
                })
              ).subscribe((res) => {
                this.advertisingState.emit(res.result);
            });
        }
    }
    check(status: boolean | AdvertisingStatus) {
        if (status) {
            return AdvertisingStatus.Active;
        } else {
            return AdvertisingStatus.NotActive;
        }
    }
    delete() {
        const dialog = this.dialog.open(WarningComponent);
        dialog.afterClosed().subscribe((res) => {
            if (res == 'yes') {
                this.advertisingClient
                    .delete(this.advertising.id)
                    .subscribe((res) => {
                        this.advertisingState.emit(this.advertising.id);
                    });
            }
        });
    }
}
