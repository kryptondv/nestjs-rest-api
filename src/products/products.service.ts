import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';
import { merge } from 'lodash';

@Injectable()
export class ProductsService {
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
    return this.formatProduct(product);
  }

  async updateProduct(id: string, updateData: Partial<Product>) {
    const product = await this.findProduct(id);
    const updatedProduct = merge(product, updateData);
    const resultProduct = await updatedProduct.save();
    return this.formatProduct(resultProduct);
  }

  async deleteProduct(id: string) {
    let deletedProduct;
    try {
      deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
      return deletedProduct;
    } catch {
      throw new NotFoundException();
    }
  }

  /**
   * utils
   */
  private async findProduct(id: string) {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
      return product;
    } catch {
      throw new NotFoundException();
    }
  }

  private formatProduct(product: Product): Product {
    const { id, title, description, price } = product;
    return { id, title, description, price };
  }
}
