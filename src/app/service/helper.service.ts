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
            this.isLoading = false;
        } else {
            setTimeout(() => this.isLoading = true, 100);
            setTimeout(this.loadDismiss, 90000);

        }

    }

    async  loadDismiss() {
        this.isLoading = false;
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

    date(data?, more?, formatter?) {

        const date = new Date();
        let format;
        if ((data) && (!formatter)) {
            format = new Date(data).toISOString();
            this.format = format.split('T')[0];
            const hours = date.getHours() + data;
            const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            this.hours = hours + ':' + min;
        } else {
            if (formatter === '/') {
                data = data.split('-');
                return data = data[2] + '/' + data[1] + '/' + data[0];
            }
            if (formatter === '-') {
                data = data.split('/');
                return data = data[2] + '-' + data[1] + '-' + data[0];
            }
            format = new Date().toISOString();

            if (more) {
                const som = format.split('T')[0].split('-');
                more = more.split(' ');

                switch (more[1]) {
                    case 'month':
                        som[1] = parseInt(som[1], 11) + parseInt(more[0], 11);
                        som[1] = (som[1] < 10 ? '0' : '') + som[1];
                        break;

                    case 'day':
                        som[2] = parseInt(som[2], 11) + parseInt(more[0], 11);
                        som[2] = (som[2] < 10 ? '0' : '') + som[2];
                        break;

                    case 'year':
                        som[0] = parseInt(som[0], 11) + parseInt(more[0], 11);
                        som[0] = (som[0] < 10 ? '0' : '') + som[0];
                        break;
                }
                return som[0] + '-' + som[1] + '-' + som[2];
            }
            const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
            this.hours = new Date().getHours() + ':' + min;
            return this.today = format.split('T')[0];


        }



        return this;
    }




}
