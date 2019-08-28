import { Injectable } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { timeout } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    private apiURL = 'http://tagmus.com.br/api';
    // private apiURL = 'http://18.228.52.166/api';
    public today: string;
    public hours: string;
    public format: string;
    public order: any;
    public isLoading: boolean;
    public nextDay: Date;
    constructor(
        private toastCtrl: ToastController,
        private modalCtrl: ModalController,
    ) { }


    get url() {
        return this.apiURL;
    }

    message(message?, style?) {
        if (message.error) {
            for (const i in message.error.errors) {
                if (i) {
                    this.toast('Atenção: ' + message.error.errors[i], { color: 'danger' });
                }
            }
        } else {
            this.toast(message, { color: style });
        }
    }

    async toast(messageToShow, options: any = {}) {

        const toast = await this.toastCtrl.create(
            {
                message: messageToShow,
                position: options.position ? options.position : 'top',
                color: options.color ? options.color : 'success',
                duration: 3000,
                showCloseButton: true
            });

        toast.present();

    }

    async load(status?) {
        if (status === false) {
            this.isLoading = await false;
        } else {
            this.isLoading = await true;
            setTimeout(this.loadDismiss, 90000);

        }

    }

    async  loadDismiss() {
        this.isLoading = await false;
        // await this.loading.dismiss();
    }

    async modalDismiss(status?, then?) {
        if (status) {
            return await this.modalCtrl.dismiss(status);
        } else if (then) {
            this.modalCtrl.dismiss().then(() => {
                console.log(then);
            });
        }
        return await this.modalCtrl.dismiss();

    }

    formatDate(options: any) {

        const date = new Date();
        let year: any = date.getFullYear();
        let month: any = (1 + date.getMonth()).toString().padStart(2, '0');
        let day: any = date.getDate().toString().padStart(2, '0');

        if (options.add) {
            const more = options.add.split(' ');
            switch (more[1]) {
                case 'month':
                    month = Number(month) + Number(more[0]);
                    month = (month < 10 ? '0' : '') + month;
                    break;

                case 'day':
                    day = Number(day) + Number(more[0]);
                    day = (day < 10 ? '0' : '') + day;
                    break;

                case 'year':
                    year = Number(year) + Number(more[0]);
                    year = (year < 10 ? '0' : '') + year;
                    break;
            }

        }

        return `${year}-${month}-${day}`;

    }

    date(data?, more?, formatter?) {

        // const date = new Date();
        // let format;
        // if ((data) && (!formatter)) {
        //     format = new Date(data).toISOString();
        //     this.format = format.split('T')[0];
        //     const hours = date.getHours() + data;
        //     const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        //     this.hours = hours + ':' + min;
        // } else {
        //     if (formatter === '/') {
        //         data = data.split('-');
        //         return data = data[2] + '/' + data[1] + '/' + data[0];
        //     }
        //     if (formatter === '-') {
        //         data = data.split('/');
        //         return data = data[2] + '-' + data[1] + '-' + data[0];
        //     }
        //     format = new Date().toISOString();

        //     if (more) {
        //         const som = format.split('T')[0].split('-');
        //         more = more.split(' ');

        //         switch (more[1]) {
        //             case 'month':
        //                 som[1] = Number(som[1]) + Number(more[0]);
        //                 som[1] = (som[1] < 10 ? '0' : '') + som[1];
        //                 break;

        //             case 'day':
        //                 som[2] = Number(som[2]) + Number(more[0]);
        //                 som[2] = (som[2] < 10 ? '0' : '') + som[2];
        //                 break;

        //             case 'year':
        //                 som[0] = Number(som[0]) + Number(more[0]);
        //                 som[0] = (som[0] < 10 ? '0' : '') + som[0];
        //                 break;
        //         }
        //         return som[0] + '-' + som[1] + '-' + som[2];
        //     }
        //     const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        //     this.hours = new Date().getHours() + ':' + min;
        //     return this.today = format.split('T')[0];


        // }



        return this;
    }




}
