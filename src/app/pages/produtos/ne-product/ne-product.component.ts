import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HelperService } from 'src/app/service/helper.service';
import { CategoriasService } from '../categorias.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-ne-product',
    templateUrl: './ne-product.component.html',
    styleUrls: ['./ne-product.component.scss'],
})
export class NeProductComponent implements OnInit, OnDestroy {
    public form: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        number: [null],
        category_id: [''],
        weight: [''],
        weight_type: [''],
        sale: [false],
        cost_price: [''],
        sale_price: [''],
        stock: [false],
        units: [{value: 1, disabled: true}],
        minimum_units: [1],
        maximum_units: [1],
        code: [''],
        description: [''],
        brand: [''],
        fractioned: [null],
        weight_sale: [null],
        weight_value_sale: [null],
        collection: [null],
        items: [null],
        productsCtrl: [''],
        files: ['']
    });

    public editor = ClassicEditor;
    public filteredProduct: Observable<any>;
    public items: any[] = [];

    constructor(
        private fb: FormBuilder,
        public categoriasService: CategoriasService,
        public productService: ProdutoService,
        private helper: HelperService,
        private router: Router
    ) {
        this.filteredProduct = this.productsCtrl.valueChanges
            .pipe(
                startWith(''),
                map(state => state ? this.filterProducts(state) : this.productService.products.slice())
            );
    }

    ngOnInit() {
        this.productService.checkNE();
        if (this.productService.productToEdit) {
            if (this.productService.productToEdit.items) {
                this.items =  JSON.parse(this.productService.productToEdit.items);
                // console.log( JSON.parse(JSON.parse(this.productService.productToEdit.items)))
            }
            if( this.productService.productToEdit.photo) {
                this.productService.productToEdit.files = [{ preview: environment.storage + this.productService.productToEdit.photo.url_thumbnail }];
            }
            this.form.patchValue(this.productService.productToEdit);
        }


        if (this.isFractioned) {
            this.form.controls.collection.disable();
        } else {
            this.form.controls.collection.enable();
        }
    }


    get productsCtrl() {
        return this.form.controls.productsCtrl;
    }
    get toStock() {
        return this.form.controls.stock.value;
    }

    get toSale() {
        return this.form.controls.sale.value;
    }

    get isFractioned() {
        return this.form.controls.fractioned.value;
    }

    get hasCollection() {
        return this.form.controls.collection.value;
    }

    get weightType() {
        return this.form.controls.weight_type.value;
    }

    public deleteRemove() {
        this.form.removeControl('remove_file');
    }
    public addRemove() {
        this.form.setControl('remove_file', this.fb.control(true));
    }
    public onReady(editor) {
        editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
        );
    }

    public toggleSaleOption() {
        if (this.isFractioned) {
            this.form.controls.collection.disable();
            this.form.controls.collection.setValue(false);
        } else {
            this.form.controls.collection.enable();
        }

        if (this.hasCollection) {
            this.form.controls.fractioned.disable();
            this.form.controls.fractioned.setValue(false);
        } else {
            this.form.controls.fractioned.enable();
        }
    }

    public save() {
       
        if (this.hasCollection) {
            this.form.controls.items.setValue(JSON.stringify(this.items));
        }

        let data: any = this.form.value;
        if( data.files[0]) {
            data.files = data.files[0].file;
        }
        const formData: FormData = new FormData();
        for(let i in data) {
            formData.append(i, data[i]);
        }
        this.productService.create(formData)
            .subscribe((product) => {
                if (product) {
                    this.helper.toast('produto cadastrado');
                    this.productService.products.push(product);
                    this.router.navigate(['/produtos']);
                }
            }, error => this.helper.message(error));

    }

    public update() {
        if (this.hasCollection) {
            this.form.controls.items.setValue(JSON.stringify(this.items));
        }
        
        let data: any = this.form.value;

        if( data.files[0]) {
            data.files = data.files[0].file;
        }

        const formData: FormData = new FormData();

        for(let i in data) {
            formData.append(i, data[i]);
        }
        formData.append('_method', 'PUT');
        this.productService.updateById(this.productService.productToEdit.id, formData, {method: 'post'})
            .subscribe((product) => {
                if (product) {
                    const idx = this.productService.products.indexOf(this.productService.productToEdit);
                    this.productService.products[idx] = product;

                    this.helper.toast('Edição efetuada com exito');
                    this.router.navigate(['/produtos']);
                }
            });
    }

    private filterProducts(value: string): any {
        const filterValue = value.toLowerCase();

        const productFiltered = this.productService.products.filter(product => {
            if (product.name.toLowerCase().indexOf(filterValue) === 0) {
                return product;
            }
        });

        if (productFiltered.length < 1) {
            this.productsCtrl.setErrors({ not_found: true });
        } else {
            this.productsCtrl.setErrors(null);
        }
        return productFiltered;
    }

    public toggleItem(item: any, remove = false) {
        item.qtd = 1;
        const idx = this.items.indexOf(item);
        if (idx < 0 && !remove) {
          this.items.push(item);
            this.productsCtrl.reset();

        } else {
            this.items.splice(idx, 1);
        }
    }

    public lessItem(item: any) {
        const idx = this.items.indexOf(item);
        if (this.items[idx].qtd > 1) {
            this.items[idx].qtd--;
        }
    }

    public plusItem(item: any) {
        const idx = this.items.indexOf(item);
        this.items[idx].qtd++;
    }

    ngOnDestroy(): void {
        this.productService.productToEdit = null;
        this.productService.ne = false;
    }

}
