import { Injectable } from "@nestjs/common";
import { CriarFaixaUseCase } from "src/core/application/criar-faixa.use-case";
import { GetBandsUseCase } from "src/core/application/get-bands.use-case";
import { LiberarTaloesUseCase } from "src/core/application/liberar-taloes.use-case";
import { MonitorarTaloesUseCase } from "src/core/application/monitorar-taloes.use-case";



@Injectable()
export class FaixasService {

  constructor(
      private liberarTaloesUseCase: LiberarTaloesUseCase,
      private criarFaixaUseCase: CriarFaixaUseCase,
      private monitorarTaloesUseCase: MonitorarTaloesUseCase,
      private getBandsUseCase: GetBandsUseCase
    ) {}


  
  async getBands(tenant_id, type, only_active ){
    const getBandsResponse = await this.getBandsUseCase.execute(
      {
        tenantId: tenant_id,
        type: type,
        onlyActive: only_active
      }
    );

    return getBandsResponse.bandsPage;
  }


  async  monitorarTaloes(skip: number, take: number, tipo:number,
      user_name: string, tenant_id: string, equipment: string,ticketNumber: string, start_date: Date, end_date:Date ) {
      const monitorarTaloesUseCase = await this.monitorarTaloesUseCase.execute(
          {
              skip: skip,
              take: take,
              tipo: tipo,
              usuarioName:user_name,
              tenantId: tenant_id,
              equipment: equipment,
              ticketNumber: ticketNumber,
              startDate: start_date,
              endDate: end_date
          });


          return monitorarTaloesUseCase.taloes;
  }

  async solicitarAutoTalao(usuarioId, equipamentoId, tenantId, quantidade, tipo, vinculado){
      
      
      const liberarTalaoUseCaseResponse = await this.liberarTaloesUseCase.execute(
          {
              tipo: tipo,
              tenantId: tenantId,
              quantidade: quantidade,
              vinculado: vinculado,
              usuarioId: usuarioId,
              equipamentoId: equipamentoId
          }
      )

      return liberarTalaoUseCaseResponse.taloes;
  }


  async solicitarFaixa(solicitacaoFaixa, tenant_id: string) {
      const criarFaixaUseCaseResponse = await this.criarFaixaUseCase.execute(
        {
          numeroInicial: solicitacaoFaixa.initial_number,
          numeroFinal: solicitacaoFaixa.final_number,
          prefixo: solicitacaoFaixa.preffix,
          tipo: solicitacaoFaixa.type,
          idTenant: tenant_id
        });
  
      return criarFaixaUseCaseResponse.faixa;
    }
}
