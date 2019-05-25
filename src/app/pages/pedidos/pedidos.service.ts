import { Injectable } from '@angular/core';
import Model from 'src/app/service/model';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import { catchError, retryWhen } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PedidosService extends Model {
    public typeSelling = {
        type1: 'Balcão',
        type2: 'Entrega',
        type3: 'Cliente',
        type4: 'Mesa'
    };
    public pedidos;
    public orderToFinalize;
    protected url = 'orders'
    constructor(http: HttpClient, helper: HelperService) { super(http, helper) }

    public removeOrder(order): void {
        let re = this.pedidos.splice(this.pedidos.indexOf(order), 1)
    }

    public changeStatus(order) {
        return this.http.patch(`${this.urlApi}/${this.url}/${order.id}/close`, order).pipe(
            catchError((error: any) => of( this.helper.message(error) )),
        );
    }
}
