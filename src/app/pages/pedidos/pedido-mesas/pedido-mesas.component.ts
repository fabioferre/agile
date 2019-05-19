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
        if (!this.tableService.tables) {
            this.getTables();
        }
    }

    public getTables(): void {
        this.tableService.getNoLoad().subscribe(tables => {
            this.tableService.tables = tables;
        });
    }

    public getOrder(table): void {
        // this.tableService.getOrder(table.id).subscribe((order => {
        //     this.homeService.table = {id:9, name: 'oloco'};
        //     this.homeService.productSelected = [{id: 9, qtd: 1, }]
        // }));   
        
        this.homeService.table = {id:9, name: 'oloco'};
        this.homeService.productSelected = [{id: 9, qtd: 1, sold_price: 2323, units:  12 }];
        this.router.navigate(['/home']);
    }   

}
