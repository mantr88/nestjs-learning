import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import dotenv from 'dotenv';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
// import { xml2json } from 'xml-js';
import { parseString } from 'xml2js';
console.log('🚀 ~ file: products.service.ts:9 ~ parseString:', parseString);
// const parseString = require('xml2js').parseString;
dotenv.config();

const XML_URL = process.env.XML_URL;

@Injectable()
export class ProductServise {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  private products = [];

  async getAll() {
    let json = {};
    await fetch(`${XML_URL}`)
      .then((res) => res.text())
      .then(
        (data) =>
          (json = parseString(data, (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(
              '🚀 ~ file: products.service.ts:33 ~ ProductServise ~ result:',
              result,
            );
            return result;
          })),
      );
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
