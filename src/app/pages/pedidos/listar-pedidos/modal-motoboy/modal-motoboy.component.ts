import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { MotoboyService } from 'src/app/pages/motoboy/motoboy.service';
import { MatTableDataSource } from '@angular/material';
import { PedidosService } from '../../pedidos.service';

@Component({
    selector: 'app-modal-motoboy',
    templateUrl: './modal-motoboy.component.html',
    styleUrls: ['./modal-motoboy.component.scss'],
})
export class ModalMotoboyComponent implements OnInit {

    displayedColumns: string[] = ['name', 'cell_phone', 'action'];
    dataSource: any;
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
                    this.dataSource = new MatTableDataSource<any>(motoboys);
                } else {
                    this.alertToRegister = true;
                }
            });
        } else {
            this.dataSource = new MatTableDataSource<any>(this.motoboyService.motoboys);
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


    public selectMotoboy(order) {
        order.status = 2;
        order.type = 2;
        this.modalCrl.dismiss();
        this.orderService.updateById(order.id, order).subscribe(response => {
            console.log(response)
        });
    }



}
