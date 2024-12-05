import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoDto } from './create-movimiento.dto';
import { IsNumber, IsPositive } from 'class-validator';


export class UpdateMovimientoDto extends PartialType(CreateMovimientoDto) {

    @IsPositive()
    @IsNumber()
    id:number;
}
