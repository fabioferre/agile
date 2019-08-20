import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from '../../home.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-complements-modal',
    templateUrl: './complements-modal.component.html',
    styleUrls: ['./complements-modal.component.scss'],
})
export class ComplementsModalComponent implements OnInit {
    public product: any;
    public form: FormGroup = this.fb.group({
        description: ['']
    });

    public aditionalPrice: any = 0;
    constructor(
        public modalCtr: ModalController,
        public homeService: HomeService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.homeService.productModal.complements.map((complement) => {
            complement.selected = false;
        });
        // this.product.sale_price = parseFloat(this.product.sale_price);
    }


    public toggleComplement(complement) {
        const idx = this.homeService.productModal.complements.indexOf(complement) ;
        if ( !this.homeService.productModal.complements[idx].selected ) {
            this.homeService.productModal.complements[idx].selected = true;
            this.aditionalPrice = (parseFloat(complement.price) +  parseFloat( this.aditionalPrice ));
        } else  {
            this.product.complements[idx].selected = false;
            this.aditionalPrice = (parseFloat(complement.price) -  parseFloat( this.aditionalPrice ));
        }

        this.comentChanges();
    }


    public comentChanges() {
        let comment = '';
        this.homeService.productModal.complements.map((complement) => {
            if (complement.selected) {
                comment +=  complement.name + ' / ' ;
            }
        });

        this.form.controls.description.setValue(comment);
    }
    continueProcess() {
        this.homeService.productModal.canAdd = true;
        this.homeService.productModal.aditional_price = this.aditionalPrice;
        this.homeService.productModal.description = this.form.controls.description.value;
        this.modalCtr.dismiss();
    }

}
