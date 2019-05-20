import { BairrosService } from 'src/app/pages/bairros/bairros.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.scss'],
})
export class NovoClienteComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    cell_phone: [''],
    address_street: [''],
    address_zipcode: [''],
    address_city: [''],
    address_state: [''],
    address_complement: [1],
    reference_point: [''],
    neighborhood_id: [''],
    address_number: [null],
    category: [1]
});

  constructor(private fb: FormBuilder,
    private helper: HelperService,
    private router: Router,
    public bairroService: BairrosService,) { }

  ngOnInit() {

    if(!this.bairroService.bairros){
      this.bairroService.get().subscribe((bairros) => {
          this.bairroService.bairros = bairros;
      });
  } 
  }
saveClient(){
  
}
}
