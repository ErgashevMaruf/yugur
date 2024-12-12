import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { environment } from 'app/core/env/environment.prod';
import { AthletesInfoDTO, FaceIDMobileClient } from 'nswag-api-marathon';

@Component({
    selector: 'app-faceId',
    template: `@if(userInfo) {
        <div
            class="w-full flex justify-center items-center flex-col gap-3 px-3"
        >
            <div class="text-[20px] py-4 font-semibold">
                <div class="flex gap-2">
                    <p>{{ 'fullName' | transloco }}</p>
                    <p>{{ userInfo.fullName }}</p>
                </div>
                <p>ID: {{ userInfo.personId }}</p>
                <img
                    class="sm:h-[400px] h-full text-center sm:w-[300px] w-full object-cover"
                    [src]="url + userInfo.imageFileGuid"
                    alt=""
                />
            </div>
        </div>
        } `,
    styleUrls: ['./faceId.component.css'],
    standalone: true,
    imports: [TranslocoModule],
})
export default class FaceIdComponent implements OnInit {
    url = environment.URL;
    userInfo: AthletesInfoDTO;
    constructor(
        private _router: ActivatedRoute,
        private _faceIdMobile: FaceIDMobileClient
    ) {}

    ngOnInit() {
        const id = this._router.snapshot.params.id;
        this._faceIdMobile.getPhotoById(id).subscribe((res) => {
            this.userInfo = res.result;
        });
    }
}
