import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Guide } from "../../guides/entities/guide.entity";
import { Favorite } from "../../favorites/entities/favorite.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    pseudo: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    coverImage: string;

    @Column({ nullable: true })
    profileImage: string;

    @Column()
    dateOfBirth: Date;

    @Column()
    isActive: boolean;
    
    @Column({ nullable: true })
    refreshToken: string;

    @OneToMany(() => Guide, guide => guide.user)
    guides: Guide[];

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites: Favorite[];

    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
}
