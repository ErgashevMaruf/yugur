import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { WarningComponent } from 'app/shared/messages/warning/warning.component';
import {
    HttpStatusCode,
    INewsDTO,
    NewsClient,
    NewsDTO,
    NewsStatus,
    TableMetaData,
} from 'nswag-api-marathon';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { Subject, catchError, throwError } from 'rxjs';
import { NewsFormComponent } from './newsForm/newsForm.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css'],
    standalone: true,
    imports: [
        MatIconModule,
        MessagesModule,
        NgClass,
        ReactiveFormsModule,
        DatePipe,
        TranslocoModule,
        CheckboxModule,
        ButtonModule,
        AccordionModule,
        TranslateAsyncPipe,
        AsyncPipe
    ],
    providers: [ConfirmationService, MessageService],
})
export default class NewsComponent implements OnInit, AfterViewInit {
    addnewsState = false;
    newsList: NewsDTO[];
    status = NewsStatus;
    searchingState = false;
    constructor(
        private newsClient: NewsClient,
        private fb: FormBuilder,
        private dialog: MatDialog
    ) {}
    news: FormGroup;
    searchTable = new TableMetaData({
        filters: '{}',
        rows: 30,
        first: 0,
        sortOrder: 0,
    });
    searching = new Subject<boolean>();
    @ViewChild('placeholder') placeholder: ElementRef;
    ngOnInit() {
        this.searching.subscribe((res) => {
            if (res) {
                this.newsClient.list(this.searchTable).subscribe((res) => {
                    this.newsList.push(...res.result.items);
                    if (res.result.items.length < 30) {
                        this.searchingState = false;
                    }
                });
            } else {
                this.newsClient.list(this.searchTable).subscribe((res) => {
                    this.newsList = res.result.items;
                    if (res.result.items.length > 30) {
                        this.searchingState = true;
                    }
                });
            }
        });
        this.searching.next(false);
    }
    addnewsMenu(state: boolean) {
      const data =   this.dialog.open(NewsFormComponent)
        data.afterClosed().subscribe(res=>{
            if(res)
            {
                this.newsList.unshift(res);
            }
        })
    }

    edit(x: NewsDTO, index:number) {
      const dialog = this.dialog.open(NewsFormComponent, {
            data:{
                news: x
            }
        })

    }
    confirmPopUp(x) {
        const dialog = this.dialog.open(WarningComponent);
        dialog.afterClosed().subscribe((res) => {
            if (res == 'yes') {
                this.newsClient
                    .delete(x.id)
                    .pipe(
                        catchError((error: HttpErrorResponse) => {
                            let data = '';
                            if (error.status == HttpStatusCode.NotFound) {
                                data = 'notFound';
                            }
                            this.dialog.open(ErrorComponent, {
                                data: data,
                            });
                            return throwError(() => error);
                        })
                    )
                    .subscribe((res) => {
                        let index = this.newsList.findIndex(
                            (el) => el.id == x.id
                        );
                        this.newsList.splice(index, 1);
                    });
            }
        });
    }
    ngAfterViewInit(): void {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && this.searchingState) {
                    this.searchTable.first += 10;
                    this.searching.next(true);
                }
            });
        }, options);

        observer.observe(this.placeholder.nativeElement);
    }
}
