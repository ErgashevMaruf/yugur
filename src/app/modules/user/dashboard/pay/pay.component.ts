import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AthletesPaymentDTO, PaymentClient } from 'nswag-api-marathon';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
    sum:number;
    tableData:any
    payments: AthletesPaymentDTO[];
    existPayment  = false
  constructor(private paymentService:PaymentClient) { }

  ngOnInit() {
    this.paymentService.paymentHistory().subscribe(res=>{
       this.payments = res;
       this.existPayment = this.payments.length==0? false:true
       this.calculateSum()
    })
  }
  calculateSum()
  {

    let total = 0;
    for(let x of this.payments)
    {
        total+=x.fullAmount;
    }
    this.sum = total;
  }

}

