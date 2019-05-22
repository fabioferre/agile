import { MotoboyService } from './../motoboy.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-motoboy',
  templateUrl: './listar-motoboy.component.html',
  styleUrls: ['./listar-motoboy.component.scss'],
})
export class ListarMotoboyComponent implements OnInit {
  displayedColumns: string[] = ['name', 'cellphone', 'phone', 'cpf', 'address_neighborhood', 'action'];
  dataSource = new MatTableDataSource<any>(this.motoboyService.motoboy);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private motoboyService:MotoboyService,
    private router: Router) { }

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

  public delete(): void {

  }

  public edit(req): void {
    this.motoboyService.motoboyEdit = req;
      this.router.navigate(['/motoboy/editar',req]);
  }

}
