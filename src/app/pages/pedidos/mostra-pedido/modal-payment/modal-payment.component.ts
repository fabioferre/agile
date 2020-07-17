import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidosService } from '../../pedidos.service';
import { HelperService } from 'src/app/service/helper.service';
import { ImpressoraService } from 'src/app/pages/sistema/impressora.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-modal-payment',
    templateUrl: './modal-payment.component.html',
    styleUrls: ['./modal-payment.component.scss'],
})
export class ModalPaymentComponent implements OnInit {
    public paymentOptions: any[] = [
        { id: 1, name: 'Cartão Debito / Crédito', icon: 'fa-credit-card' },
        { id: 2, name: 'Vaucher(VR, VA)', icon: 'fa-money-check' },
        { id: 3, name: 'Dinheiro', icon: 'fa-money-bill-wave' },
    ];

    public form: FormGroup = this.fb.group({
        paymentMethod: ['', Validators.required],
        paymentValue: ['', Validators.required],
        change: [0],
        missingPayment: [0],
        discount_amount: ['']
    });

    public paymentOptionChose: any;

    public order: any;

    constructor(
        public modalCtrl: ModalController,
        private fb: FormBuilder,
        private orderService: PedidosService,
        public helper: HelperService,
        private impressora: ImpressoraService,
        private router: Router) { }

    ngOnInit() {
        this.order = this.orderService.orderToFinalize;
        this.form.controls.paymentMethod.valueChanges.subscribe(name => this.selectMethod(name));

        this.form.get('paymentValue').setValue(this.order.total)
        if (this.order.client) {
            this.paymentOptions.push({ id: 4, name: 'Conta cliente', icon: 'fa-wallet', clientAccount: true });
        }

    }

    get change() {
        return this.form.controls.change.value;
    }

    get received() {
        return this.form.controls.paymentValue.value;
    }

    get missing() {
        return this.form.controls.missingPayment.value;
    }

    get paymentMethod() {
        return this.form.controls.paymentMethod;
    }

    get discountLimit() {
       return Number(this.order.total) * 0.14;
    }

    public selectMethod(id: any) {
        this.form.controls.paymentValue.setValue(0);
        this.paymentOptionChose = this.paymentOptions.find((opt: any) => {
            if(Number(opt.id ) === id) {
                return opt;
            }
        });
        
        if (!this.paymentOptionChose.showCalc) {
            let value = this.order.total;
            if (this.paymentOptionChose.clientAccount) {
                value = 0;
            }
            this.form.controls.paymentValue.setValue(value);
        }
    }
    calc() {
       let discount = Number(this.form.get('discount_amount').value);
        if(discount > this.discountLimit+0.01) {
            this.form.get('discount_amount').setValue(this.discountLimit);
            this.form.get('discount_amount').setErrors({limit: true});
        } else {
            this.form.get('discount_amount').setErrors(null);
           
        }

        this.order.discount_amount = Number(this.form.get('discount_amount').value);
    }


    finalize() {
        this.order.status = 2;
        this.order.form_payment = this.paymentOptions.find(e => e.id == this.paymentMethod.value).name;

        this.orderService.changeStatus(this.order).subscribe((order: any) => {
       
            if (order) {

                this.helper.toast('Pedido finalizado!');
                this.modalCtrl.dismiss();
                this.orderService.orderToFinalize = order;
                if (this.orderService.ne) {
                    this.router.navigate(['/pedidos']);
                }
                if (this.impressora.printer_options) {
                   
                        this.impressora.printer(order);
                   
                }
            }
        }, (error: HttpErrorResponse) => this.orderService.handleError(error));
    }
}
