import { NgClass } from '@angular/common';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    inject,
    Inject,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { INewsDTO, NewsClient, NewsDTO, NewsStatus } from 'nswag-api/nswag-api-marathon';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

export type oveRideNewsDTO = Omit<INewsDTO, 'newsStatus'> & {
    newsStatus: boolean;
};

@Component({
    selector: 'app-newsForm',
    template: `
        <div
            class="bg-main w-[600px] p-6 flex flex-col gap-4"
            [formGroup]="newForm"
        >
            <div class="flex w-full justify-between">
                <p class="font-[800] text-[32px] text-grey950toWhite">
                    {{ 'ADD' | transloco }}
                </p>
                <div class="flex gap-2 items-center">
                    <label for="label">{{ 'newsstatus' | transloco }}</label>
                    <p-checkbox
                        formControlName="newsStatus"
                        [binary]="true"
                        inputId="binary"
                    />
                </div>
            </div>
            <div
                class="w-full p-1 bg-[#F7F8F8] dark:bg-[#383942] flex rounded-xl relative"
            >
                <div
                    class="w-[33%] h-[88%] bg-white dark:bg-[#25262c] border dark:border-[#41434E] ease-in-out transition-[0.5s] border-[#D8DADF] rounded-[10px] absolute top-1 left4"
                    [ngClass]="{
                'translate-x-[100%]': activeTab == 'RU',
                'translate-x-[200%] left-0': activeTab == 'EN',
            }"
                ></div>
                <button
                    class="min-h-[44px] max-h-[110px] rounded-[10px] z-10 relative w-full px-2 font-bold break-words notActiveBtn bg-transparent"
                    [ngClass]="{
                        'text-[#383942] dark:text-white': activeTab == 'UZ'
                    }"
                    (click)="activeTab = 'UZ'"
                >
                    {{ 'O’zbek' }}
                </button>
                <button
                    class="min-h-[44px] rounded-[10px] px-2 max-h-[110px] z-10 relative w-full font-bold notActiveBtn bg-transparent"
                    [ngClass]="{
                        'text-[#383942] dark:text-white': activeTab == 'RU'
                    }"
                    (click)="activeTab = 'RU'"
                >
                    {{ 'Русский' | transloco }}
                </button>
                <button
                    class="min-h-[44px] rounded-[10px] px-2 max-h-[100px] w-full font-bold notActiveBtn relative z-10"
                    [ngClass]="{
                        'text-[#383942] dark:text-white': activeTab == 'EN'
                    }"
                    (click)="activeTab = 'EN'"
                >
                    {{ 'English' | transloco }}
                </button>
            </div>
            <div>
                <label for="eventName">
                    {{ 'navigation.title' | transloco }}</label
                >
                <p-iconField iconPosition="right">
                    <p-inputIcon styleClass="pi pi-book" />
                    <input
                        type="text"
                        [formControl]="newForm.get('title' + activeTab)"
                        pInputText
                        id="eventName"
                    />
                </p-iconField>
            </div>
            <div>
                <label for="location"> {{ 'feedback.text' | transloco }}</label>
                <textarea
                    class="h-[400px] resize-none"
                    type="text"
                    [formControl]="newForm.get('text' + activeTab)"
                    pInputText
                    id="location"
                ></textarea>
            </div>
            <div class="w-full flex justify-end">
                <p-button [disabled]="newForm.invalid" (onClick)="addNews()">{{
                    'SAVE' | transloco
                }}</p-button>
            </div>
        </div>
    `,
    styleUrls: ['./newsForm.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        NgClass,
        MatIconModule,
        TranslocoModule,
        ButtonModule,
        ReactiveFormsModule,
        CheckboxModule,
    ],
    standalone: true,
})
export class NewsFormComponent implements OnInit {
    activeTab = 'UZ';
    newForm = new FormGroup({
        titleUZ: new FormControl('', Validators.required),
        titleRU: new FormControl('', Validators.required),
        titleEN: new FormControl('', Validators.required),
        textEN: new FormControl('', Validators.required),
        textUZ: new FormControl('', Validators.required),
        textRU: new FormControl('', Validators.required),
        newsStatus: new FormControl(false),
    });
    constructor(
        private matdialogRef: MatDialogRef<NewsFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { news: NewsDTO }
    ) {}
    newsClient$ = inject(NewsClient);
    addNews() {
        const news = new NewsDTO();
        news.init(this.newForm.value);
        news.newsStatus = this.newForm.value.newsStatus ? 10 : 20;
        if (this.data?.news) {
            news.id = this.data.news.id;
            this.newsClient$.update(news).subscribe((res) => {
                if (res) {
                    this.matdialogRef.close(news);
                }
            });
            return;
        }
        this.newsClient$.save(news).subscribe((res) => {
            if (res) {
                this.matdialogRef.close(res);
            }
        });
    }

    ngOnInit() {
        if (this.data?.news) {
            const news: any = this.data.news;
            news.newsStatus =
                this.data.news.newsStatus == NewsStatus.Active ? true : false;
            this.newForm.patchValue(news);
        }
    }
}
