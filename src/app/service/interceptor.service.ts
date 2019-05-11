import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private storage: Storage, private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let promise = this.storage.get('user');

        return from(promise).pipe(mergeMap(user => {

            let clonedReq = this.addToken(request, user);
            return next.handle(clonedReq);
        }));
    }

    private addToken(request: HttpRequest<any>, user: any) {
        if (user) {
            
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    Accept: "application/json",
                    key: `${user.key}`,
                },
                setParams: {store_id: this.auth.user.store_id}

            });
            return clone;
        } else {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache",
                    Accept: "application/json"
                }

            });
            return clone;

        }

        return request;

    }

}
