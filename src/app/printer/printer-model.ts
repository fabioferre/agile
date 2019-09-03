
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../service/helper.service';


export class PrinterModel {

    public copy = 1;
    public sum = 0;
    public total = 0;
    public esc = '\x1B';
    public cmds = "";
    public pages = "";
    constructor(    protected http: HttpClient,
        protected helper: HelperService) { 
        this.copy = 1;
        this.sum = 0;
        this.total = 0;
        this.esc = '\x1B';
        this.cmds = "";
        this.addCmd(this.esc + "@"); //espaçamento entre as linhas
        this.newLine(2);
        this.addCmd('\x1b\x33'); //espaçamento entre as linhas
        this.configDate();

    }


    addCmd(parans) {
        this.cmds += parans;
        return this;
    }

    newLine(numberLine?) {
        if (numberLine === undefined) { numberLine = 1; }
        for (var i = 0; i <= numberLine; i++) {
            this.cmds += '\x0A'

        }
        return this;

    }

    async configDate() {
        var date: any = new Date();
        this.newLine(1);
        date = await date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "  " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ":" + date.getSeconds();
        this.align('center')
        this.addCmd(date)
        this.newLine(1);
    }

    setFontSize(value) {
        if (!value) { value = 0; }
        var fonts = Array();
        fonts[0] = "\x00";
        fonts[1] = "\x01";
        fonts[2] = "\x02";
        fonts[3] = "\x03";
        fonts[4] = "\x04";
        fonts[5] = "\x05";
        fonts[6] = "\x06";
        fonts[7] = "\x07";
        fonts[10] = "\x10";
        fonts[12] = "\x12";
        fonts[14] = "\x14";
        fonts[16] = "\x16";
        fonts[18] = "\x18";
        fonts[20] = "\x20";
        fonts[30] = "\x30";
        fonts[38] = "\x38";
        return this.addCmd(this.esc + '!' + fonts[value]);

    }

    quote(text) {
        if (text) {
            text = text.toLowerCase();
            text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
            text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
            text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
            text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
            text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
            text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        }
        return text;
    }
    execute(dados) {

        dados.cmds = this.cmds;
        console.log(this.http)
        this.http.post(`${dados.url}/printer`, dados).subscribe(sucess => {
            console.log(sucess)
        }, err => {
            console.log(err)
        });
    }

    cut(value) {
        let data = '\x41\x03';

        if (value == 'partial') {
            data = '\x01';
        }
        this.cmds += '\x1d\x56' + data;

        return this;
    }

    underline(value) {

        if (value) {
            this.cmds += '\x1b\x2d\x02';
        } else {
            this.cmds += '\x1b\x2d\x00';
        }

        return this;
    }

    bold(value) {

        if (value) {
            this.cmds += '\x1b\x45\x01';
        } else {
            this.cmds += '\x1b\x45\x00';
        }

        return this;
    }

    align(value) {
        const alignments = {
            'left': '\x00',
            'center': '\x01',
            'right': '\x02',
        };


        if (value in alignments) {
            this.cmds += '\x1b\x61' + alignments[value];
        }

        return this;
    }

    reset() {
        this.pages = this.cmds;
        this.cmds = '\x1b\x40';
        this.copy = 1;
        this.sum = 0;
        this.total = 0;
        this.addCmd(this.esc + "@"); //espaçamento entre as linhas
        this.newLine(2);
        this.addCmd('\x1b\x33'); //espaçamento entre as linhas
        this.configDate();
        return this;
    }

    setFreight(freight) {
        if (freight) {
            freight = parseFloat(freight);
            this.total += freight;
            this.addCmd("FRETE: R$ " + freight).newLine();
        }
        return this;
    }

    calcRateService(rateService) {
        if (rateService) {
            var porcent = this.sum * rateService;
            porcent = porcent / 100;
            this.addCmd("TAX " + rateService + "%  R$" + parseFloat(porcent.toFixed(2)));
            this.total += porcent;
        }
        this.newLine();
        return this;
    }

    resume(req) {
        let change = req.change ? req.change : 0.00;
        this.addCmd("FORMA DE PAGAMENTO: " + req.form_payment)
            .newLine().addCmd("TROCO: " + change).newLine()
        this.addCmd("SUBTOTAL: R$ " + this.sum).newLine()
            .setFreight(req.freight)
            .calcRateService(req.printer_options.rate_service)
            .addCmd("TOTAL: R$" + parseFloat(this.total.toFixed(2)))
            .newLine(2)
            .newLine().addCmd("----------------------").newLine()
        return this;
    }





}
