import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone:true,
    imports:[TranslocoModule, MatIconModule]
})
export class FooterComponent implements OnInit {
    constructor() {}
    year = new Date().getFullYear();
    @Output() sectionId = new EventEmitter<string>();
    ngOnInit() {}
    move(event: any) {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        this.sectionId.emit(href);
    }
}
