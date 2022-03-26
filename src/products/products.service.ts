import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const id: string = uuidv4();
    this.products.push(new Product(id, title, description, price));
    return id;
  }
}
