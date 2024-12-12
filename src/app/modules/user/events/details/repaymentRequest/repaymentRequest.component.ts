import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { UserService } from 'app/core/user/user.service';
import { ApplicationRepaymentClient, ApplicationRepaymentDTO } from 'nswag-api/nswag-api-marathon';

@Component({
    selector: 'app-repaymentRequest',
    templateUrl: './repaymentRequest.component.html',
    styleUrls: ['./repaymentRequest.component.css'],
    standalone: true,
    imports: [TranslocoModule, FormsModule],
})
export class RepaymentRequestComponent implements OnInit {
    constructor(
        private _applicationPaymentClient: ApplicationRepaymentClient,
        @Inject(MAT_DIALOG_DATA) public data: number,
        private matdialog:MatDialog,
        private userService:UserService,
        private matdialogRef:MatDialogRef<RepaymentRequestComponent>
    ) {}
    text:string

    ngOnInit() {
    }

    sendRequest()
    {
        let applicationDTO = new ApplicationRepaymentDTO();
        this.userService.user$.subscribe(user=>{
            applicationDTO.athletesId = user.athletesId;
            applicationDTO.orderId = this.data;
            applicationDTO.text = this.text
            this._applicationPaymentClient.saveApplicationRepayment(applicationDTO).subscribe(res=>{
            })
        })
        this.matdialogRef.close(true);
    }
    closeDialog()
    {
        this.matdialog.closeAll()
    }
}
