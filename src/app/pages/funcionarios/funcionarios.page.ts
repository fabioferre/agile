import { FuncionariosService } from './funcionarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.page.html',
  styleUrls: ['./funcionarios.page.scss'],
})
export class FuncionariosPage implements OnInit {

  constructor(public funcionariosService: FuncionariosService) { }

  ngOnInit() {
    if (!this.funcionariosService.funcionarios) {
      this.funcionariosService.get().subscribe(funcionarios => {
          this.funcionariosService.funcionarios = funcionarios;
      });
  }
  }

}
