import { Guide } from "../../guides/entities/guide.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => Guide, guide => guide.images, { onDelete: 'CASCADE' })
    guide: Guide;

    constructor(image: Partial<Image>) {
        Object.assign(this, image);
    }
}