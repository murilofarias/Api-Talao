import {  IsUUID } from "class-validator";


export class MonitoramentoTaloesDto{

    
    user_name: string;

    @IsUUID()
    tenant_id: string;
}
