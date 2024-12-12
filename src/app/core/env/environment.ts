/* eslint-disable @typescript-eslint/naming-convention */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { generalSetting } from './general.setting';

export const environment = {
    // api_schema: 'http://',
    // api_url: 'localhost:55900/',
    // API_BASE_URL: 'http://localhost:55900',

    //MainPage: 'http://localhost:4200',

    production: true,
    api_schema: 'https://',
    // api_url: 'yugurbot.devel.uz/',
    // API_BASE_URL: 'https://yugurbot.devel.uz',
    // MainPage: 'https://yugurbot.devel.uz',

    api_url: 'yugur.uz/',
    API_BASE_URL: 'https://yugur.uz',
    MainPage: 'https://yugur.uz',

    maxUploadFileSize: 20000000,
    PAYME_MERCHANT_ID: '66e8162443059d2bd9192543',
    // '66e8162443059d2bd9192543' devel merchant id
    ...generalSetting,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    baseUrl() {
        return this.api_schema + this.api_url;
    },
};

//prod
// export const environment = {
//     production: true,
//     api_schema: 'http://',
//     api_url: 'localhost:55722/',
//     API_BASE_URL: 'http://localhost:55722',
//     // api_schema: 'https://',
//     // api_url: 'yugurbot.devel.uz/',
//     // API_BASE_URL: 'https://yugurbot.devel.uz',
//     maxUploadFileSize: 50000000,
//     MainPage: 'http://localhost:4200',
//     ...generalSetting,
//     baseUrl() {
//         return this.api_schema + this.api_url;
//     },
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
