import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-listar-cliente',
    templateUrl: './listar-cliente.component.html',
    styleUrls: ['./listar-cliente.component.scss'],
})
export class ListarClienteComponent implements OnInit {
    displayedColumns: string[] = ['name', 'cell_phone', 'address_street', 'amount', 'action'];
    dataSource = new MatTableDataSource<any>(this.clientService.clientes);

    @ViewChild(MatSort) sort: MatSort;

    constructor(private clientService: ClientesService,
        private router: Router,
        public navCtrl: NavController) { }

    ngOnInit() {
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

    }

    public delete(): void {

    }

    public edit(req): void {
        this.clientService.clientToEdit = req;
        this.router.navigate(['/clientes/editar']);
    }

    public show(req): void {
        this.router.navigate(['/clientes/show', req.id]);
    }



}
