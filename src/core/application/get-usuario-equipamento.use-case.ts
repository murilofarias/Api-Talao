import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EquipamentoSchema } from "src/infra/db/typeorm/equipamento.schema";
import { UsuarioEquipamentoSchema } from "src/infra/db/typeorm/usuario-equipamento.schema";
import { UsuarioSchema } from "src/infra/db/typeorm/usuario.schema";
import { Repository } from "typeorm";
import { DomainError } from "../domain/errors/domain.error";
import { ResourceNotFoundError } from "../domain/errors/resource-not-found.error";

import { UsuarioEquipamento } from "../domain/usuario-equipamento";

@Injectable()
export class GetUsuarioEquipamentoUseCase {
    constructor(
        @InjectRepository(UsuarioEquipamentoSchema)
        private usuarioEquipamentoRepository: Repository<UsuarioEquipamentoSchema>,
        @InjectRepository(UsuarioSchema)
        private usuarioRepository: Repository<UsuarioSchema>,
        @InjectRepository(EquipamentoSchema)
        private equipamentoRepository: Repository<EquipamentoSchema>
      ) {}

  async execute(input: ChecarUsuarioEquipamentoInput): Promise<ChecarUsuarioEquipamentoOutput> {
    const usuarioSchema = await this.usuarioRepository.findOneBy({
        id: input.usuarioId
    })
    if(!usuarioSchema)
        throw new ResourceNotFoundError("User must exist");

    const equipamentoSchema = await this.equipamentoRepository.findOneBy({
        id: input.equipamentoId
    })
    if(!equipamentoSchema)
        throw new ResourceNotFoundError("Equipment must exist");
    
    

    const usuarioEquipamentoSchema = await this.usuarioEquipamentoRepository.findOneBy({
        usuario: usuarioSchema,
        equipamento: equipamentoSchema
    })
    
    if(!usuarioEquipamentoSchema)
        throw new DomainError ("User must be associated with equipment");

    if(!usuarioEquipamentoSchema.ativa)
        throw new DomainError("Association between user and equipment must be active");

    const usuarioEquipamento : UsuarioEquipamento = {
        ativa: usuarioEquipamentoSchema.ativa,
        id: usuarioEquipamentoSchema.id,
        usuario: usuarioSchema,
        equipamento: equipamentoSchema
    }


    return {
        usuarioEquipamento: usuarioEquipamento
    }
  }

}

type ChecarUsuarioEquipamentoInput = {
  usuarioId: string,
  equipamentoId: string
};

type ChecarUsuarioEquipamentoOutput = {
    usuarioEquipamento: UsuarioEquipamento
};