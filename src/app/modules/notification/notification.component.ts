import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    HostListener,
} from '@angular/core';
import { NavComponent } from '../landing/home/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { fuseAnimations } from '@fuse/animations';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';

@Component({
    selector: 'app-notification',
    template: `
        <div class="w-full">
            <div class="flex gap-3 items-center">
                <h3 class="headingPage mb-0">
                    {{ 'Notifications' | transloco }}
                </h3>
                <i class="pi cursor-pointer pi-arrow-right-arrow-left"
                (click)="showMessages=!showMessages"
                ></i>
            </div>
            <div class="w-full flex gap-4 h-full">
                @if (showMessages) {
                <div
                    class="sm:w-1/2 w-full sm:h-[60vh] h-full overflow-y-auto sm:pr-0 pr-4 sm:relative bg-main fixed z-40"
                    [@fadeInLeft]="showMessages"
                    >
                    @for (notification of notifications; track $index) {
                    <p class="text-grey500To400 mb-2">
                        {{ notification.title }}
                    </p>
                    @for (item of notification.message; track $index; let last =
                    $last) {
                    <div
                        class="w-full cursor-pointer
                    flex items-center gap-3 sm:justify-between
                    hover:bg-grey50To900 hover:rounded-b-[16px] mb-1 hover:border-b-transparent container
                    rounded-[16px] p-4"
                        [ngClass]="{
                            'border-b rounded-b-none border-grey100To800': !last
                        }"
                    >
                        <mat-icon
                            class="matIconColor"
                            svgIcon="mailFooter"
                        ></mat-icon>
                        <div class="w-full">
                            <div
                                class="w-full flex justify-between gap-2 items-center"
                            >
                                <p
                                    class="line-clamp-1 text-grey800To300 font-bold"
                                >
                                    {{ item.title }}
                                </p>
                                <p class="text-grey400To300">{{ item.time }}</p>
                            </div>
                            <p class="line-clamp-1 text-grey500To400">
                                {{ item.message }}
                            </p>
                        </div>
                    </div>
                    } }
                </div>
                }
                <div
                    class="w-full rounded-[24px]  flex bg-grey50To900 flex-col justify-between sm:min-h-[60vh] h-full p-9"
                    @fadeInRight
                    >
                    <div>
                        <p
                            class="text-grey950ToWhite text-[24px] font-[800] mb-4"
                        >
                            Yangi nafas- Vatan qalqoni
                        </p>
                        <p class="text-grey700To200 font-medium text-[16px]">
                            Это общественно-патриотические соревнования по бегу
                            «Щит Родины» и общественно-патриотические
                            соревнования по бегу «Новое дыхание», посвященные
                            «Дню молодежи» и «Олимпийскому дню», посвященные Дню
                            Международного олимпийского комитета, Министерства
                            спорта Республики Узбекистан, Национального Нас ждут
                            Олимпийский комитет, Федерация легкой атлетики
                            Узбекистана, Министерство высшего образования, науки
                            и инноваций Республики Узбекистан, Агентство по
                            делам молодежи и участники всех государственных
                            организаций, защищающих права и ВАС!
                        </p>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="pi pi-clock text-grey600To200"></i>
                        <p class="text-grey600To200 mr-6">12:22</p>
                        <i class="pi pi-user text-grey600To200 mr-2"></i>
                        <p class=" text-grey600To200">Администрация</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./notification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatIconModule, NgClass, TranslocoModule],
    animations:fuseAnimations
})
export default class NotificationComponent implements OnInit {
    notifications: import("d:/template_project_aspnetcore7_angular/FrontEnd/YugurBotApp/src/nswag-api-marathon").NotificationDTO[];
    constructor(private notificationService:NotificationsService) {}
    showMessages = true;
    active = 0;
    // notifications = [
    //     {
    //         title: 'Сегодня',
    //         message: [
    //             {
    //                 title: 'Yangi nafas vatan qalqoni',
    //                 message: 'У меня есть объявление специально для вас:',
    //                 time: '12:22',
    //             },
    //             {
    //                 title: 'Yangi nafas vatan qalqoni',
    //                 message: 'У меня есть объявление специально для вас:',
    //                 time: '12:22',
    //             },
    //         ],
    //     },
    //     {
    //         title: 'Вчера',
    //         message: [
    //             {
    //                 title: 'Yangi nafas vatan qalqoni',
    //                 message: 'У меня есть объявление специально для вас:',
    //                 time: '12:22',
    //             },
    //         ],
    //     },
    //     {
    //         title: '22 Августа, 2024',
    //         message: [
    //             {
    //                 title: 'Yangi nafas vatan qalqoni',
    //                 message: 'У меня есть объявление специально для вас:',
    //                 time: '12:22',
    //             },
    //             {
    //                 title: 'Yangi nafas vatan qalqoni',
    //                 message: 'У меня есть объявление специально для вас:',
    //                 time: '12:22',
    //             },
    //             {
    //                 title: 'Yangi nafas vatan qalqoni',
    //                 message: 'У меня есть объявление специально для вас:',
    //                 time: '12:22',
    //             },
    //         ],
    //     },
    // ];

    ngOnInit() {
        if (window.innerWidth <= 600) {
            this.showMessages = false;
        }
        this.notificationService.notifications$.subscribe(res=>{
            this.notifications = res;
        })
    }
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth <= 600) {
            this.showMessages = false;
        }
    }
}
