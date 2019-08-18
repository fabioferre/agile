import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AlertController } from '@ionic/angular';

export class Controller {
    public displayedColumns: string[];
    public dataSource = new MatTableDataSource<any>([]);
    public selection: any;
    constructor(public alertCtrl: AlertController) {

    }

    public applyFilter(filterValue: string) {
        // console.log(this.dataSource)
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
     /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;

        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }



    public updateDataTable(data) {
        this.dataSource.data = data;
        this.dataSource._updateChangeSubscription();
    }

    async alertDelete(element) {
        const alert = await this.alertCtrl.create({
            header: 'Tem certeza?',
            buttons: [
                {
                    text: 'Não',
                    handler: () => {

                    }
                },
                {
                    text: 'Sim',
                    cssClass: 'danger',
                    handler: () => {

                        this.delete(element);

                    }
                }
            ]
        });

        return await alert.present();
    }

    delete(product?) {

    }


}
