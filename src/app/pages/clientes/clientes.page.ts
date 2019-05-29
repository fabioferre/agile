import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { HelperService } from 'src/app/service/helper.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  constructor(public clietes: ClientesService) { }

  ngOnInit() {

  }

}
