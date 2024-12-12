import { inject, Pipe, type PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { map, of } from 'rxjs';

export interface Language {
    nameKar: string;
    nameRu: string;
    nameUz: string;
}
@Pipe({
    name: 'appTranslateAsync',
    standalone: true,
})
export class TranslateAsyncPipe implements PipeTransform {
    private $transloco = inject(TranslocoService);
    transform(value: any, prefix?: string, suffixUz:string='UZ') {
        if (!value) {
            return of('');
        }
        if (prefix) {
            return this.$transloco.langChanges$.pipe(
                map((w) => {
                    let suffix = suffixUz;
                    switch (w) {
                        case 'ru-Ru':
                            suffix = 'RU';
                            break;
                        case 'en':
                            suffix = 'EN';
                            break;
                    }
                    return value[prefix + suffix];
                })
            );
        }
    }
}
