/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable no-var */
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable()
export class CInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        //if (environment.production) {
        // const curUrl = window.location.host;
        // const url =
        //   curUrl === environment.curUrl
        //     ? environment.edoUrl
        //     : environment.prodUrl;
        if (req.url.indexOf('/api/') !== -1) {
            const newUrl =
                req.url[0] === '/'
                    ? environment.API_BASE_URL + req.url
                    : req.url;
            var lang = localStorage.getItem('lang');
            if (lang) {
                lang = <string>lang;
            } else {
                lang = environment.defaultLang;
            }

            req = req.clone({
                url: newUrl,
                setHeaders: { 'Accept-Language': lang },
                withCredentials: false,
            });
        }
        //}
        return next.handle(req);
    }
}
