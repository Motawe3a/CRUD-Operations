import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProduct } from '../modals/product';
import { ProductService } from '../services/peoduct.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  product$: Observable<IProduct>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService.getProductById(Number.parseInt(params.get('id')))
      ));
  }

  editProduct(product: IProduct): void {
    this.product$.subscribe(product => {
      this.router.navigate(['products/edit/' + product.id]);
    });
  }
}
