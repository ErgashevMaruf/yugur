import { Component, Inject, OnInit } from '@angular/core';
import { SpService } from 'app/core/services/sp.service';
import {
    BibStatus,
    BibType,
    EventBibDTO,
    EventClient,
    EventDTO,
    EventPacketDTO,
    HttpStatusCode,
} from 'nswag-api/nswag-api-marathon';
import { CreateEventService } from '../createEvent.service';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { fuseAnimations } from '@fuse/animations';
import { SPClient } from 'nswag-api/nswag-api-sps';
@Component({
    selector: 'app-createEventEventBox',
    templateUrl: './createEventEventBox.component.html',
    styleUrls: ['./createEventEventBox.component.css'],
    animations: fuseAnimations,
})
export class CreateEventEventBoxComponent implements OnInit {
    today = new Date();

    minAdditionCost: Date;

    category = [];

    numbers: BehaviorSubject<{ numbers: EventBibDTO[]; type: string }> =
        new BehaviorSubject<{ numbers: EventBibDTO[]; type: string }>({
            numbers: [],
            type: 'all',
        });
    distance: string;
    goldNumber: EventBibDTO[] = [];
    silverNumber: EventBibDTO[] = [];
    platinumNumber: EventBibDTO[] = [];
    vipNumbers: EventBibDTO[] = [];
    show = '';
    lengthArr: number;
    id: string;
    additionalCost = '';
    isTitleRequired = false;
    isAgeRequired = false;
    eventFullInfo: FormGroup = this.fb.group({
        titleUZ: [''],
        titleRU: [''],
        titleEN: [''],
        raceDistanceUZ: ['', Validators.required],
        raceDistanceEN: ['', Validators.required],
        raceDistanceRU: ['', Validators.required],
        spRaceDistanceId: ['', Validators.required],
        ageFrom: [''],
        toAgeYears: [''],
        eventGenderAgeCategories: this.fb.array([]),
        smenas: this.fb.array([]),
        packets: this.fb.array([]),
        smenaParticipants: [{ value: '', disabled: true }, Validators.required],
    });
    eventCategories = [];
    eventCategoryNumbers: FormGroup = this.fb.group({
        bibFrom: [
            { value: '', disabled: true },
            [Validators.required, Validators.min(1)],
        ],
        bibUntil: [
            { value: '', disabled: true },
            [Validators.required, Validators.min(1)],
        ],
        goldNumbers: [[]],
        goldenNumberPrice: [],
        silverNumbers: [[]],
        silverNumberPrice: [],
        platinNumbers: [[]],
        platinumNumberPrice: [],
        vipNumbers: [[]],
    });

    notFree = false;
    mens = 0;
    womens = 0;
    time: any;
    isSmenaAdd = true;
    packetError = false;
    raceDistances: any[];
    eventBibs: EventBibDTO[];

    constructor(
        public spService: SpService,
        private eventClient: EventClient,
        public createOrUpdateEvent: CreateEventService,
        private dialog: MatDialog,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: number,
        private matdialogRef: MatDialogRef<CreateEventEventBoxComponent>,
        private _sp: SPClient
    ) {}

    setValueDistance(event) {
        const value = this.raceDistances.find((el) => el.id == event.value);
        this.eventFullInfo.get('raceDistanceUZ').setValue(value.nameUz);
        this.eventFullInfo.get('raceDistanceEN').setValue(value.nameKar);
        this.eventFullInfo.get('raceDistanceRU').setValue(value.nameRu);
    }
    ngOnInit(): void {
        this._sp.getAllRaceDistances(null).subscribe((res) => {
            this.raceDistances = res;
        });
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
        this.numbers.subscribe((res) => {
            let numberCategory = this.eventCategoryNumbers.value;
            res.numbers = res.numbers.sort((a, b) => a.bibCode - b.bibCode);
            if (res.type == 'all') {
                this.goldNumber = [
                    ...numberCategory['goldNumbers'],
                    ...res.numbers,
                ];
                this.silverNumber = [
                    ...numberCategory['silverNumbers'],
                    ...res.numbers,
                ];
                this.platinumNumber = [
                    ...numberCategory['platinNumbers'],
                    ...res.numbers,
                ];
                this.vipNumbers = [
                    ...numberCategory['vipNumbers'],
                    ...res.numbers,
                ];
            }
            if (res.type == 'goldNumbers') {
                this.silverNumber = [
                    ...numberCategory['silverNumbers'],
                    ...res.numbers,
                ];
                this.platinumNumber = [
                    ...numberCategory['platinNumbers'],
                    ...res.numbers,
                ];
                this.vipNumbers = [
                    ...numberCategory['vipNumbers'],
                    ...res.numbers,
                ];
            }
            if (res.type == 'silverNumbers') {
                this.goldNumber = [
                    ...numberCategory['goldNumbers'],
                    ...res.numbers,
                ];
                this.platinumNumber = [
                    ...numberCategory['platinNumbers'],
                    ...res.numbers,
                ];
                this.vipNumbers = [
                    ...numberCategory['vipNumbers'],
                    ...res.numbers,
                ];
            }
            if (res.type == 'platinNumbers') {
                this.goldNumber = [
                    ...numberCategory['goldNumbers'],
                    ...res.numbers,
                ];
                this.silverNumber = [
                    ...numberCategory['silverNumbers'],
                    ...res.numbers,
                ];
                this.vipNumbers = [
                    ...numberCategory['vipNumbers'],
                    ...res.numbers,
                ];
            }
            if (res.type == 'vipNumbers') {
                this.goldNumber = [
                    ...numberCategory['goldNumbers'],
                    ...res.numbers,
                ];
                this.silverNumber = [
                    ...numberCategory['silverNumbers'],
                    ...res.numbers,
                ];
                this.platinumNumber = [
                    ...numberCategory['platinNumbers'],
                    ...res.numbers,
                ];
            }
        });
        this.valueChangeNumberStatus();
        this.eventFullInfoListen();
        if (!this.data) {
            this.addSmena();
            this.addPacket();
        }
    }
    eventFullInfoListen() {
        let titleUZ = this.eventFullInfo.get('titleUZ');
        let titleRU = this.eventFullInfo.get('titleRU');
        let titleEN = this.eventFullInfo.get('titleEN');
        let ageFrom = this.eventFullInfo.get('ageFrom');
        let toAgeYears = this.eventFullInfo.get('toAgeYears');
        this.eventFullInfo.valueChanges.subscribe((res) => {
            if (
                (res.titleUZ || res.titleRU || res.titleEN) &&
                !titleUZ.hasValidator(Validators.required)
            ) {
                titleUZ.setValidators([Validators.required]);
                titleRU.setValidators([Validators.required]);
                titleEN.setValidators([Validators.required]);
                this.updateValidation(['title', 'titleRu', 'titleEn']);
            }
            if (
                !res.titleUZ &&
                !res.titleRU &&
                !res.titleEN &&
                titleUZ.hasValidator(Validators.required)
            ) {
                titleUZ.setValidators([]);
                titleRU.setValidators([]);
                titleEN.setValidators([]);
                this.updateValidation(['titleUZ', 'titleRU', 'titleEN']);
            }
            if (
                (res.ageFrom || res.toAgeYears) &&
                !ageFrom.hasValidator(Validators.required)
            ) {
                ageFrom.setValidators([Validators.required]);
                toAgeYears.setValidators([Validators.required]);
                this.updateValidation(['ageFrom', 'toAgeYears']);
            }
            if (
                !res.ageFrom &&
                !res.toAgeYears &&
                ageFrom.hasValidator(Validators.required)
            ) {
                ageFrom.setValidators([]);
                toAgeYears.setValidators([]);
                this.updateValidation(['ageFrom', 'toAgeYears']);
            }
        });
    }

    addSmena(): any {
        let smenaArr = this.eventFullInfo.get('smenas') as FormArray;
        let fb = this.fb.group({
            id: [null],
            eventId: [this.data],
            name: ['', Validators.required],
        });
        smenaArr.push(fb);
        this.isSmenaAdd = smenaArr.length !== 6;
        if (smenaArr.length > 1) {
            this.eventFullInfo.get('smenaParticipants').enable();
        }
    }

    removeSmena(index: number) {
        let smenaArr = this.eventFullInfo.get('smenas') as FormArray;
        smenaArr.removeAt(index);
        this.isSmenaAdd = smenaArr.length !== 6;
        if (smenaArr.length == 1) {
            this.eventFullInfo.get('smenaParticipants').setValue(null);
            this.eventFullInfo.get('smenaParticipants').disable();
        }
    }
    addPacket(el?: EventPacketDTO): any {
        this.packetError = false;
        let packetArr = this.eventFullInfo.get('packets') as FormArray;
        let disable = packetArr.length + 1 == 1;
        let bibLast = null;
        if (!disable && !el) {
            bibLast = +packetArr.value[packetArr.length - 1].bibUntil + 1;
            if (packetArr.invalid) {
                this.packetError = true;
                return;
            }
        }
        const fb = this.fb.group({
            id: [null],
            packetNameUZ: ['', Validators.required],
            packetNameEN: ['', Validators.required],
            packetNameRU: ['', Validators.required],
            packetAmount: [''],
            bibFrom: [
                { value: bibLast, disabled: !disable },
                Validators.required,
            ],
            bibUntil: ['', Validators.required],
        });
        packetArr.push(fb);
    }

    removePacket() {
        let smenaArr = this.eventFullInfo.get('packets') as FormArray;
        smenaArr.removeAt(smenaArr.length - 1);
    }

    updateValidation(titles: string[]) {
        for (let x of titles) {
            this.eventFullInfo.get(x).updateValueAndValidity();
        }
    }

    udpateEvent(id: number) {
        this.eventClient.eventByIdEdit(id).subscribe((res) => {
            this.eventBibs = res.result.eventBibs;
            res.result.eventGenderAgeCategories.forEach((el) => {
                this.addAgeCategory(null, el);
            });
            if (res.result.uzsPriceOne) {
                this.addAdditionalCost('first');
            }
            if (res.result.uzsPriceDateTwo) {
                this.addAdditionalCost('second');
            }
            res.result.smenas.forEach((el) => {
                this.addSmena();
            });
            let arr = [];
            res.result.eventCategories.forEach((el) => arr.push('' + el));
            this.eventCategories = arr;
            res.result.packets.forEach((el) => {
                this.addPacket(el);
            });
            this.eventFullInfo.patchValue(res.result);
            this.eventCategoryNumbers.patchValue(res.result);
            this.eventCategoryNumbers.get('bibFrom').disable();
            this.eventCategoryNumbers.get('bibUntil').disable();
            this.setStatusNumber(res.result);
            this.createArr();
        });
    }

    setStatusNumber(res: EventDTO) {
        this.lengthArr = res.bibUntil + 1 - res.bibFrom;
        let all = res.eventBibs.filter(
            (el) => el.bibType == BibType.NormalNumber
        );
        this.numbers.next({ numbers: all, type: '' });
        let vipNumbers = res.eventBibs
            .filter((el) => el.bibType == BibType.VipNumber)
            .sort((a, b) => a.bibCode - b.bibCode);
        this.vipNumbers = [...vipNumbers, ...all];
        this.eventCategoryNumbers.get('vipNumbers').setValue(vipNumbers);
        if (res.goldenNumberPrice) {
            let onlyGold = res.eventBibs
                .filter((el) => el.bibType == BibType.GoldenNumber)
                .sort((a, b) => a.bibCode - b.bibCode);
            this.goldNumber = [...onlyGold, ...all];
            this.eventCategoryNumbers.get('goldNumbers').setValue(onlyGold);
        }
        if (!res.goldenNumberPrice && res.isPrice) {
            this.goldNumber = res.eventBibs;
        }
        if (res.silverNumberPrice) {
            let onlySilverNumber = res.eventBibs
                .filter((el) => el.bibType == BibType.SilverNumber)
                .sort((a, b) => a.bibCode - b.bibCode);
            this.silverNumber = [...onlySilverNumber, ...all];
            this.eventCategoryNumbers
                .get('silverNumbers')
                .setValue(onlySilverNumber);
        }
        if (!res.silverNumberPrice && res.isPrice) {
            this.silverNumber = res.eventBibs;
        }
        if (res.platinumNumberPrice) {
            let platinumOnly = res.eventBibs
                .filter((el) => el.bibType == BibType.PlatinumNumber)
                .sort((a, b) => a.bibCode - b.bibCode);
            this.platinumNumber = [...platinumOnly, ...all];
            this.eventCategoryNumbers
                .get('platinNumbers')
                .setValue(platinumOnly);
        }
        if (!res.platinumNumberPrice && res.isPrice) {
            this.platinumNumber = res.eventBibs;
        }
    }

    valueChangeNumberStatus() {
        this.eventCategoryNumbers
            .get('goldNumbers')
            .valueChanges.subscribe((res) => {
                this.setValidatorsOrDelete(res, 'goldenNumberPrice');
            });
        this.eventCategoryNumbers
            .get('silverNumbers')
            .valueChanges.subscribe((res) => {
                this.setValidatorsOrDelete(res, 'silverNumberPrice');
            });
        this.eventCategoryNumbers
            .get('platinNumbers')
            .valueChanges.subscribe((res) => {
                this.setValidatorsOrDelete(res, 'platinumNumberPrice');
            });
    }

    setValidatorsOrDelete(numberArr: number[], type: string) {
        if (numberArr.length == 0) {
            this.eventCategoryNumbers.get(type).setValidators([]);
        } else {
            this.eventCategoryNumbers
                .get(type)
                .setValidators([Validators.required]);
        }
        this.eventCategoryNumbers.get(type).updateValueAndValidity();
    }

    sendInfo() {
        let numbersForm = this.eventCategoryNumbers.value;
        let eventDTO = new EventDTO();
        eventDTO = Object.assign(this.eventFullInfo.value);
        eventDTO.raceDistanceUZ = '' + eventDTO.raceDistanceUZ;
        eventDTO.isPrice = this.notFree;
        eventDTO.eventBoxId = this.createOrUpdateEvent.eventBoxId;
        eventDTO.smenaParticipants =
            eventDTO.smenaParticipants ??
            this.eventCategoryNumbers.getRawValue().bibUntil -
                this.eventCategoryNumbers.getRawValue().bibFrom +
                1;
        if (!this.notFree) {
            delete eventDTO.uzsPrice;
        }
        eventDTO.eventBibs = [
            ...this.numbers.value.numbers,
            ...numbersForm['goldNumbers'],
            ...numbersForm['silverNumbers'],
            ...numbersForm['platinNumbers'],
            ...numbersForm['vipNumbers'],
        ];
        eventDTO.bibFrom = numbersForm['bibFrom'];
        eventDTO.bibUntil = numbersForm['bibUntil'];
        eventDTO.goldenNumberPrice = numbersForm['goldenNumberPrice']
            ? numbersForm['goldenNumberPrice']
            : undefined;
        eventDTO.platinumNumberPrice = numbersForm['platinumNumberPrice']
            ? numbersForm['platinumNumberPrice']
            : undefined;
        eventDTO.silverNumberPrice = numbersForm['silverNumberPrice']
            ? numbersForm['silverNumberPrice']
            : undefined;
        eventDTO.eventCategories = this.eventCategories;
        eventDTO.eventGenderAgeCategories.forEach((el) => {
            if (!el.id) {
                delete el.id;
            }
        });
        for (let x in this.eventBibs) {
            if (eventDTO.eventBibs[x].bibCode == this.eventBibs[x].bibCode) {
                eventDTO.eventBibs[x].id = this.eventBibs[x].id;
            }
        }
        eventDTO.packets = this.eventFullInfo.get('packets').getRawValue();
        for (let x of eventDTO.packets) {
            for (let [key, value] of Object.entries(x)) {
                if (!value) {
                    delete x[key];
                }
            }
        }

        if (!this.data) {
            this.eventClient
                .addEvent(eventDTO)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        let data = '';
                        if (error.status == HttpStatusCode.BadRequest) {
                            data = 'notFormatDate';
                        } else if (error.status == HttpStatusCode.Forbidden) {
                            data = 'imgGuidErr';
                        } else if (
                            error.status == HttpStatusCode.NotAcceptable
                        ) {
                            data = 'bibError';
                        } else {
                            data = 'countBibErr';
                        }
                        this.dialog.open(ErrorComponent, {
                            data: data,
                        });
                        return throwError(() => error);
                    })
                )
                .subscribe((res) => {
                    if (res.statusCode == HttpStatusCode.OK) {
                        this.dialog.open(SuccessComponent);
                        this.matdialogRef.close('ok');
                    }
                });
            return;
        }
        eventDTO.id = this.data;
        this.eventClient
            .updateEvent(eventDTO)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let data = '';
                    if (error.status == HttpStatusCode.BadRequest) {
                        data = 'notFormatDate';
                    } else {
                        data = 'notFound';
                    }
                    this.dialog.open(ErrorComponent, {
                        data: data,
                    });
                    return throwError(() => error);
                })
            )
            .subscribe((res) => {
                if ((res.statusCode = HttpStatusCode.OK)) {
                    this.dialog.open(SuccessComponent);
                    this.matdialogRef.close('ok');
                }
            });
    }

    changeStatusNumber(
        event: { state: boolean; element: number },
        type: string
    ) {
        if (event.state) {
            let index = this.numbers.value.numbers.findIndex(
                (el) => el.bibCode == event.element
            );
            this.numbers.value.numbers.splice(index, 1);
            this.numbers.next({
                numbers: this.numbers.value.numbers,
                type: type,
            });
            return;
        }
        this.numbers.value.numbers.push(
            new EventBibDTO({
                id: 0,
                bibCode: event.element,
                bibType: BibType.NormalNumber,
                status: BibStatus.Active,
            })
        );
        this.numbers.next({
            numbers: this.numbers.value.numbers,
            type: type,
        });
    }

    createArr() {
        const arr = this.eventFullInfo.get('packets').value;
        const startNumber = arr[0].bibFrom;
        const endNumber = arr[arr.length - 1].bibUntil;
        this.eventCategoryNumbers.get('bibFrom').setValue(startNumber);
        this.eventCategoryNumbers.get('bibUntil').setValue(endNumber);
        if (startNumber && endNumber) {
            let arr = Array.from(
                { length: endNumber - startNumber + 1 },
                (value, index) =>
                    new EventBibDTO({
                        id: 0,
                        bibCode: startNumber + index,
                        status: BibStatus.Active,
                        bibType: BibType.NormalNumber,
                    })
            );
            arr = this.filterArray(arr);
            this.numbers.next({
                numbers: arr,
                type: 'all',
            });
            this.lengthArr = arr.length;
        }
    }

    changeRangeCheck(type: string) {
        let categoryNumbers = this.eventCategoryNumbers.value;
        if (categoryNumbers[type].length !== 0) {
            let filteredArray = categoryNumbers[type].filter(
                (el: EventBibDTO) =>
                    el.bibCode >= categoryNumbers['bibFrom'] &&
                    el.bibCode <= categoryNumbers['bibUntil']
            );
            this.eventCategoryNumbers.get(type).setValue(filteredArray);
            return filteredArray;
        }
        return [];
    }

    filterArray(arr: EventBibDTO[]) {
        let platinumbNumbers = this.changeRangeCheck('platinNumbers');
        let goldNumbers = this.changeRangeCheck('goldNumbers');
        let silverNumbers = this.changeRangeCheck('silverNumbers');
        let filteredArray = arr.filter(
            (obj1) =>
                !platinumbNumbers.some(
                    (obj2) => obj2.bibCode == obj1.bibCode
                ) &&
                !goldNumbers.some((obj3) => obj3.bibCode == obj1.bibCode) &&
                !silverNumbers.some((obj4) => obj4.bibCode == obj1.bibCode)
        );
        return filteredArray;
    }

    addAdditionalCost(type: string) {
        this.eventFullInfo.get('uzsPrice').setValidators(Validators.required);
        if (type == 'first') {
            this.eventFullInfo.addControl(
                'uzsPriceOne',
                new FormControl('', Validators.required)
            );
            this.eventFullInfo.addControl(
                'uzsPriceDateOne',
                new FormControl('', Validators.required)
            );
            this.additionalCost = type;
            this.eventFullInfo
                .get('uzsPriceDateOne')
                .valueChanges.subscribe((res) => {
                    let date = new Date(res);
                    date.setDate(date.getDate() + 1);
                    this.minAdditionCost = date;
                    if (this.eventFullInfo.get('uzsPriceDateTwo')) {
                        let dateTwo =
                            this.eventFullInfo.get('uzsPriceDateTwo').value;
                        dateTwo = new Date(dateTwo).getTime();
                    }
                });
        } else {
            this.eventFullInfo.addControl(
                'uzsPriceTwo',
                new FormControl('', Validators.required)
            );
            this.eventFullInfo.addControl(
                'uzsPriceDateTwo',
                new FormControl('', Validators.required)
            );
            this.additionalCost = type;
        }
    }

    removeAddtionalCost(type: string) {
        if (type == 'first') {
            this.eventFullInfo.get('uzsPrice').setValidators([]);
            this.additionalCost = '';
            this.eventFullInfo.removeControl('uzsPriceOne');
            this.eventFullInfo.removeControl('uzsPriceDateOne');
        } else {
            this.additionalCost = 'first';
            this.eventFullInfo.removeControl('uzsPriceTwo');
            this.eventFullInfo.removeControl('uzsPriceDateTwo');
        }
    }

    addAgeCategory(type: number = null, ageCategory = null) {
        if (type == 1) {
            this.mens++;
        } else {
            this.womens++;
        }
        let ageCategoryArr = this.eventFullInfo.get(
            'eventGenderAgeCategories'
        ) as FormArray;
        let fb = this.fb.group({
            id: [undefined],
            spGenderId: [type],
            fromAge: [null, Validators.required],
            endAge: [null, Validators.required],
        });
        if (ageCategory) {
            fb.patchValue(ageCategory);
        }
        ageCategoryArr.push(fb);
    }

    removeAgeCategory(i: number, type: number) {
        let ageCategoryArr = this.eventFullInfo.get(
            'eventGenderAgeCategories'
        ) as FormArray;
        ageCategoryArr.removeAt(i);
        if (type == 1) {
            this.mens--;
        } else {
            this.womens--;
        }
    }
}
