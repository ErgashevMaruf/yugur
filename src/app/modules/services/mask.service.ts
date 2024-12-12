import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
class MaskService {
    public alpha = 'S*';

    public alphaNumeric = 'A*';

    public numeric = '0*';

    public numericWithSeparator = 'separator';

    public alphaWithSpace = {
        mask: 'X*',
        patterns: {
            X: {
                pattern: /[a-zA-Z ]/,
            },
        },
    };

    public phones: { [key: string]: string } = {
        '+998': '00 000 00 00',
    };
}

export { MaskService };
