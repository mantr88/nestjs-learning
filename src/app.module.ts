import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import * as dotenv from 'dotenv';

dotenv.config();

const DB_URI = process.env.DB_URI;

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(`${DB_URI}`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
