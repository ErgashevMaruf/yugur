import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';
import { ThemeComponent } from '../../../../shared/theme/theme.component';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    animations: fuseAnimations,
    standalone:true,
    imports: [RouterModule, TranslocoModule, ThemeComponent, MatIconModule, NgClass, LanguagesModule]

})
export class NavComponent implements OnInit {
    show = true;
    showBurgerMenu = false;
    @Output() sectionId = new EventEmitter<string>();
    @Input() isCenterShow = true;
    move(event: any) {
        event.preventDefault();
        const href = event.target.getAttribute('href');
        this.sectionId.emit(href);
    }
    @HostListener('window:resize', ['$event'])
    onResize() {
        if (window.innerWidth <= 1280) {
            this.show = false;
            this.showBurgerMenu = true;
        }
        else {
            this.showBurgerMenu = false;
            this.show = true;
        }
    }
    openMenu() {
        this.show = !this.show;
    }
    ngOnInit(): void {
        this.show = window.innerWidth <= 1280 ? false : true;
        this.showBurgerMenu = window.innerWidth <= 1280 ? true : false;
    }
}
