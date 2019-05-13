import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {

  displayedColumns: string[] = ['id', 'created_at', 'name'];
  dataSource = new MatTableDataSource<any>(this.categoriasService.categories);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public categoriasService: CategoriasService,
    private router: Router,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
    if (!this.categoriasService.categories) {
      this.categoriasService.get().subscribe(categories => {
        this.categoriasService.categories = categories;

      })
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public delete(): void {

  }

  public edit(product): void {

    this.router.navigate(['/produtos/editar']);
  }

  async alertCreate() {
    const alert = await this.alertCtrl.create({
      header: "Cadastrar categoria",
      inputs: [{
        name: "name", type: "text",  placeholder: 'Nome da categoria'
      }],
      buttons: [{
        text: "Cadastrar",
        cssClass: "secondary",
        handler: (data) => {
          if (!data) {
            return false;
          } else {
            this.create(data);
           
          }
        }
      }]
    })

    return await alert.present();
  }

  create(data){
    this.categoriasService.create(data).subscribe(categories => {
      this.categoriasService.categories = categories;

    })
  }



}
