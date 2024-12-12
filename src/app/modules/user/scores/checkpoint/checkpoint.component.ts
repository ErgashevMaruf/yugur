import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckPointDTO } from 'nswag-api-marathon';

@Component({
  selector: 'app-checkpoint',
  templateUrl: './checkpoint.component.html',
  styleUrls: ['./checkpoint.component.css']
})
export class CheckpointComponent implements OnInit {
     checkPointStatus = new Map<number, string>([
        [0, "Started"],
        [1, "CheckPoint"],
        [2, "Finish"]
    ]);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {checkpoints: CheckPointDTO[]}) { }

  ngOnInit() {
  }

}
