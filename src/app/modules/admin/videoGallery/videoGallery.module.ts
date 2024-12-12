import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoGalleryComponent } from './videoGallery.component';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const route: Route[] = [
    {
        path: '',
        component: VideoGalleryComponent,
    },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslocoModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [VideoGalleryComponent]
})
export class VideoGalleryModule { }
