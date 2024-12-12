import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
    EventBoxDTO,
    EventClient,
    EventDTO,
    TableMetaData,
} from 'nswag-api-marathon';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
    constructor(private eventClient: EventClient) {}
    events: EventBoxDTO[]=[];
    isMyEvent = false;
    active = 0;
    tableSearch = new TableMetaData({
        first: 0,
        rows: 100,
        filters: '{}',
        sortOrder: 0,
    });
    ngOnInit() {
        this.change(0)
    }
    change(index:number)
    {
        if(index==0)
        {
            this.eventClient
            .allActiveEventEventBoxesList(this.tableSearch)
            .subscribe((res) => {
                this.events = res.result.items;
                this.isMyEvent = false;
                this.active = index
            });
        }
        else{
            this.eventClient.myEventBoxList().subscribe(res=>{
                this.events = res.result.items;
                this.isMyEvent = true;
                this.active = index
            })
        }
    }
}
