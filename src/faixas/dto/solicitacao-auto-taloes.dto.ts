import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SolicitacaoAutoDto{

    @ApiProperty()
    @IsUUID()
    usuario_id: string;

    @ApiProperty()
    @IsUUID()
    equipamento_id: string;

}