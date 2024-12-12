import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsListComponent } from './events-list.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateEventEventBoxComponent } from './createEventEventBox/createEventEventBox.component';
import { SelectCategoryNumberModule } from 'app/shared/SelectCategoryNumber/selectCategoryNumber.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { NgxMaskModule } from 'ngx-mask';
import { TableModule } from 'primeng/table';
import { Route, Router, RouterModule } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import { ImgCropperModule } from 'app/shared/imgCropper/imgCropper.module';
import { NgxEditorModule } from 'ngx-editor';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { DebounceInputDirective } from 'app/shared/directives/debounce-input.directive';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { ImageModule } from 'primeng/image';
import { EventStatusPipe } from './eventStatus.pipe';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DragDirective } from './create-event/dragAndDrop.directive';
import { TooltipModule } from 'primeng/tooltip';
const route:Route[] = [{
    path:'',
    component:EventsListComponent
}]

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    SelectCategoryNumberModule,
    ReactiveFormsModule,
    FormsModule,
    TranslocoModule,
    NgxMaskModule,
    TableModule,
    RouterModule.forChild(route),
    EditorModule,
    CalendarModule,
    SelectCategoryNumberModule,
    NumberFormatPipeModule,
    ImgCropperModule,
    NgxEditorModule,
    MultiSelectModule,
    InputNumberModule,
    DropdownModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    DebounceInputDirective,
    TranslateAsyncPipe,
    ImageModule,
    EventStatusPipe,
    SelectButtonModule,
    DragDirective,
    TooltipModule
],
  declarations: [	EventsListComponent,
   CreateEventComponent,
    CreateEventEventBoxComponent,
   ]
})
export class EventsListModule { }
