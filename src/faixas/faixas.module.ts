import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { CriarFaixaUseCase } from 'src/core/application/criar-faixa.use-case';
import { GetBandsUseCase } from 'src/core/application/get-bands.use-case';
import { GetUsuarioEquipamentoUseCase } from 'src/core/application/get-usuario-equipamento.use-case';
import { LiberarTaloesUseCase } from 'src/core/application/liberar-taloes.use-case';
import { MonitorarTaloesUseCase } from 'src/core/application/monitorar-taloes.use-case';
import { FaixaRepositoryInterface } from 'src/core/plug/faixa.repository.interface';
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
        GetUsuarioEquipamentoUseCase,
        {
          provide: FaixaRepository,
          useFactory: (dataSource: DataSource) => {
            return new FaixaRepository(dataSource.getRepository(FaixaSchema), dataSource.getRepository(TalaoSchema), dataSource);
          },
          inject: [getDataSourceToken()],
        },
        { 
          provide: LiberarTaloesUseCase,
          useFactory: (faixaRepo: FaixaRepositoryInterface, getUserEqui: GetUsuarioEquipamentoUseCase) => {
            return new LiberarTaloesUseCase(faixaRepo, getUserEqui);
          },
          inject: [FaixaRepository, GetUsuarioEquipamentoUseCase],
        },
        { 
          provide: CriarFaixaUseCase,
          useFactory: (faixaRepo: FaixaRepositoryInterface) => {
            return new CriarFaixaUseCase(faixaRepo);
          },
          inject: [FaixaRepository],
        },
        { 
          provide: MonitorarTaloesUseCase,
          useFactory: (faixaRepo: FaixaRepositoryInterface) => {
            return new MonitorarTaloesUseCase(faixaRepo);
          },
          inject: [FaixaRepository],
        },
        { 
          provide: GetBandsUseCase,
          useFactory: (faixaRepo: FaixaRepositoryInterface) => {
            return new GetBandsUseCase(faixaRepo);
          },
          inject: [FaixaRepository],
        },
      ],
    controllers: [FaixasController],
})
export class FaixasModule {}
