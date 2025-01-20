import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'producto'})
export class ProductoEntity{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nombre : String;

    @Column({ type: 'float', nullable: false })
    precio : number;

}