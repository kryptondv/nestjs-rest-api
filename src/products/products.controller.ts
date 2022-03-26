import { Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductsControler {
  @Post()
  addProduct(): any {}
}
