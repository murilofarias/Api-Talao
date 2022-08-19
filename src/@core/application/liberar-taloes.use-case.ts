import { Talao } from "../domain/talao";
import { UsuarioEquipamento } from "../domain/usuario-equipamento";
import { FaixaRepositoryInterface } from "../plug/faixa.repository.interface";



export class LiberarTaloesUseCase {
    constructor(private faixaRepository: FaixaRepositoryInterface) {}

  async execute(input: liberarTaloesInput): Promise<liberarTaloesOutput> {
    const mensagensErro = [];
    const faixa = await this.faixaRepository.findOneBy({
        tipoRegistro: input.tipo,
        ativa: true
    })

    let taloes;
    try{
        taloes = faixa.liberarTaloes(input.usuarioEquipamento, input.quantidade, input.vinculado);
    }
    catch(e){
        mensagensErro.push(e)
        return this.gerarResposta(mensagensErro);
    }

    this.faixaRepository.saveTaloes(faixa, taloes);

    return this.gerarResposta(mensagensErro, taloes);
  }


  gerarResposta(mensagensErro: string[], taloes: Talao[] = null){
    return {mensagemErro: mensagensErro.join(", "), taloes};
  }
}

type liberarTaloesInput = {
  tipo: string,
  quantidade: number,
  vinculado: boolean,
  usuarioEquipamento: UsuarioEquipamento
};

type liberarTaloesOutput = {
    mensagemErro: string;
    taloes: Talao[];
};