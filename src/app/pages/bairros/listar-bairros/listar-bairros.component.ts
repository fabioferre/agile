import { BairrosService } from './../bairros.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HelperService } from 'src/app/service/helper.service';

@Component({
    selector: 'app-listar-bairros',
    templateUrl: './listar-bairros.component.html',
    styleUrls: ['./listar-bairros.component.scss'],
})
export class ListarBairrosComponent implements OnInit {

    public displayedColumns: string[] = ['name', 'frete', 'city', 'state', 'region', 'action'];
    public dataSource = new MatTableDataSource<any>(this.nbService.bairros);

    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public nbService: BairrosService,
        private router: Router,
        private alertCtrl: AlertController,
        private helper: HelperService
    ) { }

    ngOnInit() {

        if (!this.nbService.bairros) {
            this.nbService.get().subscribe(bairros => {
                this.nbService.bairros = bairros;
                this.dataSource.data = bairros;
                this.dataSource._updateChangeSubscription()
                this.dataSource.sort = this.sort;
            });
        } 
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

    public delete(bairro): void {
        this.nbService.deleteById(bairro.id).subscribe(response => {
            this.nbService.bairros.splice(this.nbService.bairros.indexOf(bairro), 1);
            this.dataSource.data = this.nbService.bairros;
            this.dataSource._updateChangeSubscription();

        });
    }

    public edit(element): void {
        this.nbService.bairroToEdit = element;
        this.router.navigate(['/bairros/editar']);
    }

}
