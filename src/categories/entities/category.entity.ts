import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Guide } from "../../guides/entities/guide.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Guide, guide => guide.categories)
    guides: Guide[];

}