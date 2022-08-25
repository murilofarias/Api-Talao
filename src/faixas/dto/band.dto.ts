import { ApiProperty } from "@nestjs/swagger";

export class BandDto{

    @ApiProperty()
    id: string
    
    @ApiProperty()
    initial_number: number

    @ApiProperty()
    final_number: number

    @ApiProperty()
    next_number: number

    @ApiProperty()
    preffix: string

    @ApiProperty()
    type: number

    @ApiProperty()
    active: boolean
}