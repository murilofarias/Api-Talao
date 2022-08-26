import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainErrorFilter } from './domain-error.filter';
import { ResourceNotFoundErrorFilter } from './resource-not-found-error.filter';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Helios-Api-Talao')
    .setDescription('Api to manage tickets')
    .setVersion('0.0.1')
    .build();

    const options: SwaggerDocumentOptions = {
      deepScanRoutes: true
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new DomainErrorFilter(), new ResourceNotFoundErrorFilter());
  await app.listen(3000);
}
bootstrap();
