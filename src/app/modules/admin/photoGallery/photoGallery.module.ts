import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoGalleryComponent } from './photoGallery.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

const route: Route[] = [
    {
        path: '',
        component: PhotoGalleryComponent,
    },
];

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(route),
    TranslocoModule
  ],
  declarations: [PhotoGalleryComponent, ]
})
export class PhotoGalleryModule { }
