import { LojasService } from './../lojas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-listar-lojas',
    templateUrl: './listar-lojas.component.html',
    styleUrls: ['./listar-lojas.component.scss'],
})
export class ListarLojasComponent implements OnInit {

    displayedColumns: string[] = ['name', 'phone', 'cellphone', 'address_neighborhood', 'address_street', 'action'];
    dataSource = new MatTableDataSource<any>(this.lojasService.lojas);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private lojasService: LojasService,
        private router: Router,
        public auth: AuthService
    ) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public useStore(store, idx?) {

        this.auth.user.using_another_store = true;
        this.auth.user.another_store = store;
        this.auth.user.store_id = store.id;
        if (this.auth.store.id == store.id) {
            this.auth.user.store_id = store.id;
            this.auth.user.using_another_store = false;
        } 
   
        this.auth.storage.set('user', this.auth.user);
    }

    public delete(): void {

    }

    public edit(req): void {
        this.lojasService.lojaEdit = req;
        this.router.navigate(['/lojas/editar']);
    }

}
