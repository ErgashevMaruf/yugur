import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'app/core/env/environment.prod';
import { VideoComponent } from 'app/modules/landing/home/video/video.component';
import { FileServiceService } from 'app/modules/services/fileUpload.service';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { WarningComponent } from 'app/shared/messages/warning/warning.component';
import {
    PhotoVideoClient,
    FilesClient,
    IPhotoVideoDTO,
    PhotoVideoDTO,
} from 'nswag-api-marathon';

@Component({
    selector: 'app-videoGallery',
    templateUrl: './videoGallery.component.html',
    styleUrls: ['./videoGallery.component.css'],
})
export class VideoGalleryComponent implements OnInit {
    constructor(
        private photoClient: PhotoVideoClient,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private domSanitizer:DomSanitizer
    ) {}

    url = environment.URL;

   galleryForm:FormGroup

    ngOnInit() {

        this.getListVideo();
    }
    getListVideo()
    {
        this.galleryForm = this.fb.group({
            galleryArr: this.fb.array([]),
        });
        this.photoClient.listVideo().subscribe((res) => {
            res.items.forEach((el) => {
                this.addForm(el);
            });
        });
    }
    addForm(el: PhotoVideoDTO = null) {
        let fbArr = this.galleryForm.get('galleryArr') as FormArray;
        let fb = this.fb.group({
            id: [0],
            title: ['', Validators.required],
            description: ['', Validators.required],
        });
        if (el) {
            fb.patchValue(el);
        }
        fbArr.push(fb);
    }
    saveVideo(x: FormGroup) {
        let videoDTO = new PhotoVideoDTO();
        videoDTO.id = 0;
        videoDTO.title = x.value['title'];
        videoDTO.description = x.value['description'];
        if (x.value['id']) {
            this.photoClient.deleteVideo(x.value['id']).subscribe((res) => {
                this.photoClient.saveVideo(videoDTO).subscribe((res) => {
                    this.openSuccess()
                });
            });
        } else {
            this.photoClient.saveVideo(videoDTO).subscribe((res) => {
                this.openSuccess()
            });
        }
    }
    deleteVideo(id:number, index:number)
    {
        let fbArr = this.galleryForm.get('galleryArr') as FormArray;
        if(id)
        {
            this.photoClient.deleteVideo(id).subscribe(res=>{
                fbArr.removeAt(index);
                this.getListVideo();
            })
        }
        else{
            fbArr.removeAt(index)
        }
    }
    openSuccess()
    {
        this.getListVideo();
        this.dialog.open(SuccessComponent, {
            data: 'uploaded',
        });
    }
    openVideo(url:string)
    {
        this.dialog.open(VideoComponent, {
            data:this.domSanitizer.bypassSecurityTrustResourceUrl(url)
        })
    }
}
