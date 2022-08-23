import { ApiProperty } from '@nestjs/swagger';

export class Usuario {

    readonly id: string;

    @ApiProperty()
    readonly nome: string;

    @ApiProperty()
    readonly login:string;

    @ApiProperty()
    readonly matricula: string;
    
}