import { Injectable } from '@angular/core';
import Model from 'src/app/service/model';
import { HttpClient } from '@angular/common/http';
import { HelperService } from 'src/app/service/helper.service';
import { catchError, retryWhen, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class PedidosService extends Model {
    protected url = 'orders';
    public dataSource = new MatTableDataSource<any>([]);
    public typeSelling = {
        type1: 'Balcão',
        type2: 'Entrega',
        type3: 'Cliente',
        type4: 'Mesa'
    };
    public pedidos;
    public orderToFinalize;

    constructor(http: HttpClient, helper: HelperService) { super(http, helper); }

    public removeOrder(order): void {
        const re = this.pedidos.splice(this.pedidos.indexOf(order), 1);
    }

    public changeStatus(order) {
        this.helper.load();
        return this.http.patch(`${this.urlApi}/${this.url}/${order.id}/clos`, order).pipe(
            catchError(this.handleError),
            finalize(() => {
                this.helper.isLoading = false;
                this.helper.load(false);
            })
        );
    }
}
