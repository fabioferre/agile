import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../clientes.service';
import { NavController } from '@ionic/angular';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-listar-cliente',
    templateUrl: './listar-cliente.component.html',
    styleUrls: ['./listar-cliente.component.scss'],
})
export class ListarClienteComponent implements OnInit {
    public clients = [];
    displayedColumns: string[] = ['name', 'cellphone', 'address_street', 'amount', 'action'];
    dataSource = new MatTableDataSource<any>(this.clients);

    @ViewChild(MatSort) sort: MatSort;


    public form: FormGroup = this.fb.group({
        amount: ['']
    });
    constructor(
        private clientService: ClientesService,
        private router: Router,
        public navCtrl: NavController,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.dataSource.sort = this.sort;


        this.form.get('amount').valueChanges.subscribe((val) => {
            this.dataSource.data = this.clients;
            if (val) {
                this.dataSource.data = this.clients.filter((c) => Number(c.amount) < 0)
            }
            this.dataSource._updateChangeSubscription()
        })

        this.clientService.get().subscribe(clientes => {
            this.clients = clientes;
            this.dataSource.data = this.clients;
            this.dataSource._updateChangeSubscription();
        });

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
