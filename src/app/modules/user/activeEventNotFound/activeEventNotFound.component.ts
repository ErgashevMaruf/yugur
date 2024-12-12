import { Component, OnInit } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-activeEventNotFound',
  templateUrl: './activeEventNotFound.component.html',
  styleUrls: ['./activeEventNotFound.component.css'],
  standalone:true,
  imports:[TranslocoModule]
})
export class ActiveEventNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
