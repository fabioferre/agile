import { Component, OnInit } from '@angular/core';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

@Component({
  selector: 'app-impressora',
  templateUrl: './impressora.component.html',
  styleUrls: ['./impressora.component.scss'],
})
export class ImpressoraComponent implements OnInit {

  constructor(private printer: Printer) { }

  ngOnInit() { }

  print() {
    this.printer.isAvailable().then(onSuccess=>{
      console.log(onSuccess)
    }, onError=>{
      console.log(onError)
    });

    let options: PrintOptions = {
      name: 'MyDocument',
      printerId: 'printer007',
      duplex: true,
      landscape: true,
      grayscale: true
    }

    this.printer.print("estou vivo", options).then(onSuccess=>{
      console.log(onSuccess)
    }, onError=>{
      console.log(onError)
    });
  }



}
