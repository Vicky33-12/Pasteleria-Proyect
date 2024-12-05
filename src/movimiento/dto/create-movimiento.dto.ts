import {IsDate, IsNumber, IsString, Min} from "class-validator";
import {Type} from "class-transformer";
export class CreateMovimientoDto {
    @IsString()
    public tipo:string;
    @IsDate()
    @Type(()=>Date)
    public fecha:string;
    @IsNumber()
    @Type(()=>Number)
    public cantidad:number;

}

