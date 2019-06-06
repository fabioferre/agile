import { Component, OnInit } from '@angular/core';
import { MesasService } from '../../mesas/mesas.service';
import { HelperService } from 'src/app/service/helper.service';
import { HomeService } from '../../home/home.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pedido-mesas',
    templateUrl: './pedido-mesas.component.html',
    styleUrls: ['./pedido-mesas.component.scss', '../../mesas/mesas.page.scss'],
})
export class PedidoMesasComponent implements OnInit {

    constructor(
        public tableService: MesasService,
        public homeService: HomeService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getTables();
    }

    public getTables(): void {
        this.tableService.tables = null;
        this.tableService.getNoLoad().subscribe(tables => {
            this.tableService.tables = tables;
        });
    }

    public getOrder(table_selected): void {
        this.homeService.table = table_selected;
        if(table_selected.status > 1) {
            this.tableService.getById(table_selected.id).subscribe((table => {
                
                this.homeService.productSelected = JSON.parse(table.products);
                this.homeService.order_id = table_selected.order_id;

                this.homeService.productSelected.map(product => {
                    product.old = true;
                })

                this.homeService.loadOrders = true;
                this.router.navigate(['/home']);
            }));  
        }  else {
            this.router.navigate(['/home']);
        }
        
        
    }   

}
