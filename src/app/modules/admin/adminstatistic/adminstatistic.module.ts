import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminstatisticComponent } from './adminstatistic.component';
import { Route, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DropdownModule } from 'primeng/dropdown';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';
import { FinishedEventComponent } from './finishedEvent/finishedEvent.component';
import { RepublicStatisticComponent } from "./republicStatistic/republicStatistic.component";
import { LineColumnMixedComponent } from "./lineColumnMixed/lineColumnMixed.component";
import { WaterAnimationComponent } from './waterAnimation/waterAnimation.component';
import { StatisticComponent } from "../../../shared/statistic/statistic.component";
import { CarouselModule } from 'primeng/carousel';
import { PaginatorModule } from 'primeng/paginator';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import { TableComponent } from './top-table/table.component';
import { UniversityTableComponent } from './university-user-table/table.component';
import { PaymentStatisticComponent } from './paymentStatistic/paymentStatistic.component';
import { ActiveParticipantsComponent } from './activeParticipants/activeParticipants.component';
import { ActiveEventNotFoundComponent } from "../../user/activeEventNotFound/activeEventNotFound.component";
import { RecordsmensComponent } from "./recordsmens/recordsmens.component";
import { ParticipantStatisticComponent } from './participantStatistic/participantStatistic.component';
import { FormsModule } from '@angular/forms';
import { UniversitetesTableComponent } from './universitetes-table/universitetes-table.component';


 export const route:Route[] = [{
    path:'',
    component: AdminstatisticComponent
}]

@NgModule({
  imports: [
    CommonModule,
    NgApexchartsModule,
    FormsModule,
    RouterModule.forChild(route),
    DropdownModule,
    TranslocoModule,
    MatIconModule,
    FinishedEventComponent,
    RepublicStatisticComponent,
    LineColumnMixedComponent,
    WaterAnimationComponent,
    StatisticComponent,
    CarouselModule,
    PaginatorModule,
    NumberFormatPipeModule,
    TableComponent,
    UniversityTableComponent,
    PaymentStatisticComponent,
    ActiveParticipantsComponent,
    RecordsmensComponent,
    ParticipantStatisticComponent,
    UniversitetesTableComponent,
    ActiveEventNotFoundComponent
],
  declarations: [AdminstatisticComponent]
})
export class AdminstatisticModule { }
