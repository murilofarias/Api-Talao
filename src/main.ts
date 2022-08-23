import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainErrorFilter } from './domain-error.filter';
import { ResourceNotFoundErrorFilter } from './resource-not-found-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new DomainErrorFilter(), new ResourceNotFoundErrorFilter());
  await app.listen(3000);
}
bootstrap();
