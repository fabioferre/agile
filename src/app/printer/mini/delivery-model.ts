import { PrinterModel } from "../printer-model"
import { HttpClient } from '@angular/common/http';
export class MiniDeliveryModel extends PrinterModel {

    constructor(protected http: HttpClient){
        super(http)
    }

    headers(options, order) {
        this.copy = options.copy_delivery;
        this.setFontSize(38);
        this.addCmd('Entrega');
        this.newLine().addCmd("Pedido: " + order).newLine(1);
        this.setFontSize(0);
        return this;
    }

    setProducts(products) {
       
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            this.sum += product.quantity * product.price;
            let custom = product.product_name.split("1/2")
            this.addCmd(product.quantity + ' - ')

            if (custom[1]) {
                for (let index = 0; index < custom.length; index++) {
                    if (custom[index]) {
                        this.addCmd("1/2 " + this.quote(custom[index]))
                            .newLine().addCmd("    ")
                    }
                }

            } else {
                this.addCmd(this.quote(product.product_name))
            }

            if(product.obs){
                this.newLine().addCmd("obs: "+this.quote(product.obs));
            }

            this.newLine()


        }
        this.total += this.sum;
        return this;
    }


    footer(client, req) {
        if (client) {
            client.reference_point =  client.reference_point ? client.reference_point: "não informado"
            this.newLine()
                .addCmd("Nome: " + this.quote(client.name))
                .newLine()
                .addCmd("Contato: " + client.cellphone+"/"+client.phone)
                .newLine()
                .addCmd("Endereco: " + this.quote(client.address_street) + " N: " + client.address_number)
                .newLine()
                .addCmd("Bairro: " + this.quote(client.address_neighborhood))
                .newLine()
                .addCmd("Referencia: " + this.quote(client.reference_point))
                .newLine();
               
        }
        this.resumeMini(req)
        return this;

    }

    build(req) {
        this.headers(req.printer_options, req.order)
            .setProducts(req.products)
            .footer(req.client, req)
        return this;
    }

    resumeMini(req) {
        let change = req.change ? req.change : 0.00;
 
        this.setFreight(req.freight)
            .calcRateService(req.printer_options.rate_service)
            .addCmd("TOTAL: R$" + parseFloat(this.total.toFixed(2)))
            .newLine()
            .addCmd("PAGAMENTO : " + req.form_payment)
            .newLine().addCmd("TROCO: " + change).newLine()
        return this;
    }




}