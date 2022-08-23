import { Body, Headers, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { SolicitacaoAutoDto } from './dto/solicitacao-auto-taloes.dto';
import { SolicitacaoFaixa } from './dto/solicitacao-faixa.dto';
import { FaixasService } from './faixas.service';
import { ApiTags, ApiQuery, ApiHeader } from '@nestjs/swagger';


@ApiTags('bands')
@Controller('bands')
export class FaixasController {
    constructor(private faixasService: FaixasService) {}

    @ApiHeader({
        name: "tenant-id",
        description: "Tenant's id",
        required: true
    })
    @Post("/request")
    async solicitarFaixa(
      @Body(new ValidationPipe()) solicitacaoFaixa: SolicitacaoFaixa,
      @Headers('tenant-id') tenant_id: string) {
      return await this.faixasService.solicitarFaixa(solicitacaoFaixa, tenant_id)
  }

    @ApiHeader({
        name: "tenant-id",
        description: "Tenant's id",
        required: true
    })
    @ApiQuery({
        name: "quantity",
        type: String,
        description: "Quantity of tickets asked. Default is 50",
        required: false
    })
    @ApiQuery({
        name: "attach",
        type: String,
        description: "This parameter asserts If the tickets will be attached to the user who asked for them.",
        required: false
    })
    @Post("/:type/auto-request/tickets")
    async solicitarAutoTalao(
        @Body(new ValidationPipe()) solicitacaoAutoDto: SolicitacaoAutoDto,
        @Param('type', ParseIntPipe) tipo: number,
        @Headers('tenant-id') tenant_id: string,
        @Query('quantity', new DefaultValuePipe(50), ParseIntPipe) quantidade?: number,
        @Query('attach', new DefaultValuePipe(false), ParseBoolPipe) vinculado?: boolean
        ) {

        return (await this.faixasService.solicitarAutoTalao(
            solicitacaoAutoDto.usuario_id,
            solicitacaoAutoDto.equipamento_id,
            tenant_id,
            quantidade,
            tipo,
            vinculado)).map( talao => talao.identificador);
    }


    @ApiHeader({
        name: "tenant-id",
        description: "Tenant's id",
        required: true
      })
    @ApiQuery({
        name: "user-name",
        type: String,
        description: "Name of the user who requested the ticket. Matches any name like the given one",
        required: false
      })
      @ApiQuery({
        name: "equipment",
        type: String,
        description: "Alias of the equipment. Matches any name like the given one",
        required: false
      })
      @ApiQuery({
        name: "released-date-start",
        type: Date,
        description: "Date when the tickets were released. Format : yyyy-mm-ddTHH:mm. You can give just part of it",
        required: false
      })
      @ApiQuery({
        name: "released-date-end",
        type: Date,
        description: "Date when the tickets were released. Format : yyyy-mm-ddTHH:mm. You can give just part of it",
        required: false
      })
      @ApiQuery({
        name: "ticket-number",
        type: String,
        description: "Identifier of the ticket. Example: TL00000001",
        required: false
      })
    @Get("/:type/tickets")
    async monitorarTaloes(
        @Param('type', ParseIntPipe) type: number,
        @Headers('tenant-id') tenant_id: string,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
        @Query('user-name', new DefaultValuePipe("")) user_name?: string,
        @Query('equipment', new DefaultValuePipe("")) equipment?: string,
        @Query('released-date-start') released_date_start?: Date,
        @Query('released-date-end') released_date_end?: Date,
        @Query('ticket-number', new DefaultValuePipe("")) ticket_number?: string) {
        
        
        /*
        "usuario_id": "2e0fe605-338c-4c1a-ad88-0795783a236c",
        "equipamento_id": "bfa68bf9-8def-4865-8a4d-819119d87c75",
        "tenant_id": "2e0fe605-338c-4c1a-ad88-079578f8236c"
        */
        return (await this.faixasService).monitorarTaloes(
            skip,
            take,
            type,
            user_name,
            tenant_id,
            equipment,
            ticket_number,
            released_date_start ? new Date(released_date_start) : released_date_start,
            released_date_end ? new Date(released_date_end) : released_date_end
        )
    }


}
