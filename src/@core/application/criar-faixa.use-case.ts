import { Faixa } from "../domain/faixa";
import { FaixaRepositoryInterface } from "../plug/faixa.repository.interface";


export class CriarFaixaUseCase{
    constructor(private faixaRepository: FaixaRepositoryInterface) {}

    async execute(input: CriarFaixaInput): Promise<CriarFaixaOutput>{
        
        const mensagensErro : string[] = [];
        const faixasTenant = await this.faixaRepository.find({
            idTenant: input.idTenant
        });

        if(!faixasTenant.every(faixa => faixa.prefixo !== input.prefixo)){
            
            mensagensErro.push("O tenant deve ter faixas com prefixos diferentes!");
            return this.gerarResposta(mensagensErro);
        }


        //procura por faixas do mesmo tipo do mesmo cliente para poder, se existir, desativar a antiga e ativar a nova
        const faixaAtualMesmoTipo: Faixa = faixasTenant.find(faixa => faixa.tipoRegistro === input.tipo && faixa.idTenant === input.idTenant);
        if(faixaAtualMesmoTipo){
            faixaAtualMesmoTipo.desativar();
        }
    
        let novaFaixa;
    
        try{
            novaFaixa = new Faixa(input.idTenant, input.numeroInicial, input.numeroFinal, input.prefixo, input.tipo);
        }catch(e){
            mensagensErro.push(e);
            return this.gerarResposta(mensagensErro);
        }
        this.faixaRepository.save(novaFaixa, []);
        return  this.gerarResposta(mensagensErro, novaFaixa);
    }

    gerarResposta(mensagensErro: string[], faixa: Faixa = null){
        return {mensagemErro: mensagensErro.join(", "), faixa};
      }

}

type CriarFaixaInput = {
    numeroInicial: number,
    numeroFinal: number,
    prefixo: string,
    tipo: number,
    idTenant: string
  };
  
  type CriarFaixaOutput = {
      mensagemErro: string;
      faixa: Faixa;
  };