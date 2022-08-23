import { ApiProperty } from '@nestjs/swagger';
export  class Equipamento {

    readonly id : string;

    @ApiProperty()
    readonly alias: string;

}