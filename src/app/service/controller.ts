import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AlertController } from '@ionic/angular';

export class Controller {
    public displayedColumns: string[];;
    public dataSource = new MatTableDataSource<any>([]);
    constructor(public alertCtrl:AlertController){

    }

    public applyFilter(filterValue: string) {
        // console.log(this.dataSource)
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
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
        })

        return await alert.present();
    }

    delete(product?) {

    }


}
