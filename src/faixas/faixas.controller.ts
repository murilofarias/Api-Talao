import { Body, Headers, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { AutoRequestDto } from './dto/auto-request.dto';
import { BandRequestDto } from './dto/band-request.dto';
import { FaixasService } from './faixas.service';
import { ApiTags, ApiQuery, ApiHeader, ApiOperation, ApiResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { BandDto } from './dto/band.dto';
import { BandsPage, TalaoPage } from 'src/core/plug/faixa.repository.interface';


@ApiTags('bands')
@Controller('bands')
export class FaixasController {
    constructor(private faixasService: FaixasService) {}

  @ApiHeader({
      name: "tenant_id",
      description: "Tenant's id",
      required: true
  })
  @ApiOperation({ summary: 'Requests a new band for the given tenant' })
  @ApiResponse({ status: 201, description: 'Band created!', type: BandDto})
  @ApiForbiddenResponse({ description: 'Response given when a command tries to break a domain rule'})
  @Post("/")
  async requestBand(
    @Body(new ValidationPipe()) solicitacaoFaixa: BandRequestDto,
    @Headers('tenant_id') tenant_id: string): Promise<BandDto> {
    const faixa = await this.faixasService.solicitarFaixa(solicitacaoFaixa, tenant_id)

    return {
      id: faixa.id,
      initial_number: faixa.numInicial,
      final_number: faixa.numFinal,
      next_number: faixa.proximo,
      preffix: faixa.prefixo,
      type: faixa.tipoRegistro,
      active: faixa.ativa
    }
  }



@ApiHeader({
    name: "tenant_id",
    description: "Tenant's id",
    required: true
})
@ApiQuery({
    name: "type",
    type: Number,
    description: "Type of the bands to be returned. If not specified, returns bands of all types.",
    required: false
})
@ApiQuery({
    name: "only_active",
    type: Boolean,
    description: "It marks if the bands returned must be active or not. If false, gives all bands. If true, gives only the active ones.",
    required: false
})
@ApiOperation({ summary: 'Get Bands from a given tenant' })
@ApiResponse({ status: 200, description: 'Search was performed without problems', type: BandsPage})
  @Get("/")
  async getBands(
    @Headers('tenant_id') tenant_id: string,
    @Query('type', new DefaultValuePipe(-1), ParseIntPipe) type?: number,
    @Query('only_active', new DefaultValuePipe(true), ParseBoolPipe) only_active?: boolean
  ){
    return await this.faixasService.getBands(tenant_id, type, only_active)  
  }



  @ApiHeader({
      name: "tenant_id",
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
  @ApiOperation({ summary: 'Release Tickets from a given type of Band. It must have an active band for the given type!'})
  @ApiResponse({ status: 201, description: 'Tickets Released', type: String, isArray: true})
  @ApiForbiddenResponse({ description: 'Response given when a command tries to break a domain rule'})
  @Post("/:type/auto-request/tickets")
  async autoRequestTicket(
      @Body(new ValidationPipe()) autoRequestDto: AutoRequestDto,
      @Param('type', ParseIntPipe) tipo: number,
      @Headers('tenant_id') tenant_id: string,
      @Query('quantity', new DefaultValuePipe(50), ParseIntPipe) quantidade?: number,
      @Query('attach', new DefaultValuePipe(false), ParseBoolPipe) vinculado?: boolean
      ) {

      return (await this.faixasService.solicitarAutoTalao(
          autoRequestDto.user_id,
          autoRequestDto.device_id,
          tenant_id,
          quantidade,
          tipo,
          vinculado)).map( talao => talao.identificador);
  }


  @ApiHeader({
      name: "tenant_id",
      description: "Tenant's id",
      required: true
    })
    @ApiQuery({
      name: "skip",
      type: Number,
      required: false
    })
    @ApiQuery({
      name: "take",
      type: Number,
      required: false
    })
  @ApiQuery({
      name: "user_name",
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
      name: "released_start_date",
      type: Date,
      description: "Date when the tickets were released. Format : yyyy-mm-ddTHH:mm. You can give just part of it",
      required: false
    })
    @ApiQuery({
      name: "released_end_date",
      type: Date,
      description: "Date when the tickets were released. Format : yyyy-mm-ddTHH:mm. You can give just part of it",
      required: false
    })
    @ApiQuery({
      name: "ticket_number",
      type: String,
      description: "Identifier of the ticket. Example: TL00000001",
      required: false
    })
  @ApiOperation({ summary: 'Get Tickets for a given type of active band.'})
  @ApiResponse({ status: 200, description: 'Search was performed without problems', type: TalaoPage})
  @Get("/:type/tickets")
  async trackTickets(
      @Param('type', ParseIntPipe) type: number,
      @Headers('tenant_id') tenant_id: string,
      @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
      @Query('take', new DefaultValuePipe(10), ParseIntPipe) take: number,
      @Query('user_name', new DefaultValuePipe("")) user_name?: string,
      @Query('equipment', new DefaultValuePipe("")) equipment?: string,
      @Query('released_start_date') released_start_date?: Date,
      @Query('released_end_date') released_end_date?: Date,
      @Query('ticket_number', new DefaultValuePipe("")) ticket_number?: string) {
      
      
      return (await this.faixasService).monitorarTaloes(
          skip,
          take,
          type,
          user_name,
          tenant_id,
          equipment,
          ticket_number,
          released_start_date ? new Date(released_start_date) : released_start_date,
          released_end_date ? new Date(released_end_date) : released_end_date
      )
  }


}
