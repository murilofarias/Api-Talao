
//não services do Nest.js - casos de uso vão ser o service
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EquipamentoSchema } from "src/infra/db/typeorm/equipamento.schema";
import { UsuarioEquipamentoSchema } from "src/infra/db/typeorm/usuario-equipamento.schema";
import { UsuarioSchema } from "src/infra/db/typeorm/usuario.schema";
import { Repository } from "typeorm";
import { UsuarioEquipamento } from "../domain/usuario-equipamento";

@Injectable()
export class ChecarUsuarioEquipamentoUseCase {
    constructor(
        @InjectRepository(UsuarioEquipamentoSchema)
        private usuarioEquipamentoRepository: Repository<UsuarioEquipamentoSchema>,
        @InjectRepository(UsuarioSchema)
        private usuarioRepository: Repository<UsuarioSchema>,
        @InjectRepository(EquipamentoSchema)
        private equipamentoRepository: Repository<EquipamentoSchema>
      ) {}

  async execute(input: ChecarUsuarioEquipamentoInput): Promise<ChecarUsuarioEquipamentoOutput> {
    const mensagensErro : string[] = [];
    const usuarioSchema = await this.usuarioRepository.findOneBy({
        id: input.usuarioId
    })
    if(!usuarioSchema)
        mensagensErro.push("Usuário inexistente");

    const equipamentoSchema = await this.equipamentoRepository.findOneBy({
        id: input.equipamentoId
    })
    if(!equipamentoSchema)
        mensagensErro.push("Equipamento inexistente");
    
    //Nao é necessário checar o relacionamento usuario equipamento se algum deles nao existe.
    if(mensagensErro.length > 0 )
        return this.gerarResposta(mensagensErro);

    const usuarioEquipamentoSchema = await this.usuarioEquipamentoRepository.findOneBy({
        usuario: usuarioSchema,
        equipamento: equipamentoSchema
    })

    if(!usuarioEquipamentoSchema)
        mensagensErro.push("Usuário não associado com Equipamento");
    else
        if(!usuarioEquipamentoSchema.ativa)
            mensagensErro.push("Associação do usuário com o equipamento não está mais ativa");

    const usuarioEquipamento = usuarioEquipamentoSchema;
    const usuario = usuarioSchema;
    const equipamento = equipamentoSchema;
    usuarioEquipamento.usuario = usuario;
    usuarioEquipamento.equipamento = equipamento;

    return this.gerarResposta(mensagensErro, usuarioEquipamentoSchema);
  }


  gerarResposta(mensagensErro: string[], usuarioEquipamento =null){
    return {
        mensagemErro: mensagensErro.join(", "),
        usuarioEquipamento: usuarioEquipamento
    };
  }
}

type ChecarUsuarioEquipamentoInput = {
  usuarioId: string,
  equipamentoId: string
};

type ChecarUsuarioEquipamentoOutput = {
    mensagemErro: string,
    usuarioEquipamento: UsuarioEquipamento
};