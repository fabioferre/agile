import { BairrosService } from './../bairros.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-bairros',
  templateUrl: './listar-bairros.component.html',
  styleUrls: ['./listar-bairros.component.scss'],
})
export class ListarBairrosComponent implements OnInit {

  displayedColumns: string[] = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bairrosService: BairrosService,
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

      this.router.navigate(['/bairros/editar']);
  }

}
