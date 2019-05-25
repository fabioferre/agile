import { ClientesService } from './../clientes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-show-cliente',
  templateUrl: './show-cliente.component.html',
  styleUrls: ['./show-cliente.component.scss'],
})
export class ShowClienteComponent implements OnInit {
  public orders;
  constructor(public clientesService : ClientesService,
            private activedRoute: ActivatedRoute,) { }

  ngOnInit() {
    if (!this.clientesService.clientToShow ) {
      this.clientesService.getById(this.activedRoute.snapshot.paramMap.get('id')).subscribe((client) => {
        this.clientesService.clientToShow = client;
      });
    }

      this.clientesService.getSum(this.activedRoute.snapshot.paramMap.get('id')).subscribe((orders) => {
        this.orders = orders;
   
      });
 
  }
}
