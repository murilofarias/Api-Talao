import { DomainError } from "../domain/errors/domain.error";
import { Faixa } from "../domain/faixa";
import { FaixaRepositoryInterface } from "../plug/faixa.repository.interface";


export class CriarFaixaUseCase{
    constructor(private faixaRepository: FaixaRepositoryInterface) {}

    async execute(input: CriarFaixaInput): Promise<CriarFaixaOutput>{

        console.log(input.idTenant)
        
        const faixasTenantAtivas = await this.faixaRepository.find({
            where: {
                idTenant: input.idTenant,
                ativa: true
            }
        });

        console.log(faixasTenantAtivas)

        if(!faixasTenantAtivas.every(faixa => faixa.prefixo !== input.prefixo))
            throw new DomainError("Tenant must have different prefixes for active bands!")

        //procura por faixas do mesmo tipo do mesmo cliente para poder, se existir, desativar a antiga e ativar a nova
        const faixaAtualMesmoTipo = faixasTenantAtivas.find(faixa => faixa.tipoRegistro === input.tipo);
        if(faixaAtualMesmoTipo)
            throw new DomainError("There is already an active band with the same type!")
                
        const novaFaixa = new Faixa(input.idTenant, input.numeroInicial, input.numeroFinal, input.prefixo, input.tipo);
        
        const faixa = this.faixaRepository.save(novaFaixa);
        return  {
            faixa: faixa
        }
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
      faixa: Faixa;
  };