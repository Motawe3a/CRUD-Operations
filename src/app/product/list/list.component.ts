import { Component, OnInit } from '@angular/core';
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

  constructor(private _ProductService: ProductService) { }

  ngOnInit() {
    this.products = this._ProductService.getAllProducts();
  }

}
