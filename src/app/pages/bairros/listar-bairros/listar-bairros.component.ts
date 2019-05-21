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

  displayedColumns: string[] = ['name', 'frete', 'city', 'state', 'region', 'action'];
  dataSource = new MatTableDataSource<any>(this.bairrosService.bairros);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private bairrosService: BairrosService,
    private router: Router) { }

  ngOnInit() {
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
