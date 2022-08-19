import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FaixasModule } from './faixas/faixas.module';
import { EquipamentoSchema } from './infra/db/typeorm/equipamento.schema';
import { UsuarioEquipamentoSchema } from './infra/db/typeorm/usuario-equipamento.schema';
import { UsuarioSchema } from './infra/db/typeorm/usuario.schema';

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
    FaixasModule,
    TypeOrmModule.forFeature([UsuarioEquipamentoSchema]),
    TypeOrmModule.forFeature([UsuarioSchema]), 
    TypeOrmModule.forFeature([EquipamentoSchema]), 
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
