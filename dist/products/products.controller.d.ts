import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    getAll(): string;
    getOne(id: string): string;
    create(createProductDto: CreateProductDto): string;
    remove(id: string): string;
    update(updateProductDto: UpdateProductDto, id: string): string;
}
