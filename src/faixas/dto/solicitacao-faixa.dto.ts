import { IsInt, IsUUID, Length } from 'class-validator';

export class SolicitacaoFaixa{

    @IsInt()
    numero_inicial: number;

    @IsInt()
    numero_final: number;

    @Length(1, 3)
    prefixo: string;

    @IsInt()
    tipo:number;

    @IsUUID()
    id_tenant: string;

}