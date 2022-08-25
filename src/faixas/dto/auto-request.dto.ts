import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AutoRequestDto{

    @ApiProperty()
    @IsUUID()
    user_id: string;

    @ApiProperty()
    @IsUUID()
    device_id: string;

}