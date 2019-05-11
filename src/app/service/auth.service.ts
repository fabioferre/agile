import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { HelperService } from './helper.service';
@Injectable({
    providedIn: 'root'
})
export class AuthService implements CanActivate {
    public user: any;
    public system: any;

    constructor(
        private http: HttpClient,
        private router: Router,
        private storage: Storage,
        private helper: HelperService
    ) { }

    public authenticate(credentials: string[]): Observable<any> {
        return this.http.post(`${this.helper.url}/auth/login`, credentials).pipe(
            retry(10)
        );
    }

    public logout(): void {
        this.storage.remove('system');
        this.router.navigate(['/login']);
    }

    canActivate() {
        return this.storage.get('system').then(val => {
            if (val) {
                this.storage.get('user').then(user =>  this.configSystem({system: val, user: user}));
                return true;
            } else {
                this.router.navigate(['/auth']);
                return false;
            }
        });
    }

    public configSystem(response): void {
        this.system = response.system;
        this.user = response.user;
    }


    
}
