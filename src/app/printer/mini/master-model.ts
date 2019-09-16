import { PrinterModel } from "../printer-model"
import { HttpClient } from '@angular/common/http';
export class  MiniMasterModel extends PrinterModel {


    constructor(protected http: HttpClient){
        super(http)
    }

    headers(options) {
        this.copy = options.copy_master;
        this.align('center')
        this.setFontSize(38);
        this.addCmd(this.quote(options.company_name));
        this.setFontSize(0);
        this.newLine().addCmd("cnpj: " + options.company_cnpj);
        this.newLine().addCmd("contato: " + options.company_phone);
        this.newLine(1);
        this.align('left')
        return this;
    };

    setProducts(products) {
 
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            var tot = product.quantity * product.price;
            this.sum += tot;
            let custom =  product.product_name.split("1/2")
            if (custom[1]) {
                for (let index = 0; index < custom.length; index++) {
                    if(custom[index]){ 
                        this.addCmd("1/2 " + this.quote(custom[index]))
                        .newLine()
                        }
                }

            } else {
                this.addCmd(this.quote(product.product_name))
            }
            this.newLine()
            this.addCmd("R$ " + product.price + "  " + product.quantity + "x  =  R$ " + tot);
                if(product.obs){
                    this.newLine().addCmd("obs: "+this.quote(product.obs));
                }
                
                this.newLine();
        }


        this.total += this.sum;

        return this;
    };


    footer(req) {
        this.resumeMini(req)
            this.setFontSize(38);
            this.newLine().addCmd(("Pedido: " + req.order).toUpperCase());
            this.setFontSize(0)
    }

    build(req) {
        this.headers(req.printer_options)
            .setProducts(req.products)
            .footer(req);
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