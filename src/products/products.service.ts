import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuidv4 } from 'uuid';
import { merge } from 'lodash';

@Injectable()
export class ProductsService {
  private _products: Product[] = [
    {
      id: '9707d841-6d99-4f9c-980f-2401b7d067f6',
      title: 'User friendly book',
      description: 'To jest test3',
      price: 21,
    },
  ];

  insertProduct(title: string, description: string, price: number) {
    const id: string = uuidv4();
    this._products.push(new Product(id, title, description, price));
    return id;
  }

  get products() {
    return [...this._products];
  }

  getProduct(id: string): Product | never {
    const product = this.findProduct(id);
    return { ...product };
  }

  updateProduct(id: string, updateData: Partial<Product>): Product | never {
    const idx = this.findProduct(id, true);
    this._products[idx] = merge(this._products[idx], updateData);
    return this._products[idx];
  }

  deleteProduct(id: string): Product {
    const idx = this.findProduct(id, true);
    return this._products.splice(idx, 1)[0];
  }

  /**
   * utils
   */
  private findProduct(id: string): Product | never;
  private findProduct(id: string, byIndex: boolean): number | never;
  private findProduct(id: string, byIndex?: boolean): unknown {
    const cb = (item) => item.id === id;

    const result = byIndex
      ? this._products.findIndex(cb)
      : this._products.find(cb);
    if (!(result || result === 0) || result === -1) {
      throw new NotFoundException();
    }
    return result;
  }
}
