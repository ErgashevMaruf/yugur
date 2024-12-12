import {
    Component,
    ElementRef,
    forwardRef,
    Injector,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
    EventBoxDTO,
    EventClient,
    EventDTO,
    JoinRegistationEventDTO,
    RegistationEventClient,
    RepaymentStatus,
    Status,
} from 'nswag-api/nswag-api-marathon';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogModule,
} from '@angular/material/dialog';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { environment } from 'app/core/env/environment.prod';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { UserService } from 'app/core/user/user.service';
import { PaymeService } from 'app/modules/services/payme.service';
import { fuseAnimations } from '@fuse/animations';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { EventsLoopComponent } from 'app/modules/user/events/eventsLoop/eventsLoop.component';
import { MatIconModule } from '@angular/material/icon';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import { RepaymentRequestComponent } from './repaymentRequest/repaymentRequest.component';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    animations: fuseAnimations,
    standalone: true,
    imports: [
    MatIconModule,
    TranslocoModule,
    MatDialogModule,
    NgClass,
    forwardRef(() => EventsLoopComponent),
    NumberFormatPipeModule,
    DatePipe,
    TranslateAsyncPipe,
    AsyncPipe,
],
})
export class DetailsComponent implements OnInit {
    @Input() myEvent = false;
    @Input() event: EventBoxDTO;
    @Input() class = 'sm:w-[690px] w-[350px] sm:max-h-screen max-h-[90vh] sm:p-9 p-4';

    message = 'requestToReturnMoney';
    btnString = 'sendToRequest';

    @Input() landingEvent: {
        event?: EventBoxDTO;
        isLanding?: boolean;
        activeEvent?: EventDTO;
    };
    location: string;
    activeLang: string;
    private child: ElementRef;
    url = environment.URL;
    isDetailSee = false;
    isPrice: boolean;
    error = false;
    activeIndex: number;
    @Input() activeEvent: EventDTO;
    btnDisable = false;
    status: Status;
    constructor(
        private dialog: MatDialog,
        private injector: Injector,
        private languageService: TranslocoService,
        private eventClient: EventClient,
        private router: Router,
        private registrationEventClient: RegistationEventClient,
        private userService: UserService,
        private paymeService: PaymeService,
    ) {
        this.landingEvent = this.injector.get(MAT_DIALOG_DATA, null);
        if (this.landingEvent) {
            this.event = this.landingEvent.event;
            this.activeEvent = this.landingEvent?.activeEvent;
            this.eventClient
                .eventBoxById(this.landingEvent.event.id)
                .subscribe((res) => {
                    this.event = res.result;
                    if (!this.activeEvent) {
                        let id = this.event.myRegistrationEvent.eventId;
                        this.activeEvent = this.event.events.find(
                            (el) => el.id == id
                        );
                    }
                });
        }
    }
    details: string;
    @ViewChild('child') set content(content: ElementRef) {
        const descriptionContentElement =
            document.getElementById('descriptionContent');
        if (descriptionContentElement) {
            descriptionContentElement.remove();
        }
        let data = `<div
            id="descriptionContent"
            >
            ${this.event['description' + this.activeLang]}
            </div>`;
        if (content) {
            this.child = content;
            this.child.nativeElement.insertAdjacentHTML('afterbegin', data);
        }
    }

    ngOnInit() {
        this.activeLang = this.languageService.getActiveLang().slice(0, 2).toUpperCase();
        if (this.myEvent) {
            this.setMessageAndBtnText();
        }
    }
    setMessageAndBtnText() {
        this.isPrice = this.event.myRegistrationEvent.isPrice;

        this.status = this.event.myRegistrationEvent.status;

        if (this.status == Status.Inserted) {
            this.message = 'coninueYourProgress';
            this.btnString = 'join.us';
        }

        if (this.status == Status.Registered) {
            if (this.isPrice) {
                if (
                    this.event.myRegistrationEvent.repaymentStatus ==
                    RepaymentStatus.NEW
                ) {
                    this.message = 'yourRequestAcceptPleaseWait';
                    this.btnString = 'requestSended';
                    this.btnDisable = true;
                } else {
                    this.message = 'ifYouWantLeftSendRequest';
                    this.btnString = 'sendRequest';
                }
            } else {
                this.message = 'ifYouWantLeft';
                this.btnString = 'leftEvent';
            }
        }
    }

    gotoSignIn(event) {
        localStorage.setItem('eventId', '' + this.landingEvent.event.id);
        this.router.navigateByUrl('/sign-in');
    }
    copyEventUrl(event: number) {
        let url = environment.API_BASE_URL;
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = url + '/#/details/' + event;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.dialog.open(SuccessComponent, {
            data: 'Link.coppied',
        });
    }
    controlBTN() {
        if (this.status == Status.Registered) {
            if (this.isPrice) {
                const dialog = this.dialog.open(RepaymentRequestComponent, {
                    data: this.event.myRegistrationEvent.orderId,
                    disableClose: true,
                });
                dialog.afterClosed().subscribe((res) => {
                    if (res) {
                        this.dialog.open(SuccessComponent);
                        this.message = 'yourRequestAcceptPleaseWait'
                        this.btnDisable = true;
                    }
                });
            } else {
                this.registrationEventClient
                    .deleteRegisteredEventAthlete(
                        this.event.myRegistrationEvent.eventId
                    )
                    .subscribe((res) => {
                        this.dialog.closeAll();
                        this.router.navigate(['/']);
                    });
            }
        }

        if (this.status == Status.Inserted) {
            if (this.isPrice) {
                this.gotoPayme(this.event);
            } else {
                this.registrationEventClient.joinEventAthletes(new JoinRegistationEventDTO({
                    eventId: this.activeEvent.id,
                    bibCode: this.event.myRegistrationEvent.bibNumber,
                    smenaId: this.event.myRegistrationEvent.smenaId,
                    selectBibType:1,
                    isERPSport: false,
                    eventPacketId: this.event.myRegistrationEvent.eventPacketId,
                    isVipNumber:false
                })).subscribe(res=>{
                    this.dialog.open(SuccessComponent);
                })
            }
        }
    }
    gotoPayme(event: EventBoxDTO) {
        this.paymeService.gotoPayme(
            event.myRegistrationEvent.orderId,
            event.myRegistrationEvent.allSum,
            this.userService.userInfo.athletesId
        );
    }
    closeMatdialog()
    {
        this.dialog.closeAll()
    }
}
