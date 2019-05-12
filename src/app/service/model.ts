import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

export default class Model {

    protected url;
    constructor(
        protected http : HttpClient,
        protected helper: HelperService ){

    }

    public get(): Observable<any> {
        return this.http.get<any>(`${this.helper.url}/${this.url}`).pipe(
            retry(2)
        )
    }

    public getById(id) {
        return this.http.get<any>(`${this.helper.url}/${this.url}/${id}`)
    }

    public updateById(id, params){
        return this.http.put<any>(`${this.helper.url}/${this.url}/${id}`, params)
    }
    public create(params){
        return this.http.post<any>(`${this.helper.url}/${this.url}`, params)
    }

}