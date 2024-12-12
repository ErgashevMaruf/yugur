import {
    Component,
    ViewEncapsulation,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
} from '@angular/core';
import { FuseLoadingService } from '@fuse/services/loading';
import { TranslocoService } from '@ngneat/transloco';
import { HelperService } from 'app/shared/helper.service';
import {
    AccountClient,
    NavigationClient,
    NavigationDTO,
    UpDownOrder,
} from 'nswag-api/nswag-api-auth';
import { SelectItem } from 'nswag-api/nswag-api-sps';

@Component({
    selector: 'app-navigation-form',
    templateUrl: './navigation-form.component.html',
    styleUrls: ['./navigation-form.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class NavigationFormComponent implements OnInit {
    @Output() onSave = new EventEmitter<void>();
    @ViewChild('heroForm') public heroForm;
    selItem: NavigationDTO = new NavigationDTO();
    displayDialog: boolean = false;
    titleDialog: string = '';
    selectedRoles: any;
    rolesList: SelectItem[] = [];
    rootSelItem: any;
    navigationList: any[];
    newRoleName: string;
    types: any[] = [
        { label: 'nav.basic', value: 'basic' },
        { label: 'nav.collapsable', value: 'collapsable' },
        { label: 'nav.group', value: 'group' },
    ];
    constructor(
        private _fuseProgressBarService: FuseLoadingService,
        private accountClient: AccountClient,
        private navigationClient: NavigationClient,
        private translocoService: TranslocoService,
        private helperService: HelperService
    ) {}

    ngOnInit() {
        this.getRoles();
        this.navigationClient.getNavigationsTreeSelect().subscribe((x) => {
            this.navigationList = x;
            this.navigationList.map((m) => {
                m.label = this.translocoService.translate(m.label);
                m.children.map((c) => {
                    c.label = this.translocoService.translate(c.label);
                });
            });
        });
    }
    getRoles() {
        this.accountClient.getRoles().subscribe((x) => {
            this.rolesList = x.filter((v) => v.value != '');
        });

    }
    showDialogToAddUpdate(id: number) {
        this.rootSelItem = null;
        if (id !== 0) {
            this._fuseProgressBarService.show();
            this.navigationClient.itemById(id).subscribe((item) => {
                this.selItem = item;
                if (this.selItem.rootId) {
                    this.rootSelItem = this.navigationList.filter(
                        (f) => f.key == this.selItem.rootId
                    )[0];
                }
                this.titleDialog = this.selItem.title;
                this._fuseProgressBarService.hide();
                this.displayDialog = true;
            });
        } else {
            this.titleDialog = this.translocoService.translate('dialog.add');
            this.selItem = new NavigationDTO();
            this.selItem.idDB = 0;
            this.selItem.id = '0';
            this.selItem.type = 'basic';
            this.displayDialog = true;
        }
    }
    save() {
        this.navigationClient.addUpdate(this.selItem).subscribe((x) => {
            this.helperService.showSuccessSave();
            this.onSave.emit();
            this.displayDialog = false;
        });
    }
    addNewRole() {
        this.accountClient.addNewRole(this.newRoleName).subscribe((x) => {
            this.helperService.showMessage(x.message);
            this.getRoles();
        });
    }
    rootChange() {
        this.selItem.rootId = this.rootSelItem.key;
    }
    upDownElement(upDownOrder: UpDownOrder) {
        this.navigationClient
            .upDownOrder(this.selItem, upDownOrder)
            .subscribe((x) => {
                if (x) {
                    this.helperService.showSuccessSave();
                    this.onSave.emit();
                    this.displayDialog = false;
                } else {
                    this.helperService.showMessage('Невозможно сохранить!');
                }
            });
    }
}
