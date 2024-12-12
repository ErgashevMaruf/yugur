import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CarouselModule } from 'primeng/carousel';
import { TableModule } from 'primeng/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';
import { WarningComponent } from './messages/warning/warning.component';
import { NotFoundComponent } from './messages/notFound/notFound.component';
import { LottieModule } from 'ngx-lottie';
import { SuccessComponent } from './messages/success/success.component';
import { ErrorComponent } from './messages/error/error.component';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmuserComponent } from './messages/confirmuser/confirmuser.component';
import { AlreadyhaveComponent } from './messages/alreadyhave/alreadyhave.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumberFormatPipeModule } from 'app/modules/pipes/numberFormat.module';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { DialogNavbarComponent } from './Components/dialog-navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateAsyncPipe } from 'app/modules/pipes/translate-async.pipe';
@NgModule({
    declarations: [
        WarningComponent,
        NotFoundComponent,
        SuccessComponent,
        ErrorComponent,
        ConfirmuserComponent,
        AlreadyhaveComponent,
        NavbarComponent,
        DialogNavbarComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        DropdownModule,
        TagModule,
        ReactiveFormsModule,
        TranslocoModule,
        TableModule,
        NgApexchartsModule,
        MatIconModule,
        ScrollTopModule,
        RouterModule,
        LanguagesModule,
        LottieModule,
        NgxMaskModule,
        MatTooltipModule,
        NumberFormatPipeModule,
        MatButtonModule,
        InputTextModule,
        ButtonModule,
        TooltipModule,
        TranslateAsyncPipe,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslocoModule,
        NotFoundComponent,
        SuccessComponent,
        ErrorComponent,
        ConfirmuserComponent,
        NavbarComponent,
        DialogNavbarComponent,
    ],
})
export class SharedModule {}
