import { LojasService } from './../lojas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

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

  constructor(private lojasService: LojasService,
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

      this.router.navigate(['/lojas/editar']);
  }

}
