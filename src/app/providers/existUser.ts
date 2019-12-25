import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserSingleton } from './user.service';
import { ROUTES } from '../app.constants';

@Injectable()
export class ExistUser implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(): boolean {
        UserSingleton.getInstance().getUsername() == null ? this.router.navigate(['/'.concat(ROUTES.LOGIN)]) : null;
        return UserSingleton.getInstance().getUsername() != null;
    }

}