import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgCropperComponent } from './imgCropper.component';
import { ImageCropperComponent, ImageCropperModule } from 'ngx-image-cropper';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    declarations: [
     ImgCropperComponent
    ],
    imports: [
        CommonModule,
        ImageCropperModule,
        TranslocoModule
    ],
    exports:[ImageCropperComponent]
})
export class  ImgCropperModule{ }
