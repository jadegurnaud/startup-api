import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Guide } from "src/guides/entities/guide.entity";

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
