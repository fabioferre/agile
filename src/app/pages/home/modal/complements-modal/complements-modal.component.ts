import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from '../../home.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatListOption } from '@angular/material';
import { formatCurrency } from '@angular/common';

@Component({
    selector: 'app-complements-modal',
    templateUrl: './complements-modal.component.html',
    styleUrls: ['./complements-modal.component.scss'],
})
export class ComplementsModalComponent implements OnInit {
    public product: any;
    public form: FormGroup = this.fb.group({
        description: [''],
        aditionalPrice: [0]
    });
    public complementsSelected: any = [];
    constructor(
        public modalCtr: ModalController,
        public homeService: HomeService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.product = this.homeService.productModal;
        this.product.complements.map((complement) => {
            complement.selected = false;
        });
    }

    get aditionalPrice() {
        return this.form.controls.aditionalPrice;
    }

    public toggleComplement(complement) {
        const idx = this.product.complements.indexOf(complement) ;


        if ( !this.product.complements[idx].selected ) {
            this.product.complements[idx].selected = true;
            this.aditionalPrice.setValue(parseFloat(complement.price)  + this.aditionalPrice.value)  ;
        } else  {
            this.product.complements[idx].selected = false;
            this.aditionalPrice.setValue( parseFloat(complement.price)  - this.aditionalPrice.value)  ;
        }

        console.log(this.aditionalPrice.value)
    }

    continueProcess() {
        this.product.canAdd = true;
    }

}
