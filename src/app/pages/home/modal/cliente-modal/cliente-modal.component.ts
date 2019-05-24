import { ClientesService } from './../../../clientes/clientes.service';
import { HomeService } from './../../home.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-cliente-modal',
    templateUrl: './cliente-modal.component.html',
    styleUrls: ['./cliente-modal.component.scss'],
})
export class ClienteModalComponent implements OnInit {
    displayedColumns: string[] = [ 'name', 'cell_phone', 'action'];
    dataSource:any;
    public alertToRegister: boolean;
    public showForm: boolean;
    public clients: any;
    constructor(
        public modalCrl: ModalController,
        private fb: FormBuilder,
        public homeService: HomeService,
        private clientService: ClientesService
    ) { }

    ngOnInit() {
        this.clientService.get().subscribe((clients) => {
            if(clients.length > 0) {
                this.dataSource = new MatTableDataSource<any>(clients);
            } else {
                this.alertToRegister = true;
            }
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        
        if(this.dataSource.filteredData.length < 1)
        {
            this.alertToRegister = true;
        } else {
            this.alertToRegister = false;
        }
    }



}
