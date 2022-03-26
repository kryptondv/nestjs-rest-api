import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private _products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const id: string = uuidv4();
    this._products.push(new Product(id, title, description, price));
    return id;
  }

  get products() {
    return [...this._products];
  }
}
