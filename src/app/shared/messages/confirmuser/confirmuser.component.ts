import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { AccountClient, EmailConfirmed, HttpStatusCode } from 'nswag-api/nswag-api-auth';
import { map, takeUntil, timer } from 'rxjs';
import { SuccessComponent } from '../success/success.component';
import { AlreadyhaveComponent } from '../alreadyhave/alreadyhave.component';

@Component({
    selector: 'app-confirmuser',
    templateUrl: './confirmuser.component.html',
    styleUrls: ['./confirmuser.component.css'],
})
export class ConfirmuserComponent implements OnInit {
    constructor(
        private accountClient: AccountClient,
        @Inject(MAT_DIALOG_DATA) public data: string,
        private fb: FormBuilder,
        private router: Router,
        private _authService: AuthService,
        private matdialog: MatDialog
    ) {}
    confirm: FormGroup;
    minutes: number;
    seconds: number;
    ngOnInit() {
        this.getTimer(5).subscribe({
            next: (value) => {
                this.minutes = value.minutes;
                this.seconds = value.seconds;
            },
            complete: () => {
                this.matdialog.closeAll();
            },
        });
        this.confirm = this.fb.group({
            a: ['', Validators.required],
            b: ['', Validators.required],
            c: ['', Validators.required],
            d: ['', Validators.required],
        });
    }
    getTimer(minutes: number) {
        let distance = minutes * 60 * 1000 - 1000;
        return timer(0, 1000).pipe(
            takeUntil(timer(distance)),
            map(() => {
                const minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                distance -= 1000;
                localStorage.setItem(
                    'timer',
                    ((distance + 1000) / (60 * 1000)).toString()
                );
                return { minutes, seconds };
            })
        );
    }
    submit() {
        let valueForm = this.confirm.value;
        let value =
            '' +
            valueForm['a'] +
            valueForm['b'] +
            valueForm['c'] +
            valueForm['d'];
        this.accountClient
            .confirmUser(
                new EmailConfirmed({
                    id: this.data,
                    emailConfirmedCode: value,
                })
            )
            .subscribe((res) => {
                if (res.statusCode == HttpStatusCode.OK) {
                    this.matdialog.open(SuccessComponent);
                    setTimeout(() => {
                        this._authService.signInByToken(res.result.token);
                        this.router.navigate(['']);
                    }, 3000);
                } else {
                    this.matdialog.open(AlreadyhaveComponent, {
                        data: 'password',
                    });
                }
            });
    }
    closeTab() {
        this.matdialog.closeAll();
    }
    tabPress(index:number)
    {
        const input:HTMLElement = document.getElementById('verification'+index);
        input.focus();
    }
}
