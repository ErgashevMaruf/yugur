import {
    Component,
    ViewChild,
    ElementRef,
    OnInit,
    Input,
    Injector,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'app/core/env/environment.prod';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {
    dialogData:any;
    srcUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/g4VcjUOiMAM?si=f-LZdFbiMuFs1CWh?rel=0');

    constructor(private injector: Injector,
    private domSanitizer:DomSanitizer
    ) {
        const data = this.injector.get(MAT_DIALOG_DATA, null);
        if (data) {
            this.dialogData = data;
            this.srcUrl = data
        }
    }

    ngOnInit(): void {
    }
}
