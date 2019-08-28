import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ProdutoService } from '../produto.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HelperService } from 'src/app/service/helper.service';
import { CategoriasService } from '../categorias.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


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
        productsCtrl: ['']
    });

    public editor = ClassicEditor;
    public filteredProduct: Observable<any>;
    public items = [];

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
                this.items = JSON.parse(this.productService.productToEdit.items);
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
        if (this.hasCollection > 0) {
            this.form.controls.items.setValue(JSON.stringify(this.items));
        }


        this.productService.create(this.form.value)
            .subscribe((product) => {
                if (product) {
                    this.helper.toast('produto cadastrado');
                    this.productService.products.push(product);
                    this.router.navigate(['/produtos']);
                }
            }, error => this.helper.message(error));

    }

    public update() {
        if (this.hasCollection > 0) {
            this.form.controls.items.setValue(JSON.stringify(this.items));
        }
        this.productService.updateById(this.productService.productToEdit.id, this.form.value)
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
            if (this.productService.verifyStock(item)) {
                this.items.push(item);
            }
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
        if (item.stock) {
            if (this.items[idx].qtd < item.units) {
                this.items[idx].qtd++;
            } else {
                this.helper.toast('Item sem estoque!', {color : 'secondary'});
            }
        } else {
            this.items[idx].qtd++;
        }
    }

    ngOnDestroy(): void {
        this.productService.productToEdit = null;
        this.productService.ne = false;
    }

}
