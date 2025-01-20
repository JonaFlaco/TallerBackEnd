import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductoEntity } from "./producto.entity";
import { ProductoRepository } from "./producto.repository";
import { ProductoDTO } from "./dto/producto.dto";

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity)
        private productoRepository: ProductoRepository
    ) { }

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException({ message: 'La lista esta vacia' })
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { id } });
        if (!producto) {
            throw new NotFoundException({ message: 'No Existe' })
        }
        return producto;
    }

    async findByNombre(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { nombre } });
        return producto ? producto : null;
    }

    async create(dto: ProductoDTO): Promise<any> {
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return { message: `producto ${producto.nombre} agregado` }
    }

    async update(id: number, dto: ProductoDTO): Promise<any> {
        const producto = await this.findById(id);
        if (dto.nombre) producto.nombre = dto.nombre;
        if (dto.precio) producto.precio = dto.precio;
        await this.productoRepository.save(producto);
        return { message: `producto ${producto.nombre} actualizado` }
    }

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return { message: `producto ${producto.nombre} eliminado` }
    }
}
