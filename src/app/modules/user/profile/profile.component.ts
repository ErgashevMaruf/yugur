import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { formsData } from 'app/modules/auth/input/input.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    isAdmin=false;
    constructor(public userService: UserService) {}
    
    ngOnInit() {
        this.userService.user$.subscribe(res=>{
            this.isAdmin = res.roles.find(el=>el=='Администратор')?true:false
        })
    }
}
