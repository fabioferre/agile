import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'name', 'category', 'unity'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

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

}


const ELEMENT_DATA: any[]= [
  { id: 1, image: '', name: 'Hydrogen',category: '', unity: '' },
  { id: 1, image: '', name: 'Hydrogen',category: '', unity: '' },
  { id: 1, image: '', name: 'Hydrogen',category: '', unity: '' },
];