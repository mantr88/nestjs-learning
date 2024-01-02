import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  // Redirect,
  HttpCode,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductServise } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductServise) {}

  @Get()
  //   @Redirect('https://www.google.com', 301)
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cashe-Controle', 'none')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.crate(createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string) {
    return this.productService.update(id, updateProductDto);
  }
}
