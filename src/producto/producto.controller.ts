import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDTO } from './dto/producto.dto';

@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService: ProductoService) { }

    @Get()
    async getAll() {
        return this.productoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.productoService.findById(id);
    }

    @Post()
    async create(@Body() dto:ProductoDTO){
        return await this.productoService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto:ProductoDTO){
        return await this.productoService.update(id, dto);
    }

    @Delete(':id')
    async detele(@Param('id', ParseIntPipe) id: number){
        return await this.productoService.delete(id)
    }
}
