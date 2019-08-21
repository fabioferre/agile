import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidosService } from '../../pedidos.service';
import { HelperService } from 'src/app/service/helper.service';
import { ImpressoraService } from 'src/app/pages/sistema/impressora.service';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
=======
>>>>>>> beta

@Component({
    selector: 'app-modal-payment',
    templateUrl: './modal-payment.component.html',
    styleUrls: ['./modal-payment.component.scss'],
})
export class ModalPaymentComponent implements OnInit {
    public paymentOptions: any = [
<<<<<<< HEAD
        {  name: 'Cartão Debito / Crédito', icon: 'fa-credit-card' },
        {  name: 'Vaucher', icon: 'fa-money-check' },
        {  name: 'Dinheiro', icon: 'fa-money-bill-wave' },
=======
        { showCalc: false, name: 'Cartão Debito / Crédito', icon: 'fa-credit-card' },
        { showCalc: false, name: 'Vaucher', icon: 'fa-money-check' },
        { showCalc: true, name: 'Dinheiro', icon: 'fa-money-bill-wave' },
>>>>>>> beta
    ];

    public form: FormGroup = this.fb.group({
        paymentMethod: ['', Validators.required],
<<<<<<< HEAD
        paymentValue: ['', Validators.required],
=======
        paymentValue: [''],
>>>>>>> beta
        change: [0],
        missingPayment: [0]
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
<<<<<<< HEAD
        this.form.controls.paymentMethod.valueChanges.subscribe(name => this.selectMethod(name));
        if (this.order.client) {
            this.paymentOptions.push({ name: 'Conta cliente', icon: 'fa-wallet', clientAccount: true });
=======
        console.log(this.order);
        this.form.controls.paymentMethod.valueChanges.subscribe(name => this.selectMethod(name));
        if (this.order.client) {
            this.paymentOptions.push({ showCalc: true, name: 'Conta cliente', icon: 'fa-wallet', clientAccount: true });
>>>>>>> beta
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

    public selectMethod(name: any) {
        this.form.controls.paymentValue.setValue(0);
        this.paymentOptionChose = this.paymentOptions.find((opt: any) => opt.name.toLowerCase().includes(name.toString().toLowerCase()));
        if (!this.paymentOptionChose.showCalc) {
            let value = this.order.total;
            if (this.paymentOptionChose.clientAccount) {
                value = 0;
            }
            this.form.controls.paymentValue.setValue(value);
        }
<<<<<<< HEAD
=======
        console.log(this.paymentOptionChose);
>>>>>>> beta
    }

    public calcChange() {
        let change: any = this.form.value.paymentValue - parseFloat(this.order.total);
        if (change < 0) {
            this.form.controls.missingPayment.setValue(Math.abs(change));
<<<<<<< HEAD
=======
            console.log(Math.abs(change));
>>>>>>> beta
            change = 0;
        } else {
            this.form.controls.missingPayment.setValue(0);
        }
        this.form.controls.change.setValue(change);
    }

    finalize() {
        this.order.status = 2;
<<<<<<< HEAD
        this.order.form_payment = this.paymentMethod.value;
        this.order.change = this.change;
        this.orderService.changeStatus(this.order).subscribe((order: any ) => {
            console.log(order)
            if (order) {
                
                this.helper.toast('Pedido finalizado!');
                this.modalCtrl.dismiss();
                this.orderService.orderToFinalize = order;
                if (this.orderService.ne) {
                    this.router.navigate(['/pedidos']);
                }
                if (this.impressora.printer_options) {
                    if (this.impressora.printer_options.close) {
                        this.impressora.printer(order);
                    }
                }
            }
        }, (error: HttpErrorResponse) => this.orderService.handleError(error));
=======
        this.order.form_payment = this.paymentMethod;
        this.order.change = this.change;
        this.orderService.changeStatus(this.order).subscribe(order => {
            this.helper.toast('Pedido finalizado!');
            this.router.navigate(['/pedidos']);
            if (this.impressora.printer_options.close) {
                this.impressora.printer(order);
            }
        });
>>>>>>> beta
    }
}
