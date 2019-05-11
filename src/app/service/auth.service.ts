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
    public store: any;
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
    }


    
}
