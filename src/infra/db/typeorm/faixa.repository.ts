import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Faixa } from "src/@core/domain/faixa";
import { Talao } from "src/@core/domain/talao";

import { FaixaRepositoryInterface } from "src/@core/plug/faixa.repository.interface";
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

    async findOneBy(condicoes) : Promise<Faixa>{

        const faixaSchema = await this.faixaRepository.findOneBy(condicoes)

        return new Faixa(faixaSchema.idTenant, faixaSchema.numInicial, faixaSchema.numFinal, faixaSchema.prefixo, faixaSchema.tipoRegistro, faixaSchema.id, faixaSchema.proximo)
         

    }
    
    save(faixa:Faixa){
        const faixaSchema = this.faixaRepository.create(faixa);
        return this.faixaRepository.save(faixaSchema) ;
    }

    saveTaloes(faixa: Faixa, taloes: Talao[]){
        const faixaSchema = this.faixaRepository.create(faixa);
        const taloesSchema = this.talaoRepository.create(taloes);
        this.faixaRepository.save(faixaSchema);
        return this.talaoRepository.save(taloesSchema) ;
    }
}

