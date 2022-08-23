import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Faixa } from "src/core/domain/faixa";
import { Ticket } from "src/core/domain/talao";
import { DataTalao, FaixaRepositoryInterface, MonitoramentoTaloesOptions, TalaoPage } from "src/core/plug/faixa.repository.interface";
import { Repository, DataSource, SelectQueryBuilder } from "typeorm";
import { FaixaSchema } from "./faixa.schema";
import { TalaoSchema } from "./talao.schema";

@Injectable()
export class FaixaRepository implements FaixaRepositoryInterface{
    constructor(
        @InjectRepository(FaixaSchema)
        private faixaRepository: Repository<FaixaSchema>,
        @InjectRepository(TalaoSchema)
        private talaoRepository: Repository<TalaoSchema>,
        private dataSource: DataSource
      ) {}


    async findTaloes(options: MonitoramentoTaloesOptions): Promise<TalaoPage> {
        let query: SelectQueryBuilder<TalaoSchema>=  this.dataSource
            .createQueryBuilder()
            .select("talao")
            .from(TalaoSchema, "talao")
            .leftJoinAndSelect('talao.usuario', 'usuario')
            .leftJoinAndSelect('talao.equipamento', 'equipamento')
            .leftJoinAndSelect('talao.faixa', 'faixa')
            .where('faixa.tipoRegistro = :tipo', { tipo: options.tipo })
            .andWhere('faixa.idTenant = :tenant', { tenant: options.tenantId })

        if(options.userName)
            query = query
                .andWhere('usuario.nome like :nome', { nome: `%${options.userName}%`})    
        else
            query = query
                .andWhere('faixa.tipoRegistro = :tipo', { tipo: options.tipo })

        
        const [result, total] =  await query
            .orderBy("talao.identificador", "ASC")
            .skip(options.skip)
            .take(options.take)
            .getManyAndCount()

        const talaoData: DataTalao[] = result.map(talaoSchema => {
            return {
                username: talaoSchema.requestedBy ? talaoSchema.requestedBy.nome: null,
                ticketNumber: talaoSchema.identificador,
                equipment: talaoSchema.equipamento.imei,
                date: talaoSchema.dataLiberacao,
                status: talaoSchema.situacao
            }
        });

        return {
            meta: { total: total},
            data: talaoData
        }
    }


    async find(condicoes): Promise<Faixa[]> {
        const faixasSchema = await this.faixaRepository.find(condicoes);
        return faixasSchema.map(faixasSchema => new Faixa(
            faixasSchema.idTenant, 
            faixasSchema.numInicial, 
            faixasSchema.numFinal, 
            faixasSchema.prefixo,
            faixasSchema.tipoRegistro,
            faixasSchema.id,
            faixasSchema.proximo))
    }

    async findOneBy(condicoes) : Promise<Faixa | null>{

        const faixaSchema = await this.faixaRepository.findOneBy(condicoes)
    

        return faixaSchema !== null? new Faixa(
            faixaSchema.idTenant,
            faixaSchema.numInicial,
            faixaSchema.numFinal,
            faixaSchema.prefixo,
            faixaSchema.tipoRegistro,
            faixaSchema.id,
            faixaSchema.proximo
        ) : null
         

    }
    
    save(faixa:Faixa, taloes: Ticket[] = []){
        const faixaSchema = this.faixaRepository.create(faixa);
        if(taloes.length > 0 ){
            const taloesSchema = this.talaoRepository.create(taloes);
            this.talaoRepository.save(taloesSchema);
        }
        return this.faixaRepository.save(faixaSchema) ;
    }

}

