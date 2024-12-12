
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FuseConfigService } from '@fuse/services/config';
import { AppConfig, Scheme } from 'app/core/config/app.config';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
  standalone: true,
  imports: [MatIconModule]
})
export class ThemeComponent implements OnInit {

  isLight = true;
  config: AppConfig;
  isConfigChanged = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private _fuseConfigService: FuseConfigService) { }

  ngOnInit() {
   this._fuseConfigService.config$.subscribe(res=>{
      this.isLight = res.scheme=='light'?true:false;
   })
  }
  setScheme(scheme: Scheme): void {
    this.isConfigChanged = true;
    this.isLight = scheme=='dark' ? false :  true;
    this._fuseConfigService.config = { scheme };
    this._fuseConfigService.config$.subscribe(config=>{
      localStorage.setItem('config', JSON.stringify(config));
    })
  }

}
