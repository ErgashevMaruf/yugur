import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';

export interface formsData {
    label: string;
    nameFormControl: string;
    error?: boolean;
    type?: string | null;
    placeholder?: string;
    matIcon?: string;
}

@Component({
    selector: 'app-input-forms',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    standalone: true,
    imports: [NgClass, TranslocoModule, ReactiveFormsModule, MatIconModule],
    animations: fuseAnimations,
})
export class InputComponent implements OnInit {
    @Input() isGroup = true;
    @Input() groupName: string;
    constructor() {}
    @Input() error = false;
    @Input() inputFormsData: formsData[] = [];
    showPassword = 'password';
    ngOnInit() {}
    passWordShow() {
        this.showPassword =
            this.showPassword == 'password' ? 'text' : 'password';
    }
}
