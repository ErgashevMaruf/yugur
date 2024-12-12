import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';


import {
    DeviceType,
    FeedBackClient,
    FeedBackDTO,
    FeedType,
    FilesClient,
    TableMetaData,
} from 'nswag-api/nswag-api-marathon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
    tableFilter: TableMetaData = {} as TableMetaData;
    messages: FeedBackDTO[]=[];
    type = FeedType;
    constructor(
        private feedBackClient: FeedBackClient,
        private fileClient: FilesClient,
    ) {}
    Issending = false;
    firstTime = true;
    deviceType = new Map([
        [0, 'Web'],
        [1, 'Mobile'],
        [2, 'TelegramBot'],
    ]);
    ngOnInit() {
        this.loadMessage();
    }
    loadMessage(event=null) {

        if(this.firstTime)
        {
            this.firstTime = false;
            this.feedBackClient.listByUserGet().subscribe(res=>{
                this.messages = res.result.items;
                if(this.messages.length==0)
                {
                    this.feedBackClient.listByUserSend().subscribe(res=>{
                        this.messages = res.result.items
                        if(this.messages.length!==0)
                        {
                            this.Issending = true;
                        }
                    })
                }
            })
        }
        else{
            if(this.Issending)
            {
                this.feedBackClient.listByUserSend().subscribe(res=>{
                    this.messages = res.result.items
                })
            }
            else{
                this.feedBackClient.listByUserGet().subscribe(res=>{
                    this.messages = res.result.items;
                })
            }
        }
    }
    Enum(index: number) {
        return index == this.type.Error
            ? 'Error'
            : index == this.type.Question
            ? 'Question'
            : 'Suggestion';
    }
    fileDownload(message: FeedBackDTO) {
        let id = this.Issending ? message.fileId : message.answerFileId;
        this.fileClient.getImageByIdFromFolderInBase64(id).subscribe((res) => {
            const downloadLink = document.createElement('a');
            const fileName = 'sample';
            downloadLink.href = res;
            downloadLink.download = fileName;
            downloadLink.click();
        });
    }
}
