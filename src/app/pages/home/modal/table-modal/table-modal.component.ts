import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MesasService } from 'src/app/pages/mesas/mesas.service';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss'],
})
export class TableModalComponent implements OnInit {

  constructor(
    public modalCtrl: ModalController, 
    private tableService: MesasService
  ) { }

  ngOnInit() {}

}
