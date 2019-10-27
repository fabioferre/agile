import { PrinterModel } from "./printer-model"
import { HttpClient } from '@angular/common/http';

export class  PrepareModel extends PrinterModel {


constructor(protected http: HttpClient){
    super(http)
}

headers(req) {
    this.copy = req.printer_options.copy_prepare;
    this.align('center')
    this.configDate();
    this.setFontSize(38);
    this.addCmd('Preparo'.toUpperCase());
    this.newLine().addCmd(("Pedido: " + req.order).toUpperCase()).newLine();
    this.setFontSize(0);

    if ( req.type == 2) {
        this.addCmd('ENTREGA').newLine();
    }else{
        this.addCmd('BALCAO').newLine();
    }
    this.align('left')

   
    return this;
}

setProducts(products) {
    this.newLine();
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

        this.newLine().addCmd("----------------------").newLine();

    }
    this.total += this.sum;
    return this;
}

footer() {
    this.newLine(2)
    this.newLine().addCmd("----------------------");

    return this;
}

build(req) {
    this.headers(req)
        .setFontSize(req.printer_options.font_size)
        .setProducts(req.products)
        .setFontSize(0)
        .footer()
        .cut('full');
    return this;
}


}
