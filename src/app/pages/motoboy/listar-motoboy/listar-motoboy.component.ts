import { MotoboyService } from './../motoboy.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-listar-motoboy',
  templateUrl: './listar-motoboy.component.html',
  styleUrls: ['./listar-motoboy.component.scss'],
})
export class ListarMotoboyComponent implements OnInit {
  displayedColumns: string[] = ['name', 'cellphone', 'phone', 'cpf', 'address_neighborhood', 'action'];
  dataSource = new MatTableDataSource<any>(this.motoboyService.motoboy);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private motoboyService:MotoboyService,
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


  public update(idx, {checked}) {
    this.dataSource.data[idx].status = checked? 1: 2;
    this.motoboyService.updateById(this.dataSource.data[idx].id,  this.dataSource.data[idx], {method: 'put', noLoad: true}).subscribe((response) => {
      this.dataSource._updateChangeSubscription() 
    });
  }
  public edit(req): void {
    this.motoboyService.motoboyEdit = req;
      this.router.navigate(['/motoboy/editar',req]);
  }

}
