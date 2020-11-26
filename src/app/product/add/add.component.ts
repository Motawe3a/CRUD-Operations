import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../modals/product';
import { Lookup } from './../modals/lookup';
import { LookupService } from './../services/lookup.service';
import { ProductService } from './../services/peoduct.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  productForm = this.formBuilder.group({});
  units: Observable<Lookup[]>;
  categories: Observable<Lookup[]>;
  formSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private lookupService: LookupService,
    private productService: ProductService,
    private router: Router,


  ) { }

  ngOnInit() {
    this.productForm.addControl('id', new FormControl(''));
    this.productForm.addControl('name', new FormControl('', [Validators.required]));
    this.productForm.addControl('code', new FormControl('', [Validators.required]));
    this.productForm.addControl('category', new FormControl('', [Validators.required]));
    this.productForm.addControl('unit', new FormControl('', [Validators.required]));
    this.productForm.addControl('salesRate', new FormControl('', [Validators.required]));
    this.productForm.addControl('purchaseRate', new FormControl('', [Validators.required]));
    this.units = this.lookupService.getUnits();
    this.categories = this.lookupService.getProductCategories();
  }

  saveProduct(): void {
    const product = new Product();
    // map data from form to product
    product.id = this.productForm.get('id').value;
    product.name = this.productForm.get('name').value;
    product.code = this.productForm.get('code').value;
    product.category = this.getLookupObjFromCode(this.productForm.get('category').value);
    product.unit = this.getLookupObjFromCode(this.productForm.get('unit').value);
    product.purchaseRate = this.productForm.get('purchaseRate').value;
    product.salesRate = this.productForm.get('salesRate').value;

    // save to database
    if (product.id === 0) {
      this.productService.addNewProduct(product);
    }
    else {
      this.productService.updateProduct(product);
    }
  }

  save($event: any): void {

    this.formSubmitted = true;
    if (!this.productForm.valid) {
      return;
    }

    this.saveProduct();

    // navigate back to products list
    this.router.navigate(['/products']);
  }

  saveAndContinue($event: any): void {
    this.formSubmitted = true;
    console.log(this.productForm.get('name').errors);
    if (!this.productForm.valid) {
      return;
    }
    this.saveProduct();
  }

  getLookupObjFromCode(code: string): Lookup {
    let lookup: Lookup = null;
    const subscription = this.units.subscribe(lookups => {
      lookup = lookups.find(item => item.code === code);
    });
    subscription.unsubscribe();
    return lookup;
  }

}
