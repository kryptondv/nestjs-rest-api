import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsControler {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const id = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id };
  }

  @Get()
  async getProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productsService.getProduct(id);
    return product;
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('description') description?: string,
    @Body('price') price?: number,
  ) {
    const updateProductData = { title, description, price };
    const updatedProduct = await this.productsService.updateProduct(
      id,
      updateProductData,
    );
    return updatedProduct;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const deletedProduct = await this.productsService.deleteProduct(id);
    return deletedProduct;
  }
}
