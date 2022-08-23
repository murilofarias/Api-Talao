import { DomainError } from "../domain/errors/domain.error";
import { Ticket } from "../domain/talao";
import { FaixaRepositoryInterface } from "../plug/faixa.repository.interface";
import { GetUsuarioEquipamentoUseCase } from "./get-usuario-equipamento.use-case";



export class LiberarTaloesUseCase {
    constructor(private faixaRepository: FaixaRepositoryInterface,
      private checarUsuarioEquipamentoUseCase: GetUsuarioEquipamentoUseCase,) {}

  async execute(input: liberarTaloesInput): Promise<liberarTaloesOutput> {

    const getUsuarioEquipamentoOutput = await this.checarUsuarioEquipamentoUseCase.execute({
      usuarioId: input.usuarioId,
      equipamentoId: input.equipamentoId
    })

    const faixa = await this.faixaRepository.findOneBy({
        tipoRegistro: input.tipo,
        ativa: true
    })

    if(!faixa)
      throw new DomainError("There must be an active band for this Ticket type");

    
    const taloes = faixa.liberarTaloes(getUsuarioEquipamentoOutput.usuarioEquipamento, input.quantidade, input.vinculado);

    this.faixaRepository.save(faixa, taloes);

    return {
      taloes: taloes
    }
  }


  
}

type liberarTaloesInput = {
  tipo: string,
  quantidade: number,
  vinculado: boolean,
  usuarioId: string,
  equipamentoId: string
};

type liberarTaloesOutput = {
    taloes: Ticket[];
};