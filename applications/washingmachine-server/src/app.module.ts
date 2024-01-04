import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {ClothesStockController} from "./clothes-stock.controller";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  })],
  controllers: [StatusController, ClothesStockController],
  providers: [AppService],
})
export class AppModule {}
