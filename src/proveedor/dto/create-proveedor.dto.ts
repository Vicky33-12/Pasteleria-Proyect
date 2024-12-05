import {IsNumber, IsString, Min} from "class-validator";
import {Type} from "class-transformer";
export class CreateProveedorDto {

    @IsString()
    public nombre:string;

    @IsNumber()
    @Type(()=>Number)
    public contacto:number;

    @IsString()
    public productosuministrado:string;

    

}
