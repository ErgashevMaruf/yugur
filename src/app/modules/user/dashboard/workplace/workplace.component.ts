import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { AthletesClient } from 'nswag-api/nswag-api-marathon';

@Component({
  selector: 'app-workplace',
  template: `
    <div class="p-9 flex flex-col gap-4 bg-white dark:bg-[#25262c]">
    <div class="w-full flex justify-between">
        <h2 class="text-[18px] font-semibold">{{ "EnterWorkPlace" | transloco }}</h2>
    </div>
    <hr class="w-full h-[1px] bg-[#EDEDF1] dark:bg-[#383942] m-0" />
    <div>
        <label class="text-[#8E92A2] mb-1 inline-block" for="">{{
            "workPlace" | transloco
        }}</label>
        <input
            class="w-full h-[40px] p-2 resize-none bg-[#F7F8F8] dark:bg-[#383942] rounded-[10px]"
            name=""
            id=""
            [placeholder]="'enterYourWorkplace' | transloco"
            [(ngModel)]="workPlace"
        >
    </div>
    <div class="w-full flex justify-end">
        <button
            class="text-white disabled:bg-[#aeaeae] bg-[#67BD50] font-bold px-4 py-3 rounded-[10px]"
            [disabled]="!workPlace"
            (click)="sendWorkplace()"
            >
            {{ "send.to" | transloco }}
        </button>
    </div>
</div>
  `,
  standalone: true,
  imports:[TranslocoModule, FormsModule]
})
export class WorkplaceComponent implements OnInit {

  workPlace:string;

  constructor(private athletes:AthletesClient, private dialog:MatDialog) { }

  ngOnInit() {
  }
  sendWorkplace()
  {
      this.athletes.updateAthleteWorkPlace(this.workPlace).subscribe(res=>{
        this.dialog.closeAll();
    })
  }

}
