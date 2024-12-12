import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogRef,
} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { FileServiceService } from 'app/modules/services/fileUpload.service';
import {
    ImageCroppedEvent,
} from 'ngx-image-cropper';
import { FileBase64, FilesClient } from 'nswag-api-marathon';

@Component({
    selector: 'app-imgCropper',
    templateUrl: './imgCropper.component.html',
    styleUrls: ['./imgCropper.component.css'],
})
export class ImgCropperComponent implements OnInit {
    constructor(
        private sanitizer: DomSanitizer,
        private fileService: FileServiceService,
        private uploadImgBase64: FilesClient,
        private matDialog: MatDialogRef<ImgCropperComponent>
    ) {}

    height: number;
    width: number;
    data = inject(MAT_DIALOG_DATA);
    @Output() outputId = new EventEmitter<string>();
    ngOnInit() {
        this.imageChangedEvent = this.data.imageFile;
        this.height = this.data.height;
        this.width = this.data.width;
    }
    imageChangedEvent: any = '';
    croppedImage: any = '';
    event: any;
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
            event.objectUrl || event.base64 || ''
        );
        this.event = event;
        // event.blob can be used to upload the cropped image
    }
    sendToServer() {
        this.fileService
            .uploadForImageBase64(
                new FileBase64({
                    base64Image: this.event.base64,
                })
            )
            .subscribe((res: any) => {
                this.matDialog.close({
                    id: JSON.parse(res.body),
                    base64: this.event.base64,
                });
            });
    }
}
