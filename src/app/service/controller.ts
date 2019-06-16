import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AlertController } from '@ionic/angular';

export class Controller {
    public displayedColumns: string[];;
    public dataSource = new MatTableDataSource<any>([]);
    constructor(public alertCtrl:AlertController){

    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    async alertDelete(element) {
        const alert = await this.alertCtrl.create({
            header: 'Tem certeza?',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {

                    }
                },
                {
                    text: 'Deletar',
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
