import { Body, Controller, DefaultValuePipe, Get, HttpException, Param, ParseBoolPipe, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { MonitoramentoTaloesDto } from './dto/monitoramento-taloes.dto';
import { SolicitacaoAutoDto } from './dto/solicitacao-auto-taloes.dto';
import { SolicitacaoFaixa } from './dto/solicitacao-faixa.dto';
import { FaixasService } from './faixas.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('bands')
@Controller('bands')
export class FaixasController {
    constructor(private faixasService: FaixasService) {}


    @Post("/request")
    async solicitarFaixa(
      @Body(new ValidationPipe()) solicitacaoFaixa: SolicitacaoFaixa) {
      return await this.faixasService.solicitarFaixa(solicitacaoFaixa)
  }

    @Post("/:type/auto-request/tickets")
    async solicitarAutoTalao(
        @Body(new ValidationPipe()) solicitacaoAutoDto: SolicitacaoAutoDto,
        @Param('type', ParseIntPipe) tipo: number,
        @Query('quantity', new DefaultValuePipe(50), ParseIntPipe) quantidade: number,
        @Query('attach', new DefaultValuePipe(false), ParseBoolPipe) vinculado: boolean
        ) {

        return (await this.faixasService.solicitarAutoTalao(
            solicitacaoAutoDto.usuario_id,
            solicitacaoAutoDto.equipamento_id,
            quantidade,
            tipo,
            vinculado)).map( talao => talao.identificador);
    }

    @Get("/:type/tickets")
    async monitorarTaloes(
        @Body(new ValidationPipe()) monitoramentoTalaoDto: MonitoramentoTaloesDto,
        @Param('type', ParseIntPipe) tipo: number,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number) {
        
        
        return (await this.faixasService).monitorarTaloes(
            skip,
            take,
            tipo,
            monitoramentoTalaoDto.user_name,
            monitoramentoTalaoDto.tenant_id,
            monitoramentoTalaoDto.equipment,
            monitoramentoTalaoDto.ticket_number,
            monitoramentoTalaoDto.released_date
        )
    }



}
