import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriasService } from '../categorias.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/service/helper.service';
import { Controller } from 'src/app/service/controller';
import { ModalNecategoryComponent } from './modal-necategory/modal-necategory.component';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.component.html',
    styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent extends Controller implements OnInit {
    public displayedColumns: string[] = ['created_at', 'name', 'action'];
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public categoriasService: CategoriasService,
        private router: Router,
        public alertCtrl: AlertController,
        private modalCtrl: ModalController,
        public helper: HelperService
    ) { super(alertCtrl); }

    ngOnInit() {
        this.dataSource.sort = this.sort;
        if (this.categoriasService.categories.length < 1) {
            this.categoriasService.get().subscribe(categories => {
                this.categoriasService.categories = categories;
                this.updateDataTable(categories);
            });
        } else {
            this.updateDataTable(this.categoriasService.categories);
        }
    }


    async modalNe(category?) {

        if (category) {
            this.categoriasService.activeNE(category);
        } else {
            this.categoriasService.activeNE();
        }

        const modal = await this.modalCtrl.create({
            component: ModalNecategoryComponent,
            cssClass: 'sm responsive'
        });

        return await modal.present();
    }

    public delete(category): void {
        this.categoriasService.deleteById(category.id).subscribe(response => {
            const idx = this.categoriasService.categories.indexOf(category);
            this.categoriasService.categories.splice(idx, 1);
            this.dataSource._updateChangeSubscription();
        });
    }

    private create(data) {
        this.categoriasService.create(data).subscribe(categories => {
            this.categoriasService.categories.push(categories);
            this.dataSource._updateChangeSubscription();
        });
    }


    async alertCreate() {
        const alert = await this.alertCtrl.create({
            header: 'Cadastrar categoria',
            inputs: [{
                name: 'name', type: 'text', placeholder: 'Nome da categoria'
            }],
            buttons: [{
                text: 'Cadastrar',
                cssClass: 'secondary',
                handler: (data) => {
                    if (!data) {
                        return false;
                    } else {
                        this.create(data);

                    }
                }
            }]
        });

        return await alert.present();
    }

    private edit(category): void {
        this.categoriasService.updateById(category.id, category).subscribe(response => {
            const idx = this.categoriasService.categories.indexOf(category);
            this.categoriasService.categories[idx] = response;
            this.helper.message('Categoria atualizada!');
            this.dataSource._updateChangeSubscription();
        });
    }
    async alertEditar(category) {
        const alert = await this.alertCtrl.create({
            header: 'Editar categoria',
            inputs: [{
                name: 'name', type: 'text', placeholder: 'Nome da categoria', value: category.name
            }],
            buttons: [{
                text: 'Atualizar',
                cssClass: 'secondary',
                handler: (data) => {
                    if (!data) {
                        return false;
                    } else {
                        console.log(data);
                        category.name = data.name;
                        this.edit(category);
                    }
                }
            }]
        });

        return await alert.present();
    }




}
