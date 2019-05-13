import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
    selector: 'app-cliente-modal',
    templateUrl: './cliente-modal.component.html',
    styleUrls: ['./cliente-modal.component.scss'],
})
export class ClienteModalComponent implements OnInit {
    displayedColumns: string[] = [ 'name', 'cell_phone', 'action'];
    dataSource = new MatTableDataSource<any>([
        {
            name: 'dsad',
            cell_phone: '89855656'
        }
    ]);
    public alertToRegister: boolean;
    public showForm: boolean;
    public form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        cell_phone: ['', Validators.required],
        landline: [''],
        address_street: [''],
        address_number: [''],
        address_zipcode: [''],
        address_city: [''],
        address_state: [''],
        address_complement: [''],
        reference_point: [''],
        neighborhood_id: [''],
        category: ['']
    });
    public neighborhood = [
        {
            id: 1,
            name: 'nova'
        }
    ]
    constructor(
        public modalCrl: ModalController,
        private fb: FormBuilder
    ) { }

    ngOnInit() { }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        
        if(this.dataSource.filteredData.length < 1)
        {
            this.alertToRegister = true;
            console.log('true')
        } else {
            this.alertToRegister = false;
            console.log('false')
        }
    }

    




}
