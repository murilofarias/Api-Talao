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
            .leftJoinAndSelect('talao.requestedBy', 'usuario')
            .leftJoinAndSelect('talao.equipamento', 'equipamento')
            .leftJoinAndSelect('talao.faixa', 'faixa')
            .where('faixa.tipoRegistro = :tipo', { tipo: options.tipo })
            .andWhere('faixa.ativa = :ativa', { ativa: true })
            .andWhere('faixa.idTenant = :tenant', { tenant: options.tenantId })

        if(options.ticketNumber)
            query = query
                .andWhere('talao.identificador = :identificator', { identificator: options.ticketNumber})
                
        
        if(options.startDate)
            query = query
                .andWhere('talao.dataLiberacao > :startDate', { startDate: options.startDate})

        if(options.endDate)
            query = query
                .andWhere('talao.dataLiberacao < :endDate', {endDate: options.endDate})
        
        if(options.userName)
            query = query
                .andWhere('usuario.nome like :nome', { nome: `%${options.userName}%`})

        if(options.equipment)
            query = query
                .andWhere('equipamento.alias like :alias', { alias: `%${options.equipment}%`})

        
        const [result, total] =  await query
            .orderBy("talao.identificador", "ASC")
            .skip(options.skip)
            .take(options.take)
            .getManyAndCount()

        const talaoData: DataTalao[] = result.map(talaoSchema => {
            return {
                user_name: talaoSchema.requestedBy ? talaoSchema.requestedBy.nome: null,
                ticket_number: talaoSchema.identificador,
                equipment: talaoSchema.equipamento ? talaoSchema.equipamento.alias: null,
                date: talaoSchema.dataLiberacao,
                status: talaoSchema.situacao,
                attached: talaoSchema.vinculado
            }
        });

        return {
            meta: { total: total},
            data: talaoData
        }
    }


    async find(conditions) {
        console.log(conditions.tenantId);
        let query: SelectQueryBuilder<FaixaSchema>= await this.dataSource
            .createQueryBuilder()
            .select("faixa")
            .from(FaixaSchema, "faixa")
            .where("faixa.idTenant = :tenantId", { tenantId: conditions.tenantId })
        
        if(conditions.type !== -1)
            query = query
                .andWhere('faixa.tipoRegistro = :type', { type: conditions.type})

        if(conditions.onlyActive)
            query = query
                .andWhere('faixa.ativa = :active', { active: true })
        
        const [result, total] =  await query
            .getManyAndCount()
        
        
        return [result.map(
            faixasSchema => new Faixa
                (
                faixasSchema.idTenant, 
                faixasSchema.numInicial, 
                faixasSchema.numFinal, 
                faixasSchema.prefixo,
                faixasSchema.tipoRegistro,
                faixasSchema.id,
                faixasSchema.proximo
                )
            ),
            total]
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

