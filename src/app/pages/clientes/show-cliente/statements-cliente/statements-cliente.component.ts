import { HelperService } from './../../../../service/helper.service';
import { PedidosService } from './../../../pedidos/pedidos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ClientesService } from '../../clientes.service';
import { ModalController } from '@ionic/angular';
import { StatementsModalComponent } from '../statements-modal/statements-modal.component';
import { ImpressoraService } from 'src/app/pages/sistema/impressora.service';

@Component({
  selector: 'app-statements-cliente',
  templateUrl: './statements-cliente.component.html',
  styleUrls: ['./statements-cliente.component.scss'],
})
export class StatementsClienteComponent implements OnInit {
  displayedColumns: string[] = ['name', 'created_at', 'amount', 'action'];
  dataSource: any
  public statements;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public clientesService: ClientesService,
    public pedidosService: PedidosService,
    public modalCtrl: ModalController,
    public impressora: ImpressoraService,
    public helper: HelperService) { }

  ngOnInit() {
    this.impressora.getOptions().then(res => {
      this.impressora.printer_options = res;
    });

    this.clientesService.statement(this.clientesService.clientToShow.account.id).subscribe((statement) => {
      this.statements = statement;
      this.dataSource = new MatTableDataSource<any>(this.statements);
      console.log( this.statements)
      this.dataSource.sort = this.sort;
    });

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

 async show(element) {
    let modal = await this.modalCtrl.create({
      component: StatementsModalComponent,
      componentProps:element
    });

    return await modal.present();

  }

  printer(){
    
    this.impressora.printerStatement(this.statements).subscribe(response =>{
      if(response){
        console.log(response)
        this.helper.message("Impressão efetuada !")

      }
    })

  }

}
