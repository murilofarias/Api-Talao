import { Faixa } from "../domain/faixa";
import { Talao } from "../domain/talao";


export interface FaixaRepositoryInterface{
    findOneBy(condicoes) : Promise<Faixa>; 
    save(faixa:Faixa, taloes: Talao[]);
    find(condicoes): Promise<Faixa[]>;
    saveTaloes(faixa: Faixa, taloes: Talao[]);
    findTaloes(options: MonitoramentoTaloesOptions): Promise<TalaoPage>;
    
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