import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { DetailsComponent } from 'app/modules/user/events/details/details.component';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { SelectNumberComponent } from 'app/shared/SelectNumberForUsers/selectNumber.component';
import { EventBoxDTO } from 'nswag-api/nswag-api-marathon';
import { CheapestPipe } from './cheapest.pipe';

@Component({
    selector: 'app-eventsLoop',
    templateUrl: './eventsLoop.component.html',
    styleUrls: ['./eventsLoop.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatDialogModule,
        TranslocoModule,
        NumberFormatPipeModule,
        DetailsComponent,
        TranslateAsyncPipe,
        CheapestPipe
    ],
})
export class EventsLoopComponent implements OnInit {
    @Input() eventBox: EventBoxDTO;
    @Input() openBibSelect = false;
    @Input() isUsedDetails = false;
    activeIndex: number = 1;
    next = true;
    slideConfig = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 100,
        draggable: true,
        vertical: true,
        verticalSwiping: true,
    };
    slides: any;
    @Input() styleClass = 'bg-white py-2 dark:bg-[#25262C]';
    showDetails = false;
    event: any;
    touchStartPosition: any;
    constructor(private matdialog: MatDialog, private _router: Router) {}

    ngOnInit() {
        if (this.eventBox.events.length == 1) {
            this.activeIndex = 0;
        }
    }
    nextOrPrev(event, slickModal, divMain) {
        if (event > 0) {
            this.next = true;
            slickModal.slickNext();
            return;
        }
        this.next = false;
        slickModal.slickPrev();
    }
    openDetails(event) {
        this.event = event;
        if (this.openBibSelect) {
            const dialog = this.matdialog.open(SelectNumberComponent, {
                data: {
                    event: event,
                    offertaFileId: this.eventBox.offerFileId
                },
                disableClose: true,
            });
            dialog.afterClosed().subscribe((res) => {
                if (res == 'success') {
                    this.matdialog.open(SuccessComponent);
                    setTimeout(() => {
                        this._router.navigate(['/']);
                    }, 2000);
                }
            });
            return;
        }
        this.matdialog.open(DetailsComponent, {
            data: { event: this.eventBox, isLanding: true, activeEvent: event },
        });
    }
    touchStart(event) {
        this.touchStartPosition = event.touches[0].clientY;
    }
    index = 10;
    touchEnd(event, scrollableDiv: HTMLElement) {
        let touchEndPosition = event.changedTouches[0].clientY;
        if (this.touchStartPosition == touchEndPosition || this.eventBox.events.length<=2) {
            return;
        }

        if (this.touchStartPosition > touchEndPosition + 5) {
            this.activeIndex += 1;
            this.index += 124;
        } else {
            if (this.index > 124) {
                this.index -= 124;
                this.activeIndex-=1;
            }
        }
        scrollableDiv.scrollTo({
            top: this.index,
            behavior: 'smooth',
        });
    }
}
