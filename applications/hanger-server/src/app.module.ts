import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {ClothesOnHanger} from "./clothes-on-hanger.controller";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  })],
  controllers: [StatusController, ClothesOnHanger],
  providers: [AppService],
})
export class AppModule {}
