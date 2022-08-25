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

export interface TalaoPage{
    meta: Meta;
    data: DataTalao[];
}

export interface Meta{
    total: number
}

export interface DataTalao{
    id?: number
    user_name?: string
    ticket_number: string
    equipment: string
    date: Date
    status: number,
    attached: boolean
}
