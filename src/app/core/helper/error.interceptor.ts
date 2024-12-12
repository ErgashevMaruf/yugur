import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponseBase,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'app/shared/messages/error/error.component';
import { HttpStatusCode } from 'nswag-api-auth';

@Injectable()
export class ErrorInterceptor {
    constructor(private matdialog: MatDialog) {}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                this.matdialog.open(ErrorComponent);
                return throwError('Error');
            })
        );
    }
}
