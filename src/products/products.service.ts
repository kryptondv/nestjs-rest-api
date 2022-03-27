import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { merge } from 'lodash';

@Injectable()
export class ProductsService {
  private _products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<Product['id']> {
    const newProduct = new this.productModel({ title, description, price });
    const { id } = await newProduct.save();
    return id as Product['id'];
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(({ id, title, description, price }) => ({
      id,
      title,
      description,
      price,
    })) as Product[];
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
