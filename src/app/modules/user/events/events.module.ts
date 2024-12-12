import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { eventsRoutes } from './events.routing';
import { DetailsComponent } from './details/details.component';
import { MatIconModule } from '@angular/material/icon';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgxMaskModule } from 'ngx-mask';
import { SelectNumberForUsers } from '../../../shared/SelectNumberForUsers/selectNumberForUsers.module';
import { CaruselModule } from 'app/shared/carusel/carusel.module';
import { EditorModule } from 'primeng/editor';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import { StatusPipe } from './details/status.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoModule } from '@ngneat/transloco';
import { ScrollWithMouseDirective } from 'app/modules/directives/scrollWithMouse.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EventsInfoComponent } from 'app/shared/Components/eventsInfo/eventsInfo.component';
@NgModule({
    declarations: [
        EventsComponent,
    ],
    imports: [
        TranslocoModule,
        RouterModule.forChild(eventsRoutes),
        MatIconModule,
        RadioButtonModule,
        NgxMaskModule,
        SelectNumberForUsers,
        CaruselModule,
        EditorModule,
        MatTooltipModule,
        NumberFormatPipeModule,
        StatusPipe,
        InputTextModule,
        MatDialogModule,
        ScrollWithMouseDirective,
        CommonModule,
        DetailsComponent,
        EventsInfoComponent
    ],
    exports:[]
})
export class EventsModule {}
