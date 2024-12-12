import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import {
    RegistationEventClient,
    RegistationEventDTO,
    SelectRegistationEventDTO,
} from 'nswag-api-marathon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-giveNumber',
    template: `
        <div
            class="w-[600px] p-5 bg-white flex flex-col gap-4 dark:bg-[#0f172a] text-[16px] max-h-screen overflow-y-auto"
        >
            <div
                class="bg-[#0098DA] text-white rounded p-1 flex justify-between px-2"
            >
                <span class="">{{ data.user.athletes.fullName }}</span>
            </div>
            <div class="flex gap-3 items-center">
                <label for="bib" class="text-[14px] font-medium">{{
                    'GivenNumber' | transloco
                }}</label>
                <input
                    pInputText
                    id="bib"
                    inputId="integeronly"
                    [(ngModel)]="bib"
                    (input)="isError=false"
                    type="number"
                />
            </div>
            @if(isError) {
                <p class="text-center text-red-600 font-semibold text-[20px]">{{'thisNumberTaken' | transloco}}</p>
             }
            <div class="w-full flex justify-end">
                <p-button
                    styleClass="bg-[#0098da] text-white"
                    [disabled]="!bib"
                    (onClick)="sendRequest()"
                >
                    {{ 'popgo' | transloco }}
                </p-button>
            </div>
        </div>
    `,
    standalone: true,
    imports: [TranslocoModule, FormsModule, InputTextModule, ButtonModule],
})
export class GiveNumberComponent implements OnInit {
    bib: number;
    isError = false;

    constructor(
        private registrationEventClient: RegistationEventClient,
        @Inject(MAT_DIALOG_DATA) public data: { user: RegistationEventDTO },
        private matdialogRef: MatDialogRef<GiveNumberComponent>
    ) {}

    ngOnInit() {}

    sendRequest() {
        const selectBibDTO = new SelectRegistationEventDTO();
        selectBibDTO.athletesId = this.data.user.athletesId;
        selectBibDTO.eventId = this.data.user.eventId;
        selectBibDTO.bibCode = this.bib;
        this.registrationEventClient
            .isGivenNumberRegistationEvent([selectBibDTO], true)
            .pipe(
                catchError((err) => {
                    this.isError = true;
                    return of(false);
                })
            )
            .subscribe((res) => {
                if(res)
                {
                    this.matdialogRef.close('ok');
                }
            });
    }
}
