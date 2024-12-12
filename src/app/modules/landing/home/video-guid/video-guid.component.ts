import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslocoModule } from '@ngneat/transloco';
import { VideoComponent } from '../video/video.component';


@Component({
    selector: 'app-video-guid',
    templateUrl: './video-guid.component.html',
    styleUrls: ['./video-guid.component.css'],
    standalone: true,
    imports: [TranslocoModule],
})
export class VideoGuidComponent implements OnInit {
    guidArr = [
        {
            url: this.domSanitizer.bypassSecurityTrustResourceUrl(
                'https://www.youtube.com/embed/qp4r8VgaNgE?si=wNviuzVTUqYdj6g5'
            ),
            transloco: 'videoGuidLeft',
        },
        {
            url: this.domSanitizer.bypassSecurityTrustResourceUrl(
                'https://www.youtube.com/embed/tUueDkt9DpY?si=tnAh0_a1WzKKmOA_'
            ),
            transloco: 'videoGuidCenter',
        },
        {
            url: this.domSanitizer.bypassSecurityTrustResourceUrl(
                'https://www.youtube.com/embed/OylFSlfVSmU?si=bUeqpSCZyz8UmGIQ'
            ),
            transloco: 'videoGuidRight',
        },
    ];

    constructor(
        private domSanitizer: DomSanitizer,
        private dialog: MatDialog
    ) {}

    ngOnInit() {}
    openYoutube(url) {
        this.dialog.open(VideoComponent, {
            data: url,
        });
    }
}
