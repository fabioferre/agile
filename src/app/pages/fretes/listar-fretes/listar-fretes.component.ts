import { FretesService } from './../fretes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HelperService } from 'src/app/service/helper.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-fretes',
  templateUrl: './listar-fretes.component.html',
  styleUrls: ['./listar-fretes.component.scss'],
})
export class ListarFretesComponent implements OnInit {

  public displayedColumns: string[] = ['created_at','neighborhood', 'freight',  'action'];
  public dataSource = new MatTableDataSource<any>(this.fretesService.fretes);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
      private router: Router,
      private alertCtrl: AlertController,
      private helper: HelperService,
      public fretesService:FretesService
  ) { }

  ngOnInit() {
    this.fretesService.get().subscribe(fretes => {
      this.fretesService.fretes = fretes;
      this.dataSource.data = this.fretesService.fretes;
      this.dataSource._updateChangeSubscription();
  });
      this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
      }
  }

  async alertDelete(bairro) {
    const alert = await this.alertCtrl.create({
        header: 'Tem certeza?',
        buttons: [
            {
                text: 'cancelar',
                handler: () => {

                }
            },
            {
                text: 'Deletar',
                cssClass: 'danger',
                handler: () => {
                    this.delete(bairro);
                }
            }
        ]
    });
    return await alert.present()
}


  public delete(frete): void {
      this.fretesService.deleteById(frete.id).subscribe(response => {
          this.fretesService.fretes.splice(this.fretesService.fretes.indexOf(frete), 1);
          this.dataSource.data = this.fretesService.fretes;
          this.dataSource._updateChangeSubscription();

      });
  }

  public edit(element): void {
      this.fretesService.activeNE(element) ;
      this.router.navigate(['/fretes/ne']);
  }

}
