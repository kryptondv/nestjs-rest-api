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
import { Product } from './product.model';

@Controller('products')
export class ProductsControler {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<Pick<Product, 'id'>> {
    const id = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id };
  }

  @Get()
  getProducts() {
    return this.productsService.products;
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title?: string,
    @Body('description') description?: string,
    @Body('price') price?: number,
  ) {
    const updateProductData = { title, description, price };
    return this.productsService.updateProduct(id, updateProductData);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
