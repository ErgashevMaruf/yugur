import { Component } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import { AppConfig } from './core/config/app.config';
import { UserService } from './core/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isSmallScreen = false;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _userService: UserService
    ) {
        this._fuseConfigService.config$.subscribe((config: AppConfig) => {
            // Store the config
            let theme = document.getElementById(
                'app-theme'
            ) as HTMLLinkElement;
            theme.href = config.scheme === 'dark' ? 'dark.css' : 'light.css';
        });
        const configFromStorage = localStorage.getItem('config');
        if (configFromStorage) {
            let config = JSON.parse(configFromStorage);
            this._fuseConfigService.config = config;
        }
        this._userService.isSmallScreen$.subscribe((res) => {
            this.isSmallScreen = res;
        });
    }
}
