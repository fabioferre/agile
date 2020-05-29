import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { MotoboyService } from 'src/app/pages/motoboy/motoboy.service';
import { PedidosService } from '../../pedidos.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-modal-motoboy',
    templateUrl: './modal-motoboy.component.html',
    styleUrls: ['./modal-motoboy.component.scss'],
})
export class ModalMotoboyComponent implements OnInit {

    displayedColumns: string[] = ['name', 'cell_phone', 'action'];
    dataSource =  new MatTableDataSource<any>([]);
    public alertToRegister: boolean;

    constructor(
        public modalCrl: ModalController,
        private fb: FormBuilder,
        private motoboyService: MotoboyService,
        private orderService: PedidosService
    ) { }

    ngOnInit() {
        if(!this.motoboyService.motoboys) {
            this.motoboyService.get().subscribe((motoboys) => {
                this.motoboyService.motoboys = motoboys;
                if (motoboys.length > 0) {
                    this.dataSource.data = motoboys;
                    this.dataSource._updateChangeSubscription();
                } else {
                    this.alertToRegister = true;
                }
            });
        } else {
            this.dataSource.data = this.motoboyService.motoboys;
            this.dataSource._updateChangeSubscription();
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.filteredData.length < 1) {
            this.alertToRegister = true;
        } else {
            this.alertToRegister = false;
        }
    }


    public selectMotoboy(motoboy) {
        this.orderService.orderToFinalize.motoboy_id = motoboy.id;
        this.modalCrl.dismiss();
    
        this.orderService.changeStatus( this.orderService.orderToFinalize ).subscribe(response => {
            let idx = this.orderService.dataSource.data.indexOf(this.orderService.orderToFinalize);
            this.orderService.dataSource.data[idx] = response;
            this.orderService.dataSource._updateChangeSubscription();
        });
    }



}
