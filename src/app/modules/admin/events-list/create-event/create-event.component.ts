import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { SpService } from 'app/core/services/sp.service';
import { EventBoxDTO, EventClient, FilesClient } from 'nswag-api/nswag-api-marathon';
import { CreateEventService } from '../createEvent.service';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { ImgCropperComponent } from 'app/shared/imgCropper/imgCropper.component';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { Editor, Toolbar } from 'ngx-editor';
import { environment } from 'app/core/env/environment.prod';
import { FileServiceService } from 'app/modules/services/fileUpload.service';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { SelectItem, SelectItemClient } from 'nswag-api/nswag-api-sps';
import { SpSelectItems } from '../../sps/SpSelectItems';
@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit, OnDestroy {
    today = new Date();
    minDate: Date;
    maxDate: Date;
    eventdate: Date;
    category = [];
    fileName: string;
    length: number;
    id: string;
    startRegstrDate: AbstractControl;
    endRegstrDate: AbstractControl;
    eventDate: AbstractControl;
    active = 0;
    activeTab = 'UZ';
    eventCategories = [];
    eventInfoByLanguage: FormGroup = this.fb.group({
        nameUZ: ['', Validators.required],
        nameRU: ['', Validators.required],
        nameEN: ['', Validators.required],
        descriptionUZ: ['', Validators.required],
        descriptionRU: ['', Validators.required],
        descriptionEN: ['', Validators.required],
        addressUZ: ['', Validators.required],
        addressRU: ['', Validators.required],
        addressEN: ['', Validators.required],
    });

    eventFullInfo: FormGroup = this.fb.group({
        startRegstrDate: ['', Validators.required],
        endRegstrDate: ['', Validators.required],
        eventDate: ['', Validators.required],
        location: ['', Validators.required],
        imageFileId: ['', Validators.required],
        athleteMaxLimit: [{ value: '', disabled: true }, Validators.required],
        offerFileId: ['', Validators.required],
        spRegionId:['', Validators.required]
    });
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['blockquote', 'link'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];
    regions: SelectItem[];

    constructor(
        public spService: SpService,
        private eventClient: EventClient,
        public createOrUpdateEvent: CreateEventService,
        private dialog: MatDialog,
        private fileService: FileServiceService,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: number,
        private fileClient: FilesClient,
        public getRegionService: SelectItemClient,
        private matdialogRef: MatDialogRef<CreateEventComponent>
    ) {}
    url = environment.URL;
    ngOnDestroy(): void {
        this.editorEN.destroy();
        this.editorUZ.destroy();
        this.editorRU.destroy();
    }
    editorEN: Editor;
    editorUZ: Editor;
    editorRU: Editor;

    html = '';

    ngOnInit(): void {
        this.spService
            .SpByTableNameSubscribable('EventCategory')
            .pipe(map((el) => el.slice(1)))
            .subscribe((res) => {
                this.category = res;
                if (this.data) {
                    this.udpateEvent(this.data);
                    return;
                }
            });
        this.editorUZ = new Editor();
        this.editorEN = new Editor();
        this.editorRU = new Editor();

        this.endRegstrDate = this.eventFullInfo.get('endRegstrDate');

        this.startRegstrDate = this.eventFullInfo.get('startRegstrDate');

        this.eventDate = this.eventFullInfo.get('eventDate');

        this.getRegionService.getSelectItems(SpSelectItems.SPRegions).subscribe((res) => {
            this.regions = res.slice(1);
        });

        this.calendarDateListen();
    }
    udpateEvent(data: number) {
        this.eventClient.eventBoxById(data).subscribe((res) => {
            this.eventFullInfo.patchValue(res.result);
            this.eventFullInfo.get('spRegionId').setValue(res.result.spRegionId+'')
            this.maxLimitStatusChange({ value: res.result.eventBoxCategories });
            this.eventInfoByLanguage.patchValue(res.result);
            let arr = [];
            res.result.eventBoxCategories.forEach((el) => arr.push('' + el));
            this.eventCategories = arr;
        });
    }

    calendarDateListen() {
        this.endRegstrDate.disable();

        this.eventDate.disable();

        this.startRegstrDate.valueChanges.subscribe((res) => {
            if (res !== '') {
                let date = new Date(res);

                date.setDate(date.getDate() + 2);

                this.minDate = date;

                this.endRegstrDate.enable();

                if (this.endRegstrDate.value !== '') {
                    let textOrEmpty = this.compareDate(
                        this.startRegstrDate.value,
                        this.endRegstrDate.value
                    );
                    this.endRegstrDate.setValue(textOrEmpty);
                }

                if (this.eventDate.value !== '') {
                    let textOrEmpty = this.compareDate(
                        this.startRegstrDate.value,
                        this.eventDate.value
                    );
                    this.eventDate.setValue(textOrEmpty);
                }
            }
        });

        this.endRegstrDate.valueChanges.subscribe((res) => {
            if (res !== '') {
                this.maxDate = new Date(res);
                this.eventdate = new Date(res);
                // this.eventdate.setDate(this.eventdate.getDate()+1);
                this.eventDate.enable();

                if (this.eventDate.value !== '') {
                    let stringOrEmpty = this.compareDate(
                        this.endRegstrDate.value,
                        this.eventDate.value,
                        true
                    );
                    this.eventDate.setValue(stringOrEmpty);
                }
            }
        });
    }

    compareDate(compareDate: string, date: string, status: boolean = false) {
        let comparedateToDate = new Date(compareDate);
        let dateToDate = new Date(date);
        if (status) {
            if (comparedateToDate <= dateToDate) {
                return date;
            }
            return '';
        } else {
            if (comparedateToDate < dateToDate) {
                return date;
            }
            return '';
        }
    }

    uploadImg(file: File[]) {
        const dialog = this.dialog.open(ImgCropperComponent, {
            data: {
                imageFile: file[0],
            width: 220,
                height: 215,
            },
        });
        dialog.afterClosed().subscribe((res) => {
            this.id = res.id;
            this.eventFullInfo.get('imageFileId').setValue(res.id);
            this.dialog.open(SuccessComponent);
        });
    }

    uploadFile(file: File[]) {
        this.fileService.uploadOffertaForFolder(file[0]).subscribe({
            next: (value) => {
                this.eventFullInfo.get('offerFileId').setValue(value);
                this.dialog.open(SuccessComponent);
            },
            error: (err) => {
                this.dialog.open(ErrorComponent);
            },
        });
    }
    maxLimitStatusChange(event) {
        let index = event.value.findIndex((el) => el == '4');
        if (index !== -1) {
            this.eventFullInfo.get('athleteMaxLimit').enable();
        } else {
            this.eventFullInfo.get('athleteMaxLimit').setValue(null);
            this.eventFullInfo.get('athleteMaxLimit').disable();
        }
    }
    senServer() {
        let eventBoxDTO = new EventBoxDTO();
        eventBoxDTO = Object.assign(
            this.eventFullInfo.value,
            this.eventInfoByLanguage.value
        );
        let arr = [];
        this.eventCategories.forEach((el) => arr.push(+el));
        eventBoxDTO.eventBoxCategories = arr;
        if (this.data) {
            eventBoxDTO.id = this.data;
            this.eventClient.updateEventBox(eventBoxDTO).subscribe((res) => {
                this.dialog.open(SuccessComponent);
                this.matdialogRef.close('ok');
            });
            return;
        }
        this.eventClient.saveEventBox(eventBoxDTO).subscribe((res) => {
            this.dialog.open(SuccessComponent);
            this.matdialogRef.close('ok');
        });
    }
    changeTab(tabName: string) {
        this.activeTab = tabName;
    }
    downloadOfferta() {
        this.fileClient.getFile(this.eventFullInfo.get('offerFileId').value).subscribe((res) => {
            const blob = new Blob([res.data], { type: '.docx' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'OFFERTA.docx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });

    }
    closePopUp()
    {
        this.dialog.closeAll();
    }
}
