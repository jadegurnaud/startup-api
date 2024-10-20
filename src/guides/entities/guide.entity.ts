import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Image } from "src/images/entites/image.entity";

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.guides)
    user: User;

    @OneToMany(() => Image, (image) => image.guide, { cascade: true })
    images: Image[];

    constructor(guide: Partial<Guide>) {
        Object.assign(this, guide);
    }

}
