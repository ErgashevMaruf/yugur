import { Component, OnInit } from '@angular/core';
import { TableMetaData } from 'nswag-api/nswag-api-auth';
import { CartInformationDTO, RegistationEventClient } from 'nswag-api/nswag-api-marathon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    tableFilter: TableMetaData = {} as TableMetaData;
    users:CartInformationDTO[];
    totalItems: number;
    allSums=0;
  constructor(private eventAthletes:RegistationEventClient) { }

  ngOnInit() {

  }
  loadUsers(event)
  {
    this.tableFilter = Object.assign(this.tableFilter, event);
    this.tableFilter.rows = 100;
    this.tableFilter.filters = JSON.stringify(this.tableFilter.filters);
    this.eventAthletes.getAllCartInformations(this.tableFilter).subscribe(res=>{
        this.users = res.result.items;
        this.totalItems = res.result.totalItems;
        for(let x of this.users)
        {
                this.allSums+= x.bibCodeCost+x.eventCost
        }
    })

  }
  deleteItem(user:CartInformationDTO)
  {
    let index = this.users.findIndex(el=>el.athletesId==user.athletesId);
    this.users.splice(index,1);
  }

}
