import { FuncionariosService } from './../funcionarios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.scss'],
})
export class ListarFuncionarioComponent implements OnInit {

  displayedColumns: string[] = ['name', 'cellphone', 'occupation', 'cpf', 'store', 'action'];
  dataSource = new MatTableDataSource<any>(this.funcionariosService.funcionarios);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alertCtrl : AlertController,
    private funcionariosService: FuncionariosService,
    private router: Router) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public delete(element): void {

  }

  public edit(req): void {
    this.funcionariosService.funcionarioEdit = req;
    this.router.navigate(['/funcionarios/editar', req]);
  }

  async permissions(req) {


    const alert = await this.alertCtrl.create({
      header: 'Nova senha',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Senha'
         
        },
        {
          name: 'password_confirmed',
          type: 'password',
          placeholder: 'Confirme a senha'
        },

      ],
      buttons: [
        {
          text: 'cancelar',
          handler: () => {

          }
        },
        {
          text: 'Alterar',
          cssClass: 'success',
          handler: (role) => {
            if (role) {

            } else {

            }
          }
        }
      ]
    });

    return await alert.present();
  }


}
