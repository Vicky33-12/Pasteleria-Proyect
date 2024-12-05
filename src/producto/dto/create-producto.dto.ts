import {IsNumber, IsString, Min} from "class-validator";
import {Type} from "class-transformer";
export class CreateProductoDto {

    @IsString()
    public nombre:string;

    @IsString()
    public tipo:string;
}
