import { FuncionariosService } from './../funcionarios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.scss'],
})
export class ListarFuncionarioComponent implements OnInit {

  displayedColumns: string[] = ['name', 'cellphone', 'occupation', 'cpf', 'store', 'action'];
  dataSource = new MatTableDataSource<any>(this.funcionariosService.funcionarios);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private funcionariosService: FuncionariosService ,
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
    this.funcionariosService.funcionarioEdit = req;
      this.router.navigate(['/funcionarios/editar', req]);
  }

}
