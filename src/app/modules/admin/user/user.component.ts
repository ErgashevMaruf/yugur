import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseLoadingService } from '@fuse/services/loading';
import { SpService } from 'app/core/services/sp.service';
import {
    AccountClient,
    SelectItem,
    TableMetaData,
    UserRegistrDTO,
} from 'nswag-api-auth';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import { roles } from 'app/core/user/Roles';
import { TranslocoService } from '@ngneat/transloco';
import { TableHelper } from 'app/shared/Utils/tableHelper';
import { Table } from 'primeng/table';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    // encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
    tableSearch: TableMetaData = {} as TableMetaData;
    first = 0;
    users: UserRegistrDTO[] = [];
    selectRole = '';
    totalItems: number;
    roles: SelectItem[];
    rolesTransloco = roles;
    loadingState = false;
    ahtletesId: number;
    userName: string;
    fullName: string;
    email: string;
    phone: string;

    @ViewChild('placeholderElement') placeholderElement: ElementRef;
    constructor(
        private _fuseProgressBarService: FuseLoadingService,
        private acountClient: AccountClient,
        public spService: SpService,
        private dialog: MatDialog,
        private translocoService: TranslocoService,
    ) {}

    ngOnInit() {
        this.acountClient.getRoles().subscribe((res) => {
            for (let x of res) {
                x.value = x.label;
                x.label = this.translocoService.translate(roles.get(x.label));
            }
            this.roles = res.slice(1);
        });
    }

    loadUser(event) {
        TableHelper.clearFilter(event)
        this._fuseProgressBarService.show();
        this.tableSearch = Object.assign(this.tableSearch, event);
        this.tableSearch.filters = JSON.stringify(this.tableSearch.filters);
        this.acountClient.getUserList(this.tableSearch).subscribe((res) => {
            res.items.map(
                (el) =>
                    (el.rolesStr = el.rolesStr
                        .split(', ')
                        .map(
                            (el) =>
                                (el = this.translocoService.translate(
                                    this.rolesTransloco.get(el)
                                ))
                        )
                        .join(','))
            );
            this._fuseProgressBarService.hide();
            this.users = res.items;
            this.totalItems = res.totalItems;
        });
    }
    editUser(id: string) {
        const dialog = this.dialog.open(RegisterUserComponent, {
            data: id,
        });
        dialog.afterClosed().subscribe((res) => {
            if (res == 'ok') {
                this.loadUser(
                    new TableMetaData({
                        first: 0,
                        rows: 20,
                        filters: '',
                        sortOrder: 0,
                    })
                );
            }
        });
    }
    clear(dt:Table)
    {
       this.ahtletesId = null;
       this.fullName = null;
       this.userName = null;
       this.email = null;
       this.phone = null;
       dt.clear()
    }
    createUserForm() {
        const dialog = this.dialog.open(RegisterUserComponent);
        dialog.afterClosed().subscribe((res) => {
            if (res == 'ok') {
                this.loadUser(
                    new TableMetaData({
                        first: 0,
                        rows: 20,
                        filters: '',
                        sortOrder: 0,
                    })
                );
            }
        });
    }
}
