import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { HomeService } from '../../home/home.service';
import { ClientesService } from '../../clientes/clientes.service';
import { MatTableDataSource } from '@angular/material';
import { ModalRegistraClienteComponent } from './modal-registra-cliente/modal-registra-cliente.component';

@Component({
    selector: 'app-pedidos-cliente',
    templateUrl: './pedidos-cliente.component.html',
    styleUrls: ['./pedidos-cliente.component.scss'],
})
export class PedidosClienteComponent implements OnInit {
    displayedColumns: string[] = ['name', 'cell_phone', 'action'];
    dataSource: any;
    public alertToRegister: boolean;
    public clients: any;
    constructor(
        public modalCrl: ModalController,
        private fb: FormBuilder,
        public homeService: HomeService,
        private clientService: ClientesService
    ) { }

    ngOnInit() {
        this.clientService.get().subscribe((clients) => {
            if (clients.length > 0) {
                this.dataSource = new MatTableDataSource<any>(clients);
            } else {
                this.alertToRegister = true;
            }
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.filteredData.length < 1) {
            this.alertToRegister = true;
        } else {
            this.alertToRegister = false;
        }
    }

    async registerModal() {
        const modal = await this.modalCrl.create({
            component: ModalRegistraClienteComponent
        });

        return await modal.present();
    }
    

}
