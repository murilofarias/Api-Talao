import { BandsPage, FaixaRepositoryInterface, Meta } from "../plug/faixa.repository.interface";


export class GetBandsUseCase{
    constructor(private faixaRepository: FaixaRepositoryInterface) {}

    async execute(input: GetBandsInput): Promise<GetBandsOutput>{
        
        const conditions = {
             tenantId : input.tenantId,
             type: input.type,
             onlyActive: input.onlyActive 
        }
    
        const [bands, total] = await this.faixaRepository.find(conditions);

        const bandsdata = bands.map( band => {
            return {
                id: band.id,
                preffix: band.prefixo,
                inicial_number: band.numInicial,
                final_number: band.numFinal,
                next_number: band.proximo,
                active : band.ativa,
                type: band.tipoRegistro,
                tenant_id: band.idTenant
            }
        })
        
        return  {
            bandsPage:{
                meta:{
                    total: total
                },
                data: bandsdata
            }
        }
    }

}

type GetBandsInput = {
    tenantId: string,
    type: number,
    onlyActive: string,
  };
  
  type GetBandsOutput = {
      bandsPage: BandsPage;
  };
