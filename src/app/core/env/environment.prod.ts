/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { generalSetting } from './general.setting';

/* eslint-disable @typescript-eslint/naming-convention */
export const environment = {
    production: true,
    api_schema: 'https://',

    api_url: 'yugurbot.devel.uz/',
    API_BASE_URL: 'https://yugurbot.devel.uz',
    MainPage: 'https://yugurbot.devel.uz',
    URL:'https://yugurbot.devel.uz/api/marathon/Files/GetFile/',

    // api_url: 'yugur.uz/',
    // API_BASE_URL: 'https://yugur.uz',
    // MainPage: 'https://yugur.uz',
    //  URL:'https://yugur.uz/api/marathon/Files/GetFile/',
    maxUploadFileSize: 50000000,

    ...generalSetting,
    PAYME_MERCHANT_ID: '66e8162443059d2bd9192543',
    baseUrl() {
        return this.api_schema + this.api_url;
    },
};
