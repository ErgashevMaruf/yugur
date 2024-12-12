import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { SendfeedbackComponent } from 'app/modules/user/feedback/sendfeedback/sendfeedback.component';
import { TableMetaData } from 'nswag-api-auth';
import {
    ApplicationAnswer,
    ApplicationRepaymentClient,
    ApplicationRepaymentDTO,
} from 'nswag-api-marathon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { FullNamePipe } from './fullName.pipe';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
@Component({
    selector: 'app-controlPayment',
    templateUrl: './controlPayment.component.html',
    styleUrls: ['./controlPayment.component.css'],
    standalone: true,
    imports: [
        TableModule,
        TranslocoModule,
        ButtonModule,
        InputTextModule,
        MatDialogModule,
        CommonModule,
        FormsModule,
        FullNamePipe,
    ],
    animations: fuseAnimations,
})
export default class ControlPaymentComponent implements OnInit {
    tableMetadata:TableMetaData = {} as TableMetaData;
    applications: ApplicationRepaymentDTO[];
    totalItems: number;
    isEditById = -1;
    comment: string;
    isError = false;
    isAccept = true;
    athletesId: string;
    orderId: string;
    name: string;
    surname: string;
    patronymic: string;
    constructor(
        private controlPaymentClient: ApplicationRepaymentClient,
        private dialog: MatDialog
    ) {}

    statusMap = new Map<number, {text:string, class:string}>([
        [0, {text: 'new', class:'bg-blue-500' }],
        [5, {text: 'accept', class:'bg-green-500' }],
        [10, {text: 'reject', class:'bg-red-500' }],
    ])

    ngOnInit() {}
    loadPayment(event) {
        for (const [key, value] of Object.entries(event.filters)) {
            if (event.filters[key].value == null) {
                delete event.filters[key];
            }
        }
        this.tableMetadata = Object.assign({}, event);
        this.tableMetadata.filters = JSON.stringify(this.tableMetadata.filters);
        this.controlPaymentClient
            .getAll(this.tableMetadata)
            .subscribe((res) => {
                this.applications = res.result.items;
                this.totalItems = res.result.totalItems;
            });
    }
    sendMessage(applicaion: ApplicationRepaymentDTO) {
        if (!this.comment) {
            this.isError = true;
            return;
        }
        let acceptOrReject = this.controlPaymentClient.reject(
            new ApplicationAnswer({
                applicationRepaymentId: applicaion.id,
                answerText: this.comment,
            })
        );

        if (this.isAccept) {
            acceptOrReject = this.controlPaymentClient.accept(
                new ApplicationAnswer({
                    applicationRepaymentId: applicaion.id,
                    answerText: this.comment,
                })
            );
        }
        acceptOrReject.subscribe((res) => {
            this.isEditById = -1;
            this.dialog.open(SuccessComponent);
            this.loadPayment(
                new TableMetaData({
                    first: 0,
                    rows: 10,
                    filters: "",
                    sortOrder: 0,
                })
            );
        });
    }
    clear(table: Table) {
        this.athletesId = '';
        this.orderId = null;
        this.name = null;
        this.surname = null;
        this.patronymic = null
        table.clear();
    }
}
