import { Injectable } from '@angular/core';
import { environment } from 'app/core/env/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymeService {

constructor() { }
gotoPayme(orderId:number, allSum:number, curuserId = 0) {
    if (!orderId) return null;
    let amount = allSum * 100;
    if (curuserId == 0) return null;
    let urlbase64 =
        'm=' +
        environment.PAYME_MERCHANT_ID +
        ';ac.user_id=' +
        curuserId +
        ';ac.order_id=' +
        orderId +
        ';a=' +
        amount +
        `;cr=uzs;ct=10000;c=${environment.API_BASE_URL}/#/myEvents;l=uz`;

    //window.location.href = 'https://test.paycom.uz/' + btoa(urlbase64);
    window.location.href = 'https://checkout.paycom.uz/' + btoa(urlbase64);

    //https://checkout.paycom.uz/
}
}
