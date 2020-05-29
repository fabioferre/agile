import { Controller } from 'src/app/service/controller';
import { AuthService } from './../../../service/auth.service';
import { FuncionariosService } from './../funcionarios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HelperService } from 'src/app/service/helper.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.scss'],
})
export class ListarFuncionarioComponent extends Controller implements OnInit {

  displayedColumns: string[] = ['name', 'cellphone', 'occupation', 'cpf', 'store', 'action'];
  dataSource = new MatTableDataSource<any>(this.funcionariosService.funcionarios);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private helper: HelperService,
    private auth: AuthService,
    public alertCtrl: AlertController,
    private funcionariosService: FuncionariosService,
    private router: Router) { super(alertCtrl) }

  ngOnInit() {
  }

  public delete(element): void {

    this.funcionariosService.deleteById(element.id).subscribe(response=>{
      const idx = this.funcionariosService.funcionarios.indexOf(element)
      this.funcionariosService.funcionarios.splice(idx , 1);
      this.dataSource.data  = this.funcionariosService.funcionarios;
      this.dataSource._updateChangeSubscription();
       
    });

  }


  public edit(req): void {
    this.funcionariosService.funcionarioEdit = req;
    this.router.navigate(['/funcionarios/editar', req]);
  }

  async permissions(id) {

    const alert = await this.alertCtrl.create({
      header: 'Nova senha',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Senha'

        },
        {
          name: 'password_confirmation',
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
          handler: (passwords) => {
            if (passwords) {

              passwords.id = id
              this.updatePassword(passwords)
            } else {

            }
          }
        }
      ]
    });

    return await alert.present();
  }

  updatePassword(credential) {
    this.auth.updatePassword(credential).subscribe(response => {
      this.helper.message(response)
    })
  }


}
