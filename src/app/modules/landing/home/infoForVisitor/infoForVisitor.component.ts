import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';

@Component({
    selector: 'app-infoForVisitor',
    template: `
        <div
            class="sm:w-[600px] w-[350px] max-h-[80vh] overflow-auto flex flex-col sm:gap-6 gap-4 sm:p-9 p-4 bg-white dark:bg-[#25262c]"
        >
            <div class="w-full flex justify-between">
                <h3 class="sm:text-[32px] text-[20px]">{{ 'Announcement' | transloco }}</h3>
                <div
                    class="w-10 h-10 flex items-center justify-center cursor-pointer bg-[#F7F8F8] rounded-full"
                    (click)="closeDialog()"
                >
                    <i class="pi-times pi text-[#707587]"></i>
                </div>
            </div>
            <hr class="w-full h-[1px] bg-[#EDEDF1] m-0" />
            <p
                class="text-[#25262C] dark:text-white
            font-semibold
            sm:text-[20px] text-[14px]"
            >
                {{ 'headerOneInfo' | transloco }}
            </p>
            <div class="w-full gap-3 flex flex-col">
                @for (item of price; track $index) {
                <div
                    class="flex justify-between px-4 py-2 bg-[#F7F8F8] dark:bg-[#383942] rounded-[8px]"
                >
                    <div class="flex gap-2 items-center">
                        <img
                        class="w-6 h-6"
                        [src]="'./assets/place/' + item.img" alt="" />
                        <p class="text-[#41434E] dark:text-[#B6B9C3] font-semibold sm:text-[16px] text-[12px]">
                            {{ item.transloco | transloco }}
                        </p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <mat-icon
                            class="text-[#55A93E]"
                            svgIcon="moneyLanding"
                        ></mat-icon>
                        <p class="text-[#41434E] sm:text-[16px] text-[12px] dark:text-[#B6B9C3] font-semibold">
                            <span>{{ item.price | numberFormat }} </span
                            >{{ 'SUM' | transloco }}
                        </p>
                    </div>
                </div>
                }
            </div>
            <p
                class="text-[#25262C] dark:text-white
             font-semibold sm:text-[20px] text-[14px]"
            >
                {{ 'headerTwoInfo' | transloco }}
            </p>
            <div class="w-full gap-3 flex flex-col">
                @for (item of region; track $index) {
                    <div
                    class="flex justify-between px-4 py-2 bg-[#F7F8F8] dark:bg-[#383942] rounded-[8px]"
                >
                    <div class="flex gap-2 items-center">
                        <img
                        class="w-6 h-6"
                        [src]="'./assets/place/' + item.img" alt="" />
                        <p class="text-[#41434E] dark:text-[#B6B9C3]  font-semibold sm:text-[16px] text-[12px]">
                            {{ item.transloco | transloco }}
                        </p>
                    </div>
                    <div class="flex gap-2 items-center">
                        <mat-icon
                            class="text-[#55A93E]"
                            svgIcon="signCalendar"
                        ></mat-icon>
                        <p class="text-[#41434E] sm:text-[16px] text-[12px] dark:text-[#B6B9C3] font-semibold">
                            <span>{{ item.price  }} </span
                            >{{ 'MONTH' | transloco }}
                        </p>
                    </div>
                </div>
                }
            </div>
        </div>
    `,
    styleUrls: ['./infoForVisitor.component.css'],
    standalone: true,
    imports: [TranslocoModule, MatIconModule, NumberFormatPipeModule],
})
export class InfoForVisitorComponent implements OnInit {
    constructor(private _matdialog: MatDialog) {}
    closeDialog() {
        this._matdialog.closeAll();
    }
    price = [
        {
            img: '1.png',
            transloco: 'firstPlace',
            price: 5000000,
        },
        {
            img: '2.png',
            transloco: 'secondPlace',
            price: 3000000,
        },
        {
            img: '3.png',
            transloco: 'thirdPlace',
            price: 3000000,
        },
    ];

    region = [
        {
            img: '1.png',
            transloco: 'firstPlace',
            price: 6,
        },
        {
            img: '2.png',
            transloco: 'secondPlace',
            price: 4,
        },
        {
            img: '3.png',
            transloco: 'thirdPlace',
            price: 2,
        },
    ];
    ngOnInit() {
        localStorage.setItem('firstTimePopUp', 'false');
    }
}
