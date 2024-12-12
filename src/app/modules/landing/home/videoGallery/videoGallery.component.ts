import { Component, OnInit } from '@angular/core';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogModule,
} from '@angular/material/dialog';
import { VideoComponent } from '../video/video.component';
import { PhotoVideoClient, PhotoVideoDTO } from 'nswag-api/nswag-api-marathon';
import { environment } from 'app/core/env/environment.prod';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-videoGallery',
    templateUrl: './videoGallery.component.html',
    styleUrls: ['./videoGallery.component.scss'],
})
export class VideoGalleryComponent implements OnInit {
    videos:any[]=[];
    url = environment.URL;

    constructor(public dialog: MatDialog, private galleryClient:PhotoVideoClient,
    public domSanitizier: DomSanitizer
    ) {}
    openDialog(guid:string) {
        this.dialog.open(VideoComponent, {
            width: '100%',
            data: guid
        });
    }

    ngOnInit() {
        this.galleryClient.getListVideoRandom().subscribe(res=>{
            res.result.items.forEach(el=>{
                this.videos.push(this.domSanitizier.bypassSecurityTrustResourceUrl(el.description));
            })
        })
    }
}
