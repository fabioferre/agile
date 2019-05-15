import { HelperService } from './../../service/helper.service';
import { PedidosService } from './pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.page.html',
    styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {



    constructor(public pedidosService: PedidosService,
        public helper: HelperService) { }

    ngOnInit() {
        let date = this.helper.date(null, "-1 day")
 
        this.pedidosService.get(`filter=[["created_at",">=", "${date}"]]`).subscribe(pedidos => {
            this.pedidosService.pedidos = pedidos;
            console.log(pedidos);

        })

    }



}



