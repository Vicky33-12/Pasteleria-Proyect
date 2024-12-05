import {IsNumber} from "class-validator";
import {Type} from "class-transformer";
export class CreateInventarioDto {

    @IsNumber()
    @Type(()=>Number)
    public idproducto:number;
    @IsNumber()
    @Type(()=>Number)
    public cantidaddispo:number;
}
