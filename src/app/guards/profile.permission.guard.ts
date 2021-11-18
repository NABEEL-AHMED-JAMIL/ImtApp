import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class ProfilePermissionGuard implements CanActivate {

    constructor(private router: Router) {}

    public canActivate(): boolean {
        return false;
    }
}
