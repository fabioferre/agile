import { Injectable } from '@angular/core';
import Model from 'src/app/service/model';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MesasService extends Model {
    protected url = 'tables';
    public tables: any;
    public tableToEdit: any;
    constructor(protected http: HttpClient, protected helper: HelperService) {
        super(http, helper);
    }

}
