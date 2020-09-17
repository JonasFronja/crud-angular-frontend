import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { Product } from '../product.model';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  // product: Product = {
  //   name: '',
  //   price: null,
  // }

  product: FormGroup

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.product = this.formBuilder.group({
      name:['', Validators.required],
      price:['', [Validators.required,this.validatorPrice]],
    })
  }

  createProduct(): void{

    this.productService.create(this.product.value).subscribe( () => {
      this.productService.showMessage('Produto Cadastrado')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void{
    this.router.navigate(['/products'])
  }
  
  verificaValidTouched(campo){
    return !this.product.get(campo).valid && this.product.get(campo).touched
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
