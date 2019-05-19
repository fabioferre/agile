import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalNovaMesaComponent } from './modal-nova-mesa/modal-nova-mesa.component';
import { ModalEditaMesaComponent } from './modal-edita-mesa/modal-edita-mesa.component';
import { MesasService } from './mesas.service';

@Component({
    selector: 'app-mesas',
    templateUrl: './mesas.page.html',
    styleUrls: ['./mesas.page.scss'],
})
export class MesasPage implements OnInit {
    constructor(
        private modalCtrl: ModalController, 
        public tableService: MesasService) { }

    ngOnInit() { 
        if(!this.tableService.tables){
            this.getTables();
        }
    }

    public getTables(): void {
        this.tableService.tables = null;
        this.tableService.getNoLoad().subscribe(tables => {
            this.tableService.tables = tables;
        });
    }
    
    async registerTable() {
        const modal = await this.modalCtrl.create({
            component: ModalNovaMesaComponent,
            cssClass: 'responsive'
        });

        return await modal.present();
    }

    async editTable(data: any) {
        const modal = await this.modalCtrl.create({
            component: ModalEditaMesaComponent,
            componentProps: data,
            cssClass: 'responsive'
        });
        return await modal.present();
    }
}
