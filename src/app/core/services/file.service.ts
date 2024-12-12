import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export enum FileGroupItems {
    ImageProfile = 1,
}
@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(private http: HttpClient) {}
    private baseUrl = '/api/';
    uploadFile(file: File[], group: FileGroupItems): any {
        let formData: FormData = new FormData();
        if (file != null) {
            for (var i = 0; i < file.length; i++) {
                formData.append('file' + i, file[i], file[i].name);
            }
        }
        var url = this.baseUrl + 'files/filesinfo/uploadFile/' + group;
        return this.http.post(url, formData);
    }
}
