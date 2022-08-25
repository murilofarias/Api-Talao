import { IsInt, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BandRequestDto{

    @ApiProperty()
    @IsInt()
    initial_number: number;

    @ApiProperty()
    @IsInt()
    final_number: number;

    @ApiProperty()
    @Length(1, 3)
    preffix: string;

    @ApiProperty()
    @IsInt()
    type:number;

}