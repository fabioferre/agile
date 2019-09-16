import { PrinterModel } from "../printer-model"
import { HttpClient } from '@angular/common/http';

export class  MiniPrepareModel extends PrinterModel {


constructor(protected http: HttpClient){
    super(http)
}

headers(options, order) {
    this.copy = options.copy_prepare;
    this.setFontSize(38);
    this.addCmd('Preparo'.toUpperCase());
    this.newLine(1).addCmd(("Pedido: " + order).toUpperCase()).newLine(1);
    this.setFontSize(0);
    return this;
}

setProducts(products) {
 
    for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
        var product = products_1[_i];
        let custom: any =  product.product_name.split("1/2")
        this.addCmd(product.quantity + ' - ')
        
        if(custom[1]){
            
            for (let index = 0; index < custom.length; index++) {
                if(custom[index]){ 
                this.addCmd("1/2 " + this.quote(custom[index]))
                .newLine().addCmd("    ")
                }
      
            }

        }else{
            this.addCmd(this.quote(product.product_name))
        }
        if(product.obs){
            this.newLine().addCmd("obs: "+this.quote(product.obs));
        }
        this.newLine();
    }
    this.total += this.sum;
    return this;
}

footer() {
    this.setFontSize(0);
    return this;
}

build(req) {
    this.headers(req.printer_options, req.order)
        .setFontSize(req.printer_options.font_size)
        .setProducts(req.products)
        .footer();
    return this;
}


}
