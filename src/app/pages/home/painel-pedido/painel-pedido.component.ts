import { HomeService } from './../home.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ClienteModalComponent } from '../modal/cliente-modal/cliente-modal.component';
declare var $: any;

@Component({
    selector: 'app-painel-pedido',
    templateUrl: './painel-pedido.component.html',
    styleUrls: ['./painel-pedido.component.scss'],
})
export class PainelPedidoComponent implements OnInit {
    constructor(
        private modalCtrl: ModalController,
        public homeService: HomeService
    ) { }

    ngOnInit() {
        this.changeActive();
    }   

    async modalClient(request?) {
        const modal = await this.modalCtrl.create({
            component: ClienteModalComponent
        });

        return await modal.present();
    }

    public changeActive(): void {
        $('.painel-item').click(function(){
            $('.painel-item.active').removeClass('active')
            $(this).addClass('active');
        });
    }

}
