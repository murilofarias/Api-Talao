import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { ChecarUsuarioEquipamentoUseCase } from 'src/@core/application/checar-usuario-equipamento.use-case';
import { CriarFaixaUseCase } from 'src/@core/application/criar-faixa.use-case';
import { LiberarTaloesUseCase } from 'src/@core/application/liberar-taloes.use-case';
import { FaixaRepositoryInterface } from 'src/@core/plug/faixa.repository.interface';
import { EquipamentoSchema } from 'src/infra/db/typeorm/equipamento.schema';
import { FaixaRepository } from 'src/infra/db/typeorm/faixa.repository';
import { FaixaSchema } from 'src/infra/db/typeorm/faixa.schema';
import { TalaoSchema } from 'src/infra/db/typeorm/talao.schema';
import { UsuarioEquipamentoSchema } from 'src/infra/db/typeorm/usuario-equipamento.schema';
import { UsuarioSchema } from 'src/infra/db/typeorm/usuario.schema';
import { DataSource } from 'typeorm';
import { FaixasController } from './faixas.controller';
import { FaixasService } from './faixas.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([FaixaSchema]),
        TypeOrmModule.forFeature([UsuarioEquipamentoSchema]),
        TypeOrmModule.forFeature([UsuarioSchema]), 
        TypeOrmModule.forFeature([EquipamentoSchema]), 
        TypeOrmModule.forFeature([TalaoSchema])
    ],
    providers: [
        FaixasService,
        CriarFaixaUseCase,
        ChecarUsuarioEquipamentoUseCase,
        {
          provide: FaixaRepository,
          useFactory: (dataSource: DataSource) => {
            return new FaixaRepository(dataSource.getRepository(FaixaSchema), dataSource.getRepository(TalaoSchema));
          },
          inject: [getDataSourceToken()],
        },
        { 
          provide: LiberarTaloesUseCase,
          useFactory: (faixaRepo: FaixaRepositoryInterface) => {
            return new LiberarTaloesUseCase(faixaRepo);
          },
          inject: [FaixaRepository],
        }
      ],
    controllers: [FaixasController],
})
export class FaixasModule {}
