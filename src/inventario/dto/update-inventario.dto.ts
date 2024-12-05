import { PartialType } from '@nestjs/mapped-types';
import { CreateInventarioDto } from './create-inventario.dto';
import { IsNumber, IsPositive } from 'class-validator';


export class UpdateInventarioDto extends PartialType(CreateInventarioDto) {

    @IsPositive()
    @IsNumber()
    id:number;
}
