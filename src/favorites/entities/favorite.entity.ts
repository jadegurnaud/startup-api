import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Guide } from "../../guides/entities/guide.entity";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favorites, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Guide, guide => guide.favorites, { onDelete: 'CASCADE' })
    guide: Guide;

    constructor(favorite: Partial<Favorite>) {
        Object.assign(this, favorite);
    }
}
