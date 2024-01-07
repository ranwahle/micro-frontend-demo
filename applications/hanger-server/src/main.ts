import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
      .setTitle('Hanger API')
      .setDescription('The Hanger API description')
      .setVersion('1.0')
      .addTag('Hanger')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    console.log(`listening on port ${port}`)
  });
}
bootstrap();