import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaixasModule } from './faixas/faixas.module';
import { EquipamentoSchema } from './infra/db/typeorm/equipamento.schema';
import { UsuarioEquipamentoSchema } from './infra/db/typeorm/usuario-equipamento.schema';
import { UsuarioSchema } from './infra/db/typeorm/usuario.schema';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { DatabaseConfig } from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load : [config]
}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig
    }),
    FaixasModule,
    TypeOrmModule.forFeature([UsuarioEquipamentoSchema]),
    TypeOrmModule.forFeature([UsuarioSchema]), 
    TypeOrmModule.forFeature([EquipamentoSchema]), 
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
