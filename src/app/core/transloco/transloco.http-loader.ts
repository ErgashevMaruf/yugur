import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { LangClient } from 'nswag-api-sps';
import { TranslocoLoaderData } from '@ngneat/transloco/lib/transloco.loader';

@Injectable({
    providedIn: 'root',
})
export class TranslocoHttpLoader implements TranslocoLoader {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get translation
     *
     * @param lang
     */
    getTranslation(lang: string): Observable<Translation> {
        return this._httpClient.get<Translation>(
            '/api/sps/Lang/LangToJSON/' + lang
        );
    }
}
