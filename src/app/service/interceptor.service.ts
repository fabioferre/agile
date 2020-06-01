import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, of, from, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor( private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let clonedReq: HttpRequest<any>;
        if (this.auth.user) {
            
            
            clonedReq = request.clone({
                setHeaders: {
                    // 'Content-Type': 'application/json',
                    'cache-control': 'no-cache',
                    Accept: 'application/json',
                    key: `${this.auth.user.key}`,
                },
                setParams: { store_id: this.auth.user.store_id },
            });

            // if(clonedReq.body) {
            //     clonedReq.body.store_id = this.auth.user.store_id;
            // }
        } else {
            clonedReq = request;
        }
        return next.handle(clonedReq);

    }

}
