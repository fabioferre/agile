import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';
import { retry, catchError, finalize } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { HelperService } from './helper.service';
@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    public user: any;
    public system: any;
    public store: any;
    public permissions: any;
    constructor(
        private http: HttpClient,
        private router: Router,
        private storage: Storage,
        private helper: HelperService
    ) { }

    public authenticate(credentials: string[]): Observable<any> {
        return this.http.post(`${this.helper.url}/auth/login`, credentials).pipe(
            retry(1)
        );
    }
    public updatePassword(parans: string[]): Observable<any> {
        this.helper.load();
        return this.http.patch(`${this.helper.url}/auth/password`, parans).pipe(
            finalize(() => {
                this.helper.load(false);
            }),
            retry(2),
            catchError(error => of(this.helper.message(error)))
        );
    }

    public logout(): void {
        this.storage.remove('user');
        this.router.navigate(['/auth']);
    }

    canActivate() {
        return this.storage.get('user').then(val => {
            if (val) {
                this.configSystem(val);
                return true;
            } else {
                this.router.navigate(['/auth']);
                return false;
            }
        });
    }

    public configSystem(user): void {
        this.user = user;
        this.permissions = user.permissions;
    }


    public canDo(permissionName: string): boolean {
        let can = false;
       
        this.permissions.forEach((permission) => {
            if (permission.name === permissionName) {
                can = true;
            }
        });

        if(this.user.master > 0) {
            can  = true;
        }
        return can;
    }



}
