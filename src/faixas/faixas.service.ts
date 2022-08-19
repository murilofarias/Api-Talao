import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ChecarUsuarioEquipamentoUseCase } from 'src/@core/application/checar-usuario-equipamento.use-case';
import { CriarFaixaUseCase } from 'src/@core/application/criar-faixa.use-case';
import { LiberarTaloesUseCase } from 'src/@core/application/liberar-taloes.use-case';

@Injectable()
export class FaixasService {
    constructor(
        private checarUsuarioEquipamentoUseCase: ChecarUsuarioEquipamentoUseCase,
        private liberarTaloesUseCase: LiberarTaloesUseCase,
        private criarFaixaUseCase: CriarFaixaUseCase
      ) {}


    async solicitarAutoTalao(usuarioId, equipamentoId, quantidade, tipo, vinculado){
        const usuarioEquipamentoUseCaseResponse = await this.checarUsuarioEquipamentoUseCase.execute(
            {
                usuarioId: usuarioId, 
                equipamentoId : equipamentoId
            });
        
        if(usuarioEquipamentoUseCaseResponse.mensagemErro.length > 0)
            throw new HttpException(usuarioEquipamentoUseCaseResponse.mensagemErro, HttpStatus.FORBIDDEN);

        
        const liberarTalaoUseCaseResponse = await this.liberarTaloesUseCase.execute(
            {
                tipo: tipo,
                quantidade: quantidade,
                vinculado: vinculado,
                usuarioEquipamento: usuarioEquipamentoUseCaseResponse.usuarioEquipamento
            }
        )

        if(liberarTalaoUseCaseResponse.mensagemErro.length > 0)
            throw new HttpException(liberarTalaoUseCaseResponse.mensagemErro, HttpStatus.FORBIDDEN);

        return liberarTalaoUseCaseResponse.taloes;
    }


    async solicitarFaixa(solicitacaoFaixa) {
        const criarFaixaUseCaseResponse = await this.criarFaixaUseCase.execute(
          {
            numeroInicial: solicitacaoFaixa.numero_inicial,
            numeroFinal: solicitacaoFaixa.numero_final,
            prefixo: solicitacaoFaixa.prefixo,
            tipo: solicitacaoFaixa.tipo,
            idTenant: solicitacaoFaixa.id_tenant
          });
      
      if(criarFaixaUseCaseResponse.mensagemErro.length > 0)
          throw new HttpException(criarFaixaUseCaseResponse.mensagemErro, HttpStatus.FORBIDDEN);
    
        return criarFaixaUseCaseResponse.faixa;
      }
}
