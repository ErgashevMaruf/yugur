import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'app/core/env/environment';
import { OneIdClient } from 'nswag-api-auth';

@Component({
  selector: 'app-oneid',
  templateUrl: './oneid.component.html',

})
export class OneidComponent implements OnInit {
  @ViewChild('comingSoonNgForm') comingSoonNgForm: NgForm;

  isLoad: boolean = false;
  //fullName: string = ' Null';
  sess_id: string;
  errorPINFL: string;
  alert: { type: FuseAlertType; message: string } = {
      type: 'success',
      message: '',
  };

  showAlert: boolean = false;
  constructor(
      private _authService: AuthService,
      private _activatedRoute: ActivatedRoute,
      private _oneIdClient: OneIdClient,
      private route: ActivatedRoute,
      private _router: Router
  ) {
      this.readQueryParam();
  }

  ngOnInit() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('login');
  }
  readQueryParam() {
      this.route.queryParams.subscribe((params) => {
        //   this.fullName = params['fullname'];
          this.sess_id = params['sess_id'];
          this.checkUser();
      });
  }
  checkUser() {
      this._oneIdClient.checkUser(this.sess_id).subscribe((isChecked) => {
          this.isLoad = isChecked;
          if (isChecked) {
              // value 1
              this._authService.singInThroughSessId(this.sess_id).subscribe(
                  () => {
                      if(localStorage.getItem('eventId'))
                        {
                            window.location.href = environment.MainPage+'#/details/'+localStorage.getItem('eventId');
                            return;
                        }
                     window.location.href = environment.MainPage;
                      //window.location.href = location.origin;


                  },
                  (response) => {
                      this.isLoad = false;
                  }
              );
          } else {
              // value 3
          }
      });
  }
}

