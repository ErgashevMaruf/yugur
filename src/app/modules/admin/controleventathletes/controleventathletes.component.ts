import { Component, OnInit } from '@angular/core';
import { TableMetaData } from 'nswag-api/nswag-api-auth';
import { EventBoxDTO, EventClient } from 'nswag-api/nswag-api-marathon';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-controleventathletes',
  templateUrl: './controleventathletes.component.html',
  styleUrls: ['./controleventathletes.component.css']
})
export class ControleventathletesComponent implements OnInit {
  events:EventBoxDTO[]=[];

  constructor(private eventClient:EventClient) { }

  ngOnInit() {
    this.eventClient.allActiveEventBoxesList().subscribe(res=>{
        this.events = res.result.items;
    })
  }


}
