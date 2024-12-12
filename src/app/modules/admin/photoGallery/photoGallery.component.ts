import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'app/core/env/environment.prod';
import { FileServiceService } from 'app/modules/services/fileUpload.service';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { WarningComponent } from 'app/shared/messages/warning/warning.component';
import { FilesClient, IPhotoVideoDTO, PhotoVideoClient, PhotoVideoDTO } from 'nswag-api/nswag-api-marathon';

@Component({
  selector: 'app-photoGallery',
  templateUrl: './photoGallery.component.html',
  styleUrls: ['./photoGallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {

  constructor(private photoClient:PhotoVideoClient, private fb:FormBuilder,
     private fileService:FileServiceService, private dialog:MatDialog,
     private fileClient:FilesClient
     ) { }
  isUploadReady = true;
  uploadGalleryArr:IPhotoVideoDTO[];
  url = environment.URL

  ngOnInit() {
    this.photoClient.listImage().subscribe(res=>{
            this.uploadGalleryArr = res.result.items
    })
  }

  uploadPhotoServer(file: File[], index:number) {
    if(this.uploadGalleryArr[index].fileId!=='')
    {

        if(!this.uploadGalleryArr[index].id)
            {
                this.fileClient.deleteFileById(this.uploadGalleryArr[index].fileId).subscribe()
            }
        else{
          this.photoClient.deleteImage(this.uploadGalleryArr[index].id).subscribe();
        }
    }
    if(environment.maxUploadFileSize<file[0].size)
    {
        this.dialog.open(ErrorComponent,{
            data:'fileSizeLarge'
        })
        return;
    }
    this.fileService.uploadFileForFolder(file[0]).subscribe({
        next: (value) => {
            this.uploadGalleryArr[index].fileId = value;
        },
        error: (err) => {
            this.dialog.open(ErrorComponent);
        },
    });
    }
    saveGallery(index)
    {
        if(this.uploadGalleryArr[index].id!==0)
        {
          this.photoClient.deleteImage(this.uploadGalleryArr[index].id).subscribe();
        }
        this.photoClient.saveImage(new PhotoVideoDTO({
            id:0,
            fileId: this.uploadGalleryArr[index].fileId,
            title:this.uploadGalleryArr[index].title,
        })).subscribe(res=>{
            this.dialog.open(SuccessComponent, {
                data: 'uploaded'
            })
        })
    }
    addGallery()
    {
        this.uploadGalleryArr.push({
            id:0,
            title:undefined,
            fileId:'',
            description:undefined
        })
    }
    deleteFromGallery(index:number)
    {
        const dialog =  this.dialog.open(WarningComponent);
         dialog.afterClosed().subscribe(res=>{
             if(res=='yes')
             {
                 this.photoClient.deleteImage(this.uploadGalleryArr[index].id).subscribe(res=>{
                    this.uploadGalleryArr.splice(index,1);
                 })
             }
         })
    }
}

