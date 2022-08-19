import { Faixa } from "../domain/faixa";
import { Talao } from "../domain/talao";


export interface FaixaRepositoryInterface{
    findOneBy(condicoes) : Promise<Faixa>; 
    save(faixa:Faixa, taloes: Talao[]);
    find(condicoes): Promise<Faixa[]>;
    saveTaloes(faixa: Faixa, taloes: Talao[]);
    
}