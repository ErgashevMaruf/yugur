import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { FileServiceService } from 'app/modules/services/fileUpload.service';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { FeedBackClient, FeedType, DeviceType, FeedBackDTO, HttpStatusCode, ResponseModelOfBoolean } from 'nswag-api/nswag-api-marathon';
import { catchError, throwError } from 'rxjs';
interface sendOption {
    name: string;
    value: string;
}
@Component({
  selector: 'app-sendfeedback',
  templateUrl: './sendfeedback.component.html',
  styleUrls: ['./sendfeedback.component.css'],

})
export class SendfeedbackComponent implements OnInit {

    feedBackForm: FormGroup;
    sendOption: sendOption[];
    selectOption: sendOption;
    fileId: string;
    dialogData: FeedBackDTO
    public type: {
        name: string;
        value: number;
    }[];
    fileName: string;
    @Input() showSelectOption = false;
    @Output() signal = new EventEmitter<string>();
    matdialog: MatDialogRef<any, any>;
    constructor(
        private feedBackClient: FeedBackClient,
        private fb: FormBuilder,
        private fileService: FileServiceService,
        private dialog: MatDialog,
        private injector:Injector,
        private translocoService:TranslocoService
    ) {
        this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
    }
    ngOnInit() {
        this.type = [
            {
                name: this.translocoService.translate('Error'),
                value: FeedType.Error,
            },
            {
                name: this.translocoService.translate('Question'),
                value: FeedType.Question,
            },
            {
                name: this.translocoService.translate('Suggestion'),
                value: FeedType.Suggestion,
            },
        ];
        this.feedBackForm = this.fb.group({
            text: ['', Validators.required],
            type: ['', Validators.required],
            deviceType: [DeviceType.Web],
        });
        if(this.dialogData)
        {
            this.feedBackForm.get('type').setValidators([]);
            this.feedBackForm.get('type').updateValueAndValidity();

        }
    }
    uploadFile(file: File[]) {
        this.fileService.uploadFileForFolder(file[0]).subscribe({
            next: (value) => {
                this.fileName = file[0].name;
                this.fileId = value;
                this.dialog.open(SuccessComponent);
            },
            error: (err) => {
                this.dialog.open(ErrorComponent);
            },
        });
    }

    saveFeedback() {
        if(this.dialogData)
        {
            this.dialogData.answerText = this.feedBackForm.get('text').value;
            this.dialogData.answerFileId = this.fileId ? this.fileId : null;
            this.feedBackClient.update(this.dialogData).pipe(
                catchError((error: HttpErrorResponse) => {
                    let data = ''
                    if(error.status==HttpStatusCode.NotFound)
                    {
                    data = 'notFound'
                    }
                    else
                    {
                            data = 'notSave'
                    }

                this.dialog.open(ErrorComponent, {
                    data: data
                })
                  return throwError(() => error);
                })
              ).subscribe(res=>{
                this.checkResponseAndReseForm(res);
                setTimeout(() => {
                    this.dialog.closeAll();
                }, 3500);
            })
            return;
        }
        let feedbackDto: FeedBackDTO = this.feedBackForm.value;
        if (this.fileId) {
            feedbackDto.fileId = this.fileId;
        }
        this.feedBackClient.save(feedbackDto).pipe(
            catchError((error: HttpErrorResponse) => {
                let data = ''
                if(error.status==HttpStatusCode.BadRequest)
                {
                data = 'notSave'
                }
            this.dialog.open(ErrorComponent, {
                data: data
            })
              return throwError(() => error);
            })
          ).subscribe((res) => {
           this.checkResponseAndReseForm(res);
           this.signal.emit('')
        });

    }

    checkResponseAndReseForm(res:ResponseModelOfBoolean)
    {
        if (
            res.statusCode == HttpStatusCode.OK||
            res.statusCode == HttpStatusCode.Accepted ||
            res.statusCode == HttpStatusCode.Created
        ) {
            this.dialog.open(SuccessComponent);
            this.feedBackForm.reset();
            this.fileName = '';
        } else {
            this.dialog.open(ErrorComponent);
        }
    }

}
