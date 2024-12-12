import { HttpErrorResponse } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    Input,
    OnInit,
} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'app/core/env/environment';
import { Roles } from 'app/core/user/Roles';
import { UserService } from 'app/core/user/user.service';
import { PaymeService } from 'app/modules/services/payme.service';
import {
    BibCodeInfoModel,
    RegistationEventClient,
    FilesClient,
    HttpStatusCode,
    JoinRegistationEventDTO,
    SelectBibType,
    SuperAdminClient,
    EventBibDTO,
} from 'nswag-api-marathon';
import { SPClient } from 'nswag-api-sps';
import {
    catchError,
    combineLatest,
    debounceTime,
    fromEvent,
    map,
    throwError,
} from 'rxjs';
@Component({
    selector: 'app-selectNumber',
    templateUrl: './selectNumber.component.html',
    styleUrls: ['./selectNumber.component.scss'],
})
export class SelectNumberComponent implements OnInit {
    vipNumber: number;
    automaticOrder = true;
    show = false;
    bibCodeModel: BibCodeInfoModel;
    error = '';
    categoryPrice: any;
    allSum: any;
    joinAthletesDTO = new JoinRegistationEventDTO();
    @Input() athletesId: number;
    @Input() isAdmin = false;
    outsideSystem = false;
    offerta = false;
    smenaError = false;
    smenas: any;
    selectSmena: any;
    packets: any;
    selectPacket: any;
    vipBibs: EventBibDTO[];
    offertaFileId: string;
    constructor(
        private joinAthletesClient: RegistationEventClient,
        private matDialog: MatDialog,
        private userService: UserService,
        private injector: Injector,
        private fileClient: FilesClient,
        private matdialogRef: MatDialogRef<SelectNumberComponent>,
        private paymeService: PaymeService,
        private registrationEvent: RegistationEventClient,
        private _superAdmin: SuperAdminClient
    ) {}
    bibcodes: number[] = [];
    selectBibcode: number;
    data: any;
    @Input() inputEvent: any;
    disableConfirm = false;
    isERPSport = false;
    isVipNumber = false;
    comment: string;
    typeBibcode = [
        'normal_number',
        'silverNumber',
        'goldenNumber',
        'platinumNumber',
    ];
    ngOnInit() {
        if (!this.inputEvent) {
            const data = this.injector.get(MAT_DIALOG_DATA, null);
            this.data = {
                event: data.event,
            };
            this.offertaFileId = data.offertaFileId;
        } else {
            this.data = this.inputEvent;
        }
        const searchBox = document.getElementById('search');
        if (searchBox) {
            const keyup$ = fromEvent(searchBox, 'input');
            keyup$
                .pipe(
                    map((i: any) => i.currentTarget.value),
                    debounceTime(1000)
                )
                .subscribe((res) => {
                    if (!this.automaticOrder) this.getBibCode(res);
                });
        }
        const min = this.data.event.packets.sort(
            (a, b) => a.packetAmount - b.packetAmount
        );
        this.selectPacket = min[0];
        this.packets = this.data.event.packets;
        this.allSum = this.selectPacket.packetAmount;
        combineLatest([
            this.registrationEvent.getSmenas(this.data.event.id),
            this.userService.user$,
        ]).subscribe((res) => {
            this.isAdmin = res[1].mainRole == Roles.Admin;
            if (this.isAdmin) {
                this._superAdmin
                    .getAllVipNumbers(this.data.event.id)
                    .subscribe((res) => {
                        this.vipBibs = res.result;
                    });
            }
            if (this.athletesId) {
                this.smenas = res[0].result.items;
                this.selectSmena = this.smenas[0].id;
            } else {
                if (res[1].erPsportDTO) {
                    this.joinAthletesClient
                        .isPinflExistsInERPSport(res[1].pinfl)
                        .subscribe((isERPsport) => {
                            this.isERPSport = isERPsport.result;
                            this.smenas = res[0].result.items;
                            this.selectSmena = this.smenas[0].id;
                        });
                } else {
                    this.smenas = res[0].result.items;
                    this.selectSmena = this.smenas[0].id;
                }
            }
        });
    }

    changeCategory() {
        this.automaticOrder = !this.automaticOrder;
        if (this.automaticOrder && this.data.event.isPrice) {
            this.allSum = this.selectPacket.packetAmount;
            this.bibcodes = [];
            this.selectBibcode = null;
        }
        this.disableConfirm = this.automaticOrder
            ? false
            : this.bibcodes.length == 0;
    }

    downloadOfferta() {
        this.fileClient.getFile(this.offertaFileId).subscribe((res) => {
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
    getBibCode(value: string | number, isVipNumber = false) {
        this.isVipNumber = isVipNumber;
        this.error = '';
        if (typeof value == 'string') {
            value = value.replaceAll(' ', '');
        }
        if (value == '') {
            this.allSum = this.data.event.uzsPriceCalculated;
            this.bibcodes = [];
            return;
        }
        this.joinAthletesDTO = new JoinRegistationEventDTO({
            eventId: this.data.event.id,
            bibCode: +value,
            selectBibType: 2,
            smenaId: this.selectSmena,
            isERPSport: this.isERPSport,
            isVipNumber: this.isVipNumber,
            eventPacketId: this.selectPacket.id,
        });
        let bibCodeReservation = this.joinAthletesClient.bibCodeReservation(
            this.joinAthletesDTO
        );
        if (this.athletesId) {
            this.joinAthletesDTO.athletesId = this.athletesId;
            if (this.isAdmin) {
                bibCodeReservation = this._superAdmin.bibCodeReservation(
                    this.joinAthletesDTO
                );
            } else {
                bibCodeReservation =
                    this.joinAthletesClient.bibCodeReservationForOrganizator(
                        this.joinAthletesDTO
                    );
            }
        }
        bibCodeReservation
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status == HttpStatusCode.NotFound) {
                        this.error = 'bibCodeNotFound';
                    } else if (error.status == HttpStatusCode.BadRequest) {
                        this.error = 'bibCodeNormalFinish';
                    } else if (error.status == HttpStatusCode.NotAcceptable) {
                        this.error = 'bibCodeIsNull';
                    } else if (error.status == HttpStatusCode.Conflict) {
                        this.error = 'bibCodeAlreadySelect';
                    } else if (error.status == HttpStatusCode.Forbidden) {
                        this.error = 'notSelect';
                    }
                    return throwError(() => error);
                })
            )
            .subscribe((res) => {
                this.allSum = this.data.event.uzsPriceCalculated;
                if (res.error == null) {
                    this.disableConfirm = false;
                    this.bibCodeModel = res.result;
                    this.bibcodes = res.result.activeBibCodes;
                    if (res.result.bibType !== 1) {
                        this.categoryPrice =
                            this.bibCodeModel[
                                this.typeBibcode[
                                    this.bibCodeModel.bibType - 1
                                ] + 'Price'
                            ];
                        this.allSum = this.categoryPrice + this.allSum;
                    }
                } else if (res.error == 'not select') {
                    this.error = res.error;
                    this.bibcodes = [];
                } else {
                    this.disableConfirm = true;
                    this.bibcodes = [];
                }
            });
    }

    changeNumber(x: number) {
        this.selectBibcode = x;
        this.getBibCode(x + '');
    }

    joinEvent(type: string = null) {
        if (this.automaticOrder && !this.vipNumber) {
            this.joinAthletesDTO = new JoinRegistationEventDTO({
                eventId: this.data.event.id,
                selectBibType: SelectBibType.SelectAutomaticOrder,
                smenaId: this.selectSmena,
                isERPSport: this.isERPSport,
                isVipNumber: this.isVipNumber,
                eventPacketId: this.selectPacket.id,
            });

            let bibCodeReservation = this.joinAthletesClient.bibCodeReservation(
                this.joinAthletesDTO
            );
            if (this.athletesId) {
                this.joinAthletesDTO.athletesId = this.athletesId;
                if (this.isAdmin) {
                    bibCodeReservation = this._superAdmin.bibCodeReservation(
                        this.joinAthletesDTO
                    );
                } else {
                    bibCodeReservation =
                        this.joinAthletesClient.bibCodeReservationForOrganizator(
                            this.joinAthletesDTO
                        );
                }
            }
            bibCodeReservation.subscribe((res) => {
                this.selectBibcode = res.result.bibCode;
                this.joinCategoryEvent(type, res.result.orderId);
            });
        } else {
            this.joinCategoryEvent(type, this.bibCodeModel.orderId);
        }
    }

    joinCategoryEvent(type: string, orderId: number = null) {
        if (this.selectPacket.packetAmount && !this.isAdmin) {
            if (type == 'payme') {
                let curuserId = this.userService.userInfo.athletesId;
                this.paymeService.gotoPayme(
                    orderId,
                    this.selectPacket.packetAmount,
                    curuserId
                );
            }
        } else {
            this.joinAthletesDTO = new JoinRegistationEventDTO({
                bibCode: this.selectBibcode,
                eventId: this.data.event.id,
                selectBibType: this.automaticOrder
                    ? SelectBibType.SelectAutomaticOrder
                    : SelectBibType.SelectNumber,
                smenaId: this.selectSmena,
                isERPSport: this.isERPSport,
                isVipNumber: this.isVipNumber,
                eventPacketId: this.selectPacket.id,
            });
            if (this.athletesId) {
                this.joinAthletesDTO.athletesId = this.athletesId;
                if (this.isAdmin) {
                    this._superAdmin
                        .joinEventAthletes(this.joinAthletesDTO)
                        .subscribe((res) => {
                            this.matdialogRef.close('success');
                        });
                } else {
                    this.joinAthletesClient
                        .joinEventAthletesForOrganizator(this.joinAthletesDTO)
                        .subscribe((res) => {
                            this.matdialogRef.close('success');
                        });
                }
                return;
            }
            this.joinAthletesClient
                .joinEventAthletes(this.joinAthletesDTO)
                .subscribe((res) => {
                    this.matdialogRef.close('success');
                });
        }
    }
    addTouser() {
        this.joinAthletesDTO = new JoinRegistationEventDTO({
            eventId: this.data.event.id,
            selectBibType: SelectBibType.SelectAutomaticOrder,
            athletesId: this.athletesId,
            smenaId: this.selectSmena,
            isERPSport: this.isERPSport,
            isVipNumber: this.isVipNumber,
            eventPacketId: this.selectPacket.id,
        });
        if (this.automaticOrder) {
            this.joinAthletesClient
                .bibCodeReservationForOrganizator(this.joinAthletesDTO)
                .subscribe((res) => {
                    this.joinAthletesDTO.bibCode = res.result.bibCode;
                    let addToUserOrRequest;
                    if (this.outsideSystem) {
                        if (this.comment) {
                            this.joinAthletesDTO.comment = this.comment;
                        }
                        addToUserOrRequest =
                            this.joinAthletesClient.saveEventAthletesForOrganizator(
                                this.joinAthletesDTO
                            );
                    } else {
                        addToUserOrRequest =
                            this.joinAthletesClient.addInformationToCart(
                                this.joinAthletesDTO
                            );
                    }

                    addToUserOrRequest.subscribe((res) => {
                        this.matdialogRef.close('success');
                    });
                });
        } else {
            this.joinAthletesDTO.bibCode = this.selectBibcode;
            this.joinAthletesDTO.selectBibType = SelectBibType.SelectNumber;
            let addToUserOrRequest;
            if (this.outsideSystem) {
                if (this.comment) {
                    this.joinAthletesDTO.comment = this.comment;
                }
                addToUserOrRequest =
                    this.joinAthletesClient.saveEventAthletesForOrganizator(
                        this.joinAthletesDTO
                    );
            } else {
                addToUserOrRequest =
                    this.joinAthletesClient.addInformationToCart(
                        this.joinAthletesDTO
                    );
            }

            addToUserOrRequest.subscribe((res) => {
                this.matdialogRef.close('success');
            });
        }
    }
    cancelNumeration() {
        this.joinAthletesClient
            .updateOnAthleteActiveBibNumber(this.data.event.id)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.matDialog.closeAll();
                    return throwError(() => {});
                })
            )
            .subscribe((res) => {
                this.matDialog.closeAll();
            });
    }
}
