import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
      .setTitle('Washing machine API')
      .setDescription('The Washing machine API description')
      .setVersion('1.0')
      .addTag('Washing Machine')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
