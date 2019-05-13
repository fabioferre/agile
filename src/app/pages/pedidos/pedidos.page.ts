import { PedidosService } from './pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.page.html',
    styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
   
    

    constructor(public pedidosService: PedidosService) { }

    ngOnInit() {
        if(!this.pedidosService.pedidos) {
            this.pedidosService.get().subscribe(pedidos => {
                this.pedidosService.pedidos = pedidos;
                console.log(pedidos);
                
            })
        }
    }

    

}

  

