import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ScoresComponent } from './scores.component';
import { TableModule } from 'primeng/table';
import { LottieModule } from 'ngx-lottie';
import { MatIconModule } from '@angular/material/icon';
import { DropdownModule } from 'primeng/dropdown';
import { CircleComponent } from './circle/circle.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckpointComponent } from './checkpoint/checkpoint.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CountUpDirectiveModule } from 'app/modules/directives/countUpDirective.module';
import { SemiCircleComponent } from './semi-circle/semi-circle.component';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { AsyncPipe } from '@angular/common';
const scoreRoutes: Route[] = [
    {
        path: '',
        component: ScoresComponent,
    },
];

@NgModule({
    declarations: [ScoresComponent, CheckpointComponent],
    imports: [
        RouterModule.forChild(scoreRoutes),
        TableModule,
        LottieModule,
        MatIconModule,
        DropdownModule,
        CircleComponent,
        TableModule,
        InputTextModule,
        ButtonModule,
        MatDialogModule,
        CountUpDirectiveModule,
        SemiCircleComponent,
        TranslateAsyncPipe,
        TooltipModule,
        TranslocoModule,
        AsyncPipe
    ],
})
export class ScoresModule {}
