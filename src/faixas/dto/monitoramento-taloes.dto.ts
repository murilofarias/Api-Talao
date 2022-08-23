import {  IsUUID } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';



export class MonitoramentoTaloesDto{

    @ApiProperty()
    user_name: string;

    @ApiProperty()
    @IsUUID()
    tenant_id: string;

    @ApiProperty()
    equipment: string;

    @ApiProperty()
    released_date: Date;

    @ApiProperty()
    ticket_number:string

    
}
