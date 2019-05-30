import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss'],
})
export class PerfilClienteComponent implements OnInit {

  constructor(public clientesService : ClientesService,) { }

  ngOnInit() {}

}
