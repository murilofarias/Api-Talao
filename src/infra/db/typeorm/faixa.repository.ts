import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Faixa } from "src/core/domain/faixa";
import { Ticket } from "src/core/domain/talao";

import { FaixaRepositoryInterface } from "src/core/plug/faixa.repository.interface";
import { Repository } from 'typeorm';
import { FaixaSchema } from "./faixa.schema";
import { TalaoSchema } from "./talao.schema";

@Injectable()
export class FaixaRepository implements FaixaRepositoryInterface{
    constructor(
        @InjectRepository(FaixaSchema)
        private faixaRepository: Repository<FaixaSchema>,
        @InjectRepository(TalaoSchema)
        private talaoRepository: Repository<TalaoSchema>
      ) {}
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

