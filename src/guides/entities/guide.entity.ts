import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Image } from "../../images/entites/image.entity";
import { Address } from "./adresse.entity";

enum GuideType {
    DRAFT = 'draft',
    PUBLISHED = 'published',
}
@Entity()
export class Guide {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    coverImage: string;

    @Column({ nullable: true, type: 'enum', enum: GuideType, default: GuideType.DRAFT })
    type: GuideType;

    @Column({ default: 0 })
    views: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Address, { cascade: true, eager: true })
    address: Address;

    @ManyToOne(() => User, user => user.guides)
    user: User;

    @OneToMany(() => Image, (image) => image.guide, { cascade: true })
    images: Image[];

    @ManyToMany(() => User, user => user.favorites, { cascade: true })
    favorites: User[];

    constructor(guide: Partial<Guide>) {
        Object.assign(this, guide);
    }

}
