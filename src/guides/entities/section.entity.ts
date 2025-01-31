import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentBlock } from "./content-block.entity";
import { Day } from "./day.entity";

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ["ACCOMMODATION", "ACTIVITY", "FOOD", "TRANSPORT"] })
    sectionType: "ACCOMMODATION" | "ACTIVITY" | "FOOD" | "TRANSPORT";

    @Column({ nullable: true })
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @OneToMany(() => ContentBlock, (block) => block.section, { cascade: true })
    contentBlocks: ContentBlock[];

    @ManyToOne(() => Day, (day) => day.sections, { onDelete: "CASCADE" })
    day: Day;
}
