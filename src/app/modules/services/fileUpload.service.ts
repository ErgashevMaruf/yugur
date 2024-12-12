import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'app/core/env/environment';
import { FileBase64 } from 'nswag-api/nswag-api-marathon';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FileServiceService {
    constructor(private http: HttpClient) {}

    private baseUrl = environment.API_BASE_URL;

    uploadFileForFolder(file: File): any {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let url = this.baseUrl + '/api/marathon/Files/uploadForImage';
        return this.http.post(url, formData);
    }
    uploadOffertaForFolder(file: File): any {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let url = this.baseUrl + '/api/marathon/Files/UploadFile';
        return this.http.post(url, formData);
    }
    uploadFileForFolderVideo(file: File): any {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let url = this.baseUrl + '/api/marathon/Files/uploadForVideo';
        return this.http.post(url, formData);
    }
    uploadResult(file: File, eventId:number): any {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);
        let url = this.baseUrl + `/api/marathon/Result/ImportResultRegistationEvent/${eventId}`;
        return this.http.post(url, formData, { responseType:'blob' });
    }

    uploadForImageBase64(base64Image: FileBase64) {
        let url_ = this.baseUrl + '/api/marathon/Files/uploadForImageBase64';
        url_ = url_.replace(/[?&]$/, '');

        const content_ = JSON.stringify(base64Image);

        let options_: any = {
            body: content_,
            observe: 'response',
            responseType: 'text',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        };
        return this.http.request('post', url_, options_);
    }
}
