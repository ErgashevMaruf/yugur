import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from './result.component';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CaruselModule } from 'app/shared/carusel/carusel.module';
import { ExportByEventComponent } from './exportByEvent/exportByEvent.component';
import { ImportByEventComponent } from './importByEvent/importByEvent.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { TagModule } from 'primeng/tag';
import { DebounceInputDirective } from 'app/shared/directives/debounce-input.directive';
import { ShowEventsComponent } from './showEvents/showEvents.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';

const route: Route[] = [
    {
        path: 'exportResult',
        component: ShowEventsComponent,
    },
    {
        path: 'importResult',
        component: ShowEventsComponent,
    },
    {
        path: 'exportByEventBox/:id',
        component: ExportByEventComponent
    },
    {
        path: 'importByEvent/:id',
        component: ImportByEventComponent
    }
];

@NgModule({
    imports: [
        CalendarModule,
        CommonModule,
        RouterModule.forChild(route),
        TranslocoModule,
        CaruselModule,
        TableModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        CheckboxModule,
        DropdownModule,
        MatTooltipModule,
        ToastModule,
        RippleModule,
        TranslateAsyncPipe,
        InputIconModule,
        IconFieldModule,
        TagModule,
        DebounceInputDirective,
        ConfirmDialogModule,
        TooltipModule,
        AccordionModule,
        DialogModule
    ],
    declarations: [
        ResultComponent,
        ExportByEventComponent,
        ImportByEventComponent
    ],
})
export class ResultModule {}
