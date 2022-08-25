import { ApiProperty } from "@nestjs/swagger";
import { Faixa } from "../domain/faixa";
import { Ticket } from "../domain/talao";


export interface FaixaRepositoryInterface{
    findTaloes(options: MonitoramentoTaloesOptions ): Promise<TalaoPage>;
    findOneBy(condicoes) : Promise<Faixa | null>; 
    save(faixa:Faixa, taloes?: Ticket[]);
    find(condicoes);
    
}

export interface MonitoramentoTaloesOptions{
    take: number;
    skip: number;
    tipo: number
    userName: string
    tenantId: string,
    equipment: string,
    ticketNumber: string,
    startDate: Date,
    endDate: Date
}


export class Meta{
    @ApiProperty()
    total: number
}

export class DataTalao{
    @ApiProperty()
    id?: number

    @ApiProperty()
    user_name?: string

    @ApiProperty()
    ticket_number: string

    @ApiProperty()
    equipment: string

    @ApiProperty()
    date: Date

    @ApiProperty()
    status: number

    @ApiProperty()
    attached: boolean
}

export class TalaoPage{
    @ApiProperty()
    meta: Meta;

    @ApiProperty({type: DataTalao})
    data: DataTalao[];
}


export class BandsData{
    @ApiProperty()
    id : number
    @ApiProperty()
    preffix: string

    @ApiProperty()
    inicial_number: number

    @ApiProperty()
    final_number: number

    @ApiProperty()
    next_number: number

    @ApiProperty()
    active: boolean

    @ApiProperty()
    type: number

    @ApiProperty()
    tenant_id: string
}

export class BandsPage{
    @ApiProperty()
    meta: Meta;
    @ApiProperty({type: BandsData})
    data: BandsData[];
}