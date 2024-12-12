import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'app/core/env/environment.prod';
import { GalleryService } from 'app/modules/services/gallery.service';
import { PhotoVideoClient } from 'nswag-api/nswag-api-marathon';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
    images: any[];
    url= environment.URL
    constructor(private gallery: PhotoVideoClient, private httpClient:HttpClient) {}

    ngOnInit() {
        this.gallery.getListImageRandom().subscribe(res=>{
            this.images = res.result.items;
        })
    }
}
