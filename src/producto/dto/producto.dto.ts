import { IsNotEmpty, IsNumber } from "class-validator";
import { IsNotBlank } from "src/decorators/is-notblank.decorator";

export class ProductoDTO {

    @IsNotBlank({ message: 'El nombre esta vacio' })
    nombre?: string;

    @IsNumber()
    @IsNotEmpty()
    precio?: number;
}