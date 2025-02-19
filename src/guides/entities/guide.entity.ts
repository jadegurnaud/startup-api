import { JoinTable, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, TableInheritance, OneToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Image } from "../../images/entites/image.entity";
import { Address } from "../../addresses/entities/address.entity";
import { Category } from "../../categories/entities/category.entity";
import { GuideStatus, GuideType } from "../types/guide.types";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "guideType" } })
export abstract class Guide {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    coverImage: string;

    @Column({ 
        nullable: true, 
        type: 'enum', 
        enum: GuideStatus 
    })
    status: GuideStatus;

    @Column({ type: 'enum', enum: GuideType })
    guideType: GuideType;

    @Column({ default: false })
    isTravel: boolean;

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

    @ManyToMany(() => Category, category => category.guides, { cascade: true, eager: true })
    @JoinTable()
    categories: Category[];

    @Column({ nullable: true})
    price: number;

    constructor(guide: Partial<Guide>) {
        Object.assign(this, guide);
    }

}
