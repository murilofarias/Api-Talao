import { IsInt, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SolicitacaoFaixa{

    @ApiProperty()
    @IsInt()
    numero_inicial: number;

    @ApiProperty()
    @IsInt()
    numero_final: number;

    @ApiProperty()
    @Length(1, 3)
    prefixo: string;

    @ApiProperty()
    @IsInt()
    tipo:number;

    @ApiProperty()
    @IsUUID()
    id_tenant: string;

}