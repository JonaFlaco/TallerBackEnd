import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductoEntity } from "./producto.entity";
import { ProductoRepository } from "./producto.repository";
import { ProductoDTO } from "./dto/producto.dto";
import { MessageDTO } from "src/common/message.dto";

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(ProductoEntity)
        private productoRepository: ProductoRepository
    ) { }

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDTO('La lista esta vacia'))
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { id } });
        if (!producto) {
            throw new NotFoundException(new MessageDTO('No Existe'))
        }
        return producto;
    }

    async findByNombre(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ where: { nombre } });
        return producto ? producto : null;
    }

    async create(dto: ProductoDTO): Promise<any> {
        const exists = await this.findByNombre(dto.nombre);
        if (exists) throw new BadRequestException(new MessageDTO('Ese nombre ya existe'));
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return new MessageDTO(`producto ${producto.nombre} creado`)
    }

    async update(id: number, dto: ProductoDTO): Promise<any> {
        const producto = await this.findById(id);
        if (!producto)
            throw new NotFoundException(new MessageDTO('No Existe'))

        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id! == id) throw new BadRequestException({ message: 'Ese nombre ya existe' });

        if (dto.nombre) producto.nombre = dto.nombre;
        if (dto.precio) producto.precio = dto.precio;

        await this.productoRepository.save(producto);
        return new MessageDTO(`producto ${producto.nombre} actualizado`)
    }

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return new MessageDTO(`producto ${producto.nombre} eliminado`)

    }
}
