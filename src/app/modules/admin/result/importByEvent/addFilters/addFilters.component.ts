import { KeyValue, KeyValuePipe, NgClass } from '@angular/common';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    inject,
    Inject,
    ChangeDetectorRef,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { resolveInlineLoader } from '@ngneat/transloco/lib/shared';
import { IconsModule } from 'app/core/icons/icons.module';
import {
    FilterStatus,
    PublishFilterFormulaDTO,
    PublishResultClient,
} from 'nswag-api-marathon';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-addFilters',
    template: `
        <div class="bg-main w-[1000px] p-6 flex flex-col gap-4">
            <div class="w-full flex justify-between items-center">
                <p class="font-[800] text-[32px] text-grey950toWhite">
                    {{ 'ADD' | transloco }}
                </p>
                @if (data.publishFormula) {
                <i
                    class="pi pi-trash text-[16px] cursor-pointer
                     text-red-600 font-medium"
                    (click)="deleteFormula()"
                ></i>
                }
            </div>
            <div
                class="w-full p-1 bg-[#F7F8F8] dark:bg-[#383942] flex rounded-xl relative"
            >
                <div
                    class="w-[50%] h-[88%] bg-white dark:bg-[#25262c] border dark:border-[#41434E] ease-in-out transition-[0.5s] border-[#D8DADF] rounded-[10px] absolute top-1 left4"
                    [ngClass]="{
                'translate-x-[100%] left-[-4px]': activeTab == 1,
            }"
                ></div>
                <button
                    class="min-h-[44px] max-h-[110px] rounded-[10px] z-10 relative w-full px-2 font-bold break-words notActiveBtn bg-transparent"
                    [ngClass]="{
                        'text-[#383942] dark:text-white': activeTab == 0
                    }"
                    (click)="activeTab = 0"
                >
                    {{ 'MainFilter' | transloco }}
                </button>
                <button
                    class="min-h-[44px] rounded-[10px] px-2 max-h-[110px] z-10 relative w-full font-bold notActiveBtn bg-transparent"
                    [ngClass]="{
                        'text-[#383942] dark:text-white': activeTab == 1
                    }"
                    (click)="activeTab = 1"
                >
                    {{ 'AdditionalFilter' | transloco }}
                </button>
            </div>
            <div class="flex gap-3 w-full" [formGroup]="publishFormName">
                <div class="w-full">
                    <label for="nameUZ">
                        {{ 'navigation.title' | transloco }} UZ</label
                    >
                    <p-iconField iconPosition="right">
                        <p-inputIcon styleClass="pi pi-book" />
                        <input
                            type="text"
                            pInputText
                            id="nameUZ"
                            formControlName="nameUZ"
                        />
                    </p-iconField>
                </div>
                <div class="w-full">
                    <label for="nameRU">
                        {{ 'navigation.title' | transloco }} РУ</label
                    >
                    <p-iconField iconPosition="right">
                        <p-inputIcon styleClass="pi pi-book" />
                        <input
                            type="text"
                            pInputText
                            id="nameRU"
                            formControlName="nameRU"
                        />
                    </p-iconField>
                </div>
                <div class="w-full">
                    <label for="nameEN">
                        {{ 'navigation.title' | transloco }} EN</label
                    >
                    <p-iconField iconPosition="right">
                        <p-inputIcon styleClass="pi pi-book" />
                        <input
                            type="text"
                            pInputText
                            id="nameEN"
                            formControlName="nameEN"
                        />
                    </p-iconField>
                </div>
            </div>
            <div [formGroup]="publishFilterName" class="grid grid-cols-4 gap-4">
                @for (item of publishFilterName.controls | keyvalue:originalOrder; track
                $index) {
                <div class="w-full">
                    <label for="{{ item.key }}"
                        >{{ item.key | transloco }}:</label
                    >
                    <p-checkbox
                        [formControlName]="item.key"
                        [binary]="true"
                    ></p-checkbox>
                </div>
                }
            </div>
            <div class="w-full flex justify-end">
                <p-button
                    [disabled]="
                        publishFilterName.invalid || publishFormName.invalid
                    "
                    (onClick)="saveOrUpdate()"
                    >{{ 'SAVE' | transloco }}</p-button
                >
            </div>
        </div>
    `,
    styleUrls: ['./addFilters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonModule,
        InputIconModule,
        IconFieldModule,
        InputTextModule,
        TranslocoModule,
        ReactiveFormsModule,
        CheckboxModule,
        KeyValuePipe,
        NgClass,
    ],
})
export class AddFiltersComponent implements OnInit {
    constructor(
        private matdialogRef: MatDialogRef<AddFiltersComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            eventId: number;
            publishFormula: PublishFilterFormulaDTO;
        },
        private _cdr: ChangeDetectorRef
    ) {}

    activeTab: FilterStatus = 0;

    publishFormName = new FormGroup({
        nameUZ: new FormControl('', Validators.required),
        nameRU: new FormControl('', Validators.required),
        nameEN: new FormControl('', Validators.required),
    });

    publishFilterName = new FormGroup(
        {
            isCountry: new FormControl(false),
            isRegion: new FormControl(false),
            isGender: new FormControl(false),
            isCategory: new FormControl(false),
            isGroup: new FormControl(false),
            isUniversityName: new FormControl(false),
            isCourse: new FormControl(false),
            isTeacherOTM: new FormControl(false),
            isOrganizationName: new FormControl(false),
            isOrganizationType: new FormControl(false),
        },
        { validators: this.atLeastOneTrue }
    );
    atLeastOneTrue(group: FormGroup): { [key: string]: boolean } | null {
        const atLeastOne = Object.values(group.value).some(
            (value) => value === true
        );
        return atLeastOne ? null : { atLeastOneTrue: true };
    }
    protected _publishResultClient = inject(PublishResultClient);
    ngOnInit() {
        if (this.data.publishFormula) {
            this.activeTab = this.data.publishFormula.filterStatus;
            this.publishFormName.patchValue(this.data.publishFormula);
            this.publishFilterName.patchValue(this.data.publishFormula);
            this._cdr.markForCheck();
        }
    }
    protected saveOrUpdate() {
        const publishFilter = new PublishFilterFormulaDTO();
        publishFilter.init(
            Object.assign(
                this.publishFilterName.value,
                this.publishFormName.value
            )
        );
        publishFilter.filterStatus = this.activeTab;
        publishFilter.eventId = this.data.eventId;
        if (this.data.publishFormula) {
            publishFilter.formulaId = this.data.publishFormula.formulaId;
            this._publishResultClient
                .updatePublishFilterFormula(publishFilter)
                .subscribe((res) => {
                    if (res.result) {
                        this.matdialogRef.close(true);
                    }
                });
            return;
        }
        this._publishResultClient
            .addPublishFilterFormula(publishFilter)
            .subscribe((res) => {
                if (res.result) {
                    this.matdialogRef.close(true);
                }
            });
    }
    deleteFormula() {
        this._publishResultClient
            .deletePublishFilterFormula(this.data.publishFormula.formulaId)
            .subscribe((res) => {
                this.matdialogRef.close(true);
            });
    }
    originalOrder = (
        a: KeyValue<number, string>,
        b: KeyValue<number, string>
    ): number => {
        return 0;
    };
}
