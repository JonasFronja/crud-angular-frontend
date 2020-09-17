import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import { Product } from '../product.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product;

  productForm: FormGroup

  msgPrice: boolean = false

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product
      this.productForm = this.formBuilder.group({
        name:[this.product.name, Validators.required],
        price:[this.product.price, [Validators.required,this.validatorPrice]],
      })
    });

    
  }

  updateProduct(): void{
    this.productService.update(this.productForm.value).subscribe(
      () => {this.productService.showMessage('Produto Alterado')
      this.router.navigate(['/products'])}
      )
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }

  validatorPrice(control: FormControl){
    const price = control.value
    if(price && price != ''){

      var valida = /^\d*(\.\d{1,2})?$/;
      return valida.test(price) ? null : {
        precoInvalido: true
      };
    }
    return null
  }
}
