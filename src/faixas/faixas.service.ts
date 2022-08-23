import { Injectable } from "@nestjs/common";
import { CriarFaixaUseCase } from "src/core/application/criar-faixa.use-case";
import { LiberarTaloesUseCase } from "src/core/application/liberar-taloes.use-case";
import { MonitorarTaloesUseCase } from "src/core/application/monitorar-taloes.use-case";



@Injectable()
export class FaixasService {

    constructor(
        private liberarTaloesUseCase: LiberarTaloesUseCase,
        private criarFaixaUseCase: CriarFaixaUseCase,
        private monitorarTaloesUseCase: MonitorarTaloesUseCase
      ) {}


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


    async solicitarFaixa(solicitacaoFaixa, tenantId: string) {
        const criarFaixaUseCaseResponse = await this.criarFaixaUseCase.execute(
          {
            numeroInicial: solicitacaoFaixa.numero_inicial,
            numeroFinal: solicitacaoFaixa.numero_final,
            prefixo: solicitacaoFaixa.prefixo,
            tipo: solicitacaoFaixa.tipo,
            idTenant: tenantId
          });
    
        return criarFaixaUseCaseResponse.faixa;
      }
}
