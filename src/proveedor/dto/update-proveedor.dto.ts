import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorDto } from './create-proveedor.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {

    @IsPositive()
    @IsNumber()
    id:number;


}