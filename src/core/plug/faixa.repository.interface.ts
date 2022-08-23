import { Faixa } from "../domain/faixa";
import { Ticket } from "../domain/talao";


export interface FaixaRepositoryInterface{
    findTaloes(options: MonitoramentoTaloesOptions ): Promise<TalaoPage>;
    findOneBy(condicoes) : Promise<Faixa | null>; 
    save(faixa:Faixa, taloes?: Ticket[]);
    find(condicoes): Promise<Faixa[]>;
    
}

export interface MonitoramentoTaloesOptions{
    take: number;
    skip: number;
    tipo: number
    userName: string
    tenantId: string
}

export interface TalaoPage{
    meta: Meta;
    data: DataTalao[];
}

interface Meta{
    total: number
}

export interface DataTalao{
    id?: number
    username?: string
    ticketNumber: string
    equipment: string
    date: Date
    status: number
}