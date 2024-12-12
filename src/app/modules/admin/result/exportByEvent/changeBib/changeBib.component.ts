import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { DebounceInputDirective } from 'app/shared/directives/debounce-input.directive';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import {
    RegistationEventDTO,
    ResponseModelOfListOfSelectRegistationEvent,
    SelectModel,
    SelectRegistationEventDTO,
    SuperAdminClient,
} from 'nswag-api/nswag-api-marathon';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { catchError, throwError } from 'rxjs';

@Component({
    selector: 'app-changeBib',
    templateUrl: './changeBib.component.html',
    styleUrls: ['./changeBib.component.css'],
    standalone: true,
    imports: [
        TranslocoModule,
        InputNumberModule,
        FormsModule,
        InputTextModule,
        DebounceInputDirective,
        ButtonModule,
        CommonModule,
    ],
})
export class ChangeBibComponent implements OnInit {
    searchingBib: number;
    fullName: string;
    selectedId = 0;

    readonly bibTypeMap = new Map<
        number,
        { bibType: string; bibStatus: string }
    >([
        [0, { bibType: '', bibStatus: 'Active' }],
        [1, { bibType: 'normal_number', bibStatus: 'bibCodeAlreadySelect' }],
        [2, { bibType: 'silverNumber', bibStatus: 'Accepted' }],
        [3, { bibType: 'goldenNumber', bibStatus: 'Invalid' }],
        [4, { bibType: 'platinumNumber', bibStatus: 'Vip' }],
        [5, { bibType: 'VipNumber', bibStatus: '' }],
    ]);
    bibInfo: ResponseModelOfListOfSelectRegistationEvent;
    result: any = [];
    text = 'searchSomethingToConfirm';

    constructor(
        private superAdminClient: SuperAdminClient,
        private dialog: MatDialogRef<ChangeBibComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { athlete: RegistationEventDTO }
    ) {}
    ngOnInit() {}

    searchByBib(bibCode: number) {
        this.selectedId = 0;
        if (bibCode) {
            let selected = new SelectRegistationEventDTO();
            selected.bibCode = bibCode;
            selected.eventId = this.data.athlete.eventId;
            selected.athletesId = this.data.athlete.athletesId;

            this.superAdminClient
                .getAllFilteredEventBibs(selected)
                .subscribe((res) => {
                    this.result = res.result;
                    this.text = res.error
                        ? res.error
                        : this.result.length == 0
                        ? 'searchAnother'
                        : res.error;
                });
        }
    }
    searchByUserName(name: string) {
        this.selectedId = 0;
        let selected = new SelectRegistationEventDTO();
        selected.fullName = name;
        selected.eventId = this.data.athlete.eventId;
        selected.athletesId = this.data.athlete.athletesId;
        this.superAdminClient
            .getAllFilteredAthleteFullName(selected)
            .subscribe((res) => {
                this.result = res.result;
                this.text =
                    this.result.length == 0 ? 'searchAnother' : res.error;
            });
    }
    changeBib() {
        let selectedBib = this.result.find(
            (el) => el.eventBibId == this.selectedId
        );
        let selectedUser = new SelectModel();
        selectedUser.athletesId = this.data.athlete.athletesId;
        selectedUser.bibCode = this.data.athlete.eventBib.bibCode;
        selectedUser.eventBibId = this.data.athlete.eventBibId;
        selectedUser.eventId = this.data.athlete.eventId;
        let changeBib = new SelectModel();
        changeBib.init(selectedBib);
        this.superAdminClient
            .updateOnRegistrationEvent([selectedUser, changeBib])
            .subscribe((res) => {
                this.dialog.close('ok');
            });
    }
}
