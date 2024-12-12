import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import {
    EventClient,
    EventDTO,
    RegistationEventClient,
    RegistationEventDTO,
    SelectRegistationEventDTO,
    TableMetaData,
} from 'nswag-api-marathon';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-controlbyevent',
    templateUrl: './controlbyevent.component.html',
    styleUrls: ['./controlbyevent.component.css'],
})
export class ControlbyeventComponent implements OnInit {
    events: EventDTO[];
    tableFilter: TableMetaData = {} as TableMetaData;
    id: number;
    totalItems: number;
    athletes: RegistationEventDTO[];
    fullName = '';
    phoneMain = ''
    isPrice = false;
    constructor(
        private eventClient: EventClient,
        private registrationClient: RegistationEventClient,
        private router: ActivatedRoute,
        private dialog:MatDialog
    ) {}

    ngOnInit() {
        let id = this.router.snapshot.paramMap.get('id');
        this.eventClient.activeEventByboxIdList(+id).subscribe((res) => {
            this.events = res.result.items;
            this.id = this.events[0].id;
            this.loadUser(
                new TableMetaData({
                    first: 0,
                    rows: 10,
                    filters: '',
                    sortOrder: 0,
                })
            );
        });
    }
    clear(table: Table) {
        this.fullName = '';
        this.phoneMain = ''
        table.clear();
    }
    loadUser(event) {
        for (const [key, value] of Object.entries(event.filters)) {
            if(event.filters[key]?.value==null){
                delete event.filters[key];
            }
          }
        if (this.id) {
            this.tableFilter = Object.assign(this.tableFilter,event);
            this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
            this.registrationClient
                .getAthletesByEventIdForOrganizator(this.id, this.tableFilter)
                .subscribe((res) => {
                    this.athletes = res.result.items;
                    this.totalItems = res.result.totalItems;
                });
            }
    }
    changeEvent(event: EventDTO) {
        this.id = event.id;
        this.isPrice = event.isPrice;
        this.loadUser(
            new TableMetaData({
                first: 0,
                rows: 10,
                filters: '',
                sortOrder: 0,
            })
        );

    }
    deleteFromEvent(user:RegistationEventDTO, index:number)
    {
        this.registrationClient.deleteRegisteredEventAthleteForOrganizator(new SelectRegistationEventDTO({
            athletesId: user.athletesId,
            eventId:user.eventId
        })).subscribe(res=>{
            this.dialog.open(SuccessComponent, {
                data:'userDeleteFromEvent'
            })
            this.athletes.splice(index,1);
        })
    }
    exportToExcell()
    {
        this.registrationClient.exportRegisteredEventByEventIdForOrganizator(this.id).subscribe(res=>{
            let a = document.createElement('a');
                    a.download = 'file.xlsx';
                    var blob = new Blob([res.data], {
                        type: 'application/octet-stream',
                    });
                    a.href = window.URL.createObjectURL(blob);
                    a.click();
        })
    }
}
