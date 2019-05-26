import { ClientesService } from './../clientes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-show-cliente',
  templateUrl: './show-cliente.component.html',
  styleUrls: ['./show-cliente.component.scss'],
})
export class ShowClienteComponent implements OnInit {
  public orders ;
  public form = {'type': 0, 'amount': '', 'name': ''};
  constructor(public clientesService: ClientesService,
    private activedRoute: ActivatedRoute,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    if (!this.clientesService.clientToShow) {
      this.clientesService.getById(this.activedRoute.snapshot.paramMap.get('id')).subscribe((client) => {
        this.clientesService.clientToShow = client;
      });
    }

    this.clientesService.getSum(this.activedRoute.snapshot.paramMap.get('id')).subscribe((orders) => {
      this.orders = orders;

    });

  }

  async showOption(type) {
    this.form.type = type;
    let title = "";
    let button ="";
    if (type == 1) {
      title = "Deposito na conta";
      button ="Depositar";
      this.form.name = "pagamento"
    } else {
      title = "Retirada de valor";
      button ="Retirar";
      this.form.name = "retirada"
    }

    const alert = await this.alertCtrl.create({
      header: title,
      inputs: [
        {
          name: 'amount',
          type: 'text',
          label: 'Valor',
        }
      ],
      buttons: [
        {
          text: 'cancelar',
          handler: () => {

          }
        },
        {
          text: button,
          cssClass: 'success',
          handler: (option) => {
            if (option) {
              this.form.amount = option.amount;
              this.movement();
              console.log(option)
            }
          }
        }
      ]
    });

    return await alert.present();
  }


  movement() {
    this.clientesService.movement(this.clientesService.clientToShow.account.id, this.form).subscribe((response) => {
      console.log(response)

    });
  }


}
