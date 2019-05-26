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
  public orders;
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

  async deposit() {

    const alert = await this.alertCtrl.create({
      header: 'Deposito',
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
          text: 'Depositar',
          cssClass: 'success',
          handler: (option) => {
            if (option) {
              console.log(this.clientesService.clientToShow)
            }
          }
        }
      ]
    });

    return await alert.present();
  }

  async withdrawal() {

    const alert = await this.alertCtrl.create({
      header: 'Retirar valor da conta',
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
          text: 'Retirar',
          cssClass: 'success',
          handler: (option) => {
            if (option) {
              console.log(this.clientesService.clientToShow)
            }
          }
        }
      ]
    });

    return await alert.present();
  }
}
