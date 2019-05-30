import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../service/helper.service';
import Model from 'src/app/service/model';

@Injectable({
    providedIn: 'root'
})
export class BairrosService extends Model {
    public bairros = [];
    public bairroToEdit: any;
    protected url = 'neighborhoods'
    constructor(http: HttpClient, helper: HelperService) { super(http, helper) }

    cached() {
        if (this.bairros.length < 1) {
            this.get().subscribe( bairros => {
                this.bairros = bairros;
                
            });
        }
    }
}
