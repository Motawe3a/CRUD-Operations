import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct } from './../modals/product';
import { ProductService } from './../services/peoduct.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  products: Observable<IProduct[]> = null;

  constructor(private _ProductService: ProductService, private router: Router) { }

  ngOnInit() {
    this.products = this._ProductService.getAllProducts();
  }

  viewProduct(product) {
    this.router.navigate(['products/view-product/' + product.id])
  }

  deleteProduct(product) {
    this._ProductService.deleteProduct(product);
  }



}
