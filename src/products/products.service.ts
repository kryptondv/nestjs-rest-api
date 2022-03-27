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
    return products.map(this.formatProduct) as Product[];
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);
    return product;
  }

  updateProduct(id: string, updateData: Partial<Product>) {
    // const idx = this.findProduct(id, true);
    // this._products[idx] = merge(this._products[idx], updateData);
    // return this._products[idx];
  }

  deleteProduct(id: string) {
    // const idx = this.findProduct(id, true);
    // return this._products.splice(idx, 1)[0];
  }

  /**
   * utils
   */
  private async findProduct(id: string) {
    let product;
    try {
      product = await this.productModel.findById(id);
      return this.formatProduct(product);
    } catch {
      throw new NotFoundException();
    }
  }

  private formatProduct(product: Product): Product {
    const { id, title, description, price } = product;
    return { id, title, description, price };
  }
}
