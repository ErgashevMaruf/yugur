import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'app/core/env/environment.prod';
import { UserService } from 'app/core/user/user.service';
import { formsData } from 'app/modules/auth/input/input.component';
import { ConfirmPasswordValidator } from 'app/modules/auth/sign-up/confirm-password.validator';
import { PasswordStrengthValidator } from 'app/modules/auth/sign-up/password.validation';
import { FileServiceService } from 'app/modules/services/fileUpload.service';
import { SuccessComponent } from 'app/shared/messages/success/success.component';
import { AccountClient, UserRegistrDTO } from 'nswag-api/nswag-api-auth';
import { SelectItemClient } from 'nswag-api/nswag-api-sps';

@Component({
    selector: 'app-personalInfo',
    templateUrl: './personalInfo.component.html',
    styleUrls: ['./personalInfo.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
    user: UserRegistrDTO;
    userEdit: FormGroup;
    sex: string;
    country: string;
    editState = false;
    url = environment.URL;
    constructor(
        private accountClient: AccountClient,
        private fb: FormBuilder,
        private spService: SelectItemClient,
        private dialog: MatDialog,
        private userService: UserService,
        private fileService: FileServiceService
    ) {}

    formsData: formsData[] = [
        {
            label: 'email',
            nameFormControl: 'email',
            matIcon: 'mailFooter',
        },
        {
            label: 'sign.password',
            nameFormControl: 'password',
            type: 'password',
        },
        {
            label: 'confirmpassword',
            nameFormControl: 'confirmpassword',
            type: 'password',
        },
    ];

    ngOnInit() {
        this.userEdit = this.fb.group(
            {
                email: ['', Validators.required],
                phoneMain: ['', Validators.required],
                password: ['', PasswordStrengthValidator],
                confirmpassword: [''],
                imageFileGuid: [''],
            },
            {
                validator: ConfirmPasswordValidator(
                    'password',
                    'confirmpassword'
                ),
            }
        );
        this.accountClient.getUserProfile().subscribe((res) => {
            this.user = res.result;
            if(this.user.phoneMain.length!==9)
            {
                this.user.phoneMain = this.user.phoneMain.slice(4);
            }
            this.userEdit.patchValue(res.result);
            this.userEdit.get('password').setValue('');
        });
    }
    setPhoto(file: File[]) {
        this.fileService.uploadFileForFolder(file[0]).subscribe((res) => {
            this.userEdit.get('imageFileGuid').setValue(res);
        });
    }
    updateUser() {
        this.user.password = '';
        if (this.userEdit.get('password').value) {
            this.user.password = this.userEdit.get('password').value;
            this.user.isChangePassword = true;
        }
        this.user.email = this.userEdit.get('email').value;
        this.user.phoneMain = '+998'+this.userEdit.get('phoneMain').value;
        if (this.userEdit.get('imageFileGuid').value) {
            this.user.imageFileGuid = this.userEdit.get('imageFileGuid').value;
        }
        this.accountClient.updateUserProfile(this.user).subscribe((res) => {
            this.user.phoneMain = this.user.phoneMain.slice(4)
            if (!res.error) {
                this.dialog.open(SuccessComponent);
                this.userEdit.get('password').setValue('');
                this.userEdit.get('confirmpassword').setValue('');
                this.editState = false;
            }
        });
    }
    openEdit() {
        this.editState = true;
        this.userEdit.enable();
    }
}
