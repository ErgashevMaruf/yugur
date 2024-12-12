import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback.component';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { MatIconModule } from '@angular/material/icon';
import { SendfeedbackComponent } from './sendfeedback/sendfeedback.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
const feedbackRoutes: Route[] = [
    {
        path: '',
        component: FeedbackComponent,
    },
];

@NgModule({
    declarations: [FeedbackComponent,  SendfeedbackComponent],
    imports: [
        RouterModule.forChild(feedbackRoutes),
        DropdownModule,
        FileUploadModule,
        TableModule,
        MatIconModule,
        TranslocoModule,
        ReactiveFormsModule,
        NgClass
    ],
    exports:[SendfeedbackComponent]
})
export class feedbackModule {}
