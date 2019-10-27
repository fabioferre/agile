import { PrinterModel } from "./printer-model"
import { HttpClient } from '@angular/common/http';
export class  MasterModel extends PrinterModel {


    constructor(protected http: HttpClient){
        super(http)
    }

    headers(options) {
        this.copy = options.copy_master;
        this.align('center')
        this.configDate();
        this.setFontSize(38);
        this.addCmd(this.quote(options.company_name));
        this.setFontSize(0);
        this.newLine().addCmd("cnpj: " + options.company_cnpj);
        this.newLine().addCmd("contato: " + options.company_phone);
        this.newLine();
        this.addCmd("==========================");
        this.newLine();
        this.align('left')
        return this;
    };

    setProducts(products) {
        this.newLine();

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
                .addCmd("R$ " + product.price + "  " + product.quantity + "x  =  R$ " + tot);
                if(product.obs){
                    this.newLine().addCmd("obs: "+this.quote(product.obs));
                }
                
                this.newLine().addCmd("----------------------").newLine()
        }


        this.total += this.sum;

        return this;
    };


    footer(req) {
        this.resume(req)
            this.setFontSize(38);
            this.newLine(1).addCmd(("Pedido: " + req.order).toUpperCase()).newLine(1);
            this.setFontSize(0)
            this.newLine(3)
            .cut('full');
    }

    build(req) {
        this.headers(req.printer_options)
            .setProducts(req.products)
            .footer(req);
        return this;
    }




}