import { Component, OnInit } from '@angular/core';
import { LOGIN, COMMON, ERROR, ROUTES } from '../../app.constants';
import { LoginElementsDisplayModel, StatusTimeModel } from '../models/login-elements-display.interface';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSingleton } from '../../providers/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public LOGIN_CONST = LOGIN;
    public COMMON = COMMON;
    public ERROR = ERROR;

    public checked: boolean = false;
    public elementsDisplay: LoginElementsDisplayModel = {
        greeting: { status: false, time: 2000 },
        tutorial: { status: false, time: 6000 },
        requestName: { status: false, time: 4000 },
        login: { status: false, time: null }
    };
    public login: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });

    constructor(private router: Router) {}

    ngOnInit() {
        this.animationManagement();
    }

    public reload() {
        this.animationManagement();
    }

    public continue() {
        if (this.login.valid) {
            this.router.navigate(['/'.concat(ROUTES.BROWSER)]);
            UserSingleton.getInstance().setUsername(this.login.controls['username'].value);
        }
    }

    private animationManagement() {
        this.elementsDisplay.login.status = false;
        this.manageDisplay(0);
    }

    private manageDisplay(propPlace: number) {
        const keys = Object.keys(this.elementsDisplay);
        this.elementsDisplay[keys[propPlace]].status = true;
        setTimeout(() => {
            this.elementsDisplay[keys[propPlace]].status = propPlace === keys.length - 1;
            propPlace <= keys.length - 2 ? this.manageDisplay(propPlace + 1) : null;
        }, this.elementsDisplay[keys[propPlace]].time);
    }
}
