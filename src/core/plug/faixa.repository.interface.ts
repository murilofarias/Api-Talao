import { Faixa } from "../domain/faixa";
import { Ticket } from "../domain/talao";


export interface FaixaRepositoryInterface{
    findOneBy(condicoes) : Promise<Faixa | null>; 
    save(faixa:Faixa, taloes?: Ticket[]);
    find(condicoes): Promise<Faixa[]>;
    
}