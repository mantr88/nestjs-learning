import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import 'dotenv/config';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import * as xml2js from 'xml2js';

const XML_URL = process.env.XML_URL;
console.log('🪲 ~ XML_URL:', XML_URL);

@Injectable()
export class ProductServise {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private products = [];

  async getAll() {
    let json = null;
    const xmlData = await fetch(`${XML_URL}`).then((res) => res.text());
    json = await xml2js.parseStringPromise(xmlData);
    return json;
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async crate(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  async update(id: string, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }
}
