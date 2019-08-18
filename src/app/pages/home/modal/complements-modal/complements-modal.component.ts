import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from '../../home.service';

@Component({
    selector: 'app-complements-modal',
    templateUrl: './complements-modal.component.html',
    styleUrls: ['./complements-modal.component.scss'],
})
export class ComplementsModalComponent implements OnInit {
    public product: any;
    constructor(
        public modalCtr: ModalController,
        public homeService: HomeService
    ) { }

    ngOnInit() {
        this.product = this.homeService.productModal;
        console.log(this.product)
        this.product.complements = [
            {
                name: 'Arroz'
            },
            {
                name: 'Feijão'
            },
            {
                name: 'Varoa'
            },
            {
                name: 'Rato morto'
            },
        ];
    }

}
