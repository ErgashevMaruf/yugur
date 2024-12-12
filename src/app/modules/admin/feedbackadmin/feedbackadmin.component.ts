import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { SendfeedbackComponent } from 'app/modules/user/feedback/sendfeedback/sendfeedback.component';
import {
    DeviceType,
    FeedBackClient,
    FeedBackDTO,
    FeedType,
    FilesClient,
    TableMetaData,
} from 'nswag-api/nswag-api-marathon';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-feedbackadmin',
    templateUrl: './feedbackadmin.component.html',
    styleUrls: ['./feedbackadmin.component.css'],
    standalone:true,
    imports:[TranslocoModule, MatIconModule, TableModule, DatePipe]
})
export default class FeedbackadminComponent implements OnInit {
    feedbacks: FeedBackDTO[];
    totalItems: number;

    constructor(
        private feedBackClient: FeedBackClient,
        private fileClient: FilesClient,
        private dialog:MatDialog
    ) {}
    tableFilter: TableMetaData = {} as TableMetaData;
    ngOnInit() {}
    loadFeedBack($event) {
        this.tableFilter = Object.assign(this.tableFilter, $event);
        this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
        this.feedBackClient.list(this.tableFilter).subscribe((res) => {
            this.feedbacks = res.result.items;
            this.totalItems = res.result.totalItems;
        });
    }
    fileDownload(id: string) {
        this.fileClient.getImageByIdFromFolderInBase64(id).subscribe((res) => {
            const downloadLink = document.createElement('a');
            const fileName = 'sample';
            downloadLink.href = res;
            downloadLink.download = fileName;
            downloadLink.click();
        });
    }
    deviceType(type: number) {
        return type == DeviceType.Mobile
            ? 'Mobile'
            : type == DeviceType.TelegramBot
            ? 'TelegramBot'
            : 'Web';
    }
    FeedType(type: number) {
        return type == FeedType.Error
            ? 'Error'
            : type == FeedType.Suggestion
            ? 'Suggestion'
            : 'Question';
    }
    openDialog(message:FeedBackDTO) {
     const dialog = this.dialog.open(SendfeedbackComponent, {
            width:'600px',
            height:'400px',
            data:message
        });
        dialog.afterClosed().subscribe(res=>{
            this.loadFeedBack(new TableMetaData({
                rows:10,
                first:0,
                filters:'',
                sortOrder:0
            }));
        })
    }

}
