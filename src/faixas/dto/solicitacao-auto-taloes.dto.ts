import { IsUUID } from 'class-validator';

export class SolicitacaoAutoDto{

    @IsUUID()
    usuario_id: string;

    @IsUUID()
    equipamento_id: string;


}