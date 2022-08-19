import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaixasController } from './faixas/faixas.controller';
import { FaixasService } from './faixas/faixas.service';
import { FaixasModule } from './faixas/faixas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'helios-talao',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FaixasModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
