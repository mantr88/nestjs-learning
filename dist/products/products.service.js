"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServise = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./schemas/product.schema");
const mongoose_2 = require("mongoose");
const xml2js_1 = require("xml2js");
console.log('🚀 ~ file: products.service.ts:9 ~ parseString:', xml2js_1.parseString);
let ProductServise = class ProductServise {
    constructor(productModel) {
        this.productModel = productModel;
        this.products = [];
    }
    async getAll() {
        let json = {};
        const fetchData = await fetch('https://ebk.salesdrive.me/export/yml/export.yml?publicKey=JAvWTZJQXYHA15-Adae5O-JRlHOuDA97l1SBWVXpy_Okn3WEsPjQKZmcbiOGYCfWYNC6_M42GBn5')
            .then((res) => res.text())
            .then((data) => (json = (0, xml2js_1.parseString)(data, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('🚀 ~ file: products.service.ts:33 ~ ProductServise ~ result:', result);
            return result;
        })));
        return json;
    }
    async getById(id) {
        return this.productModel.findById(id);
    }
    async crate(productDto) {
        const newProduct = new this.productModel(productDto);
        return newProduct.save();
    }
    async remove(id) {
        return this.productModel.findByIdAndDelete(id);
    }
    async update(id, productDto) {
        return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
    }
};
exports.ProductServise = ProductServise;
exports.ProductServise = ProductServise = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductServise);
//# sourceMappingURL=products.service.js.map