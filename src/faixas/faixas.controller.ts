import { Body, Controller, DefaultValuePipe, Get, HttpException, Param, ParseBoolPipe, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { MonitoramentoTaloesDto } from './dto/monitoramento-taloes.dto';
import { SolicitacaoAutoDto } from './dto/solicitacao-auto-taloes.dto';
import { SolicitacaoFaixa } from './dto/solicitacao-faixa.dto';
import { FaixasService } from './faixas.service';

@Controller('faixas')
export class FaixasController {
    constructor(private faixasService: FaixasService) {}


    @Post("/solicitar")
    async solicitarFaixa(
      @Body(new ValidationPipe()) solicitacaoFaixa: SolicitacaoFaixa) {
      return await this.faixasService.solicitarFaixa(solicitacaoFaixa)
  }

    @Post("/:tipo/solicitar-automatico/taloes")
    async solicitarAutoTalao(
        @Body(new ValidationPipe()) solicitacaoAutoDto: SolicitacaoAutoDto,
        @Query('quantidade', new DefaultValuePipe(50), ParseIntPipe) quantidade: number,
        @Param('tipo', ParseIntPipe) tipo: number,
        @Query('vinculado', new DefaultValuePipe(false), ParseBoolPipe) vinculado: boolean
        ) {

        return (await this.faixasService.solicitarAutoTalao(
            solicitacaoAutoDto.usuario_id,
            solicitacaoAutoDto.equipamento_id,
            quantidade,
            tipo,
            vinculado)).map( talao => talao.identificador);
    }

    @Get("/:tipo/taloes")
    async monitorarTaloes(
        @Body(new ValidationPipe()) monitoramentoTalaoDto: MonitoramentoTaloesDto,
        @Param('tipo', ParseIntPipe) tipo: number,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number) {
        
        
        return (await this.faixasService).monitorarTaloes(
            skip,
            take,
            tipo,
            monitoramentoTalaoDto.user_name,
            monitoramentoTalaoDto.tenant_id
        )
    }



}
