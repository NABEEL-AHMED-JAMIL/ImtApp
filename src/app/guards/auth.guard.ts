import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as moment from 'moment';
import { AuthenticationService } from '../service/auth.service';
import { ToastService } from '../service/toast.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private toastService: ToastService,
        private authService: AuthenticationService) {
    }

    public canActivate(): boolean {
        const user = this.authService.getCurrentUser();
        if (user && user.expiration) {
            if (moment() < moment(user.expiration)) {
                return true;
            } else {
                this.toastService.presentToast('Your session has expired');
                this.router.navigate(['login']);
                return false;
            }
        }
        this.router.navigate(['login']);
        return false;
    }
}
