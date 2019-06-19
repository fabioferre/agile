import { Controller } from 'src/app/service/controller';
import { HelperService } from './../../../../service/helper.service';
import { PedidosService } from './../../../pedidos/pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ClientesService } from '../../clientes.service';
import { ModalController, AlertController } from '@ionic/angular';
import { StatementsModalComponent } from '../statements-modal/statements-modal.component';
import { ImpressoraService } from 'src/app/pages/sistema/impressora.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-statements-cliente',
  templateUrl: './statements-cliente.component.html',
  styleUrls: ['./statements-cliente.component.scss'],
})
export class StatementsClienteComponent extends Controller implements OnInit {
  displayedColumns: string[] = ['name', 'created_at', 'amount', 'action'];
  public statements;

  @ViewChild(MatSort) sort: MatSort;

  public form: FormGroup = this.fb.group({
    start: [this.helper.date(null, "-3 month")],
    end: [this.helper.date(), [Validators.required, Validators.minLength(2)]],

  });


  constructor(
    public alertCtrl: AlertController,
    private fb: FormBuilder,
    public clientesService: ClientesService,
    public pedidosService: PedidosService,
    public modalCtrl: ModalController,
    public impressora: ImpressoraService,
    public helper: HelperService) { super(alertCtrl) }

  ngOnInit() {
    console.log(this.helper.date(null, "30 day"))
    this.dataSource.sort = this.sort;
    this.impressora.getOptions().then(res => {
      this.impressora.printer_options = res;
    });

    this.getStatement();

  }


  getStatement() {

    this.clientesService.statement(this.clientesService.clientToShow.id, {
      filter: [
        ['created_at', '>=', this.form.value.start],
        ['created_at', '<=', this.form.value.end]
      ]
    }).subscribe((statement) => {
      this.updateDataTable(statement)

    });

  }

  async show(element) {
    let modal = await this.modalCtrl.create({
      component: StatementsModalComponent,
      componentProps: element
    });

    return await modal.present();

  }

  printer() {

    this.impressora.printerStatement(this.statements).subscribe(response => {
      if (response) {
        console.log(response)
        this.helper.message("Impressão efetuada !")

      }
    })

  }

}
