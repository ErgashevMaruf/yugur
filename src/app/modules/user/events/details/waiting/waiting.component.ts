import { Component, OnInit } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css'],
  standalone:true,
  imports:[TranslocoModule]
})
export class WaitingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
