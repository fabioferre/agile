import { Component, OnInit } from '@angular/core';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-impressora',
  templateUrl: './impressora.component.html',
  styleUrls: ['./impressora.component.scss'],
})
export class ImpressoraComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    number: [''],
    category_id: [''],
    weight: [''],
    cost_price: [''],
    sale_price: [''],
    units: [1],
    code: [''],
    description: [''],
    sale: [true],
    stock: [true]
});

  constructor(private printer: Printer,
    private fb: FormBuilder,
    private helper: HelperService,
    private router: Router) { }

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
