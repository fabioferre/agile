import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export default class Controller {
    public displayedColumns: string[];;
    public dataSource = new MatTableDataSource<any>([]);
    
    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

}
