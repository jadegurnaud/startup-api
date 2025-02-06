import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentBlock } from "./content-block.entity";
import { Day } from "./day.entity";
import { DirectGuide } from "./direct-guide.entity";

@Entity()
export class Section {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ["ACCOMMODATION", "ACTIVITY", "FOOD", "TRANSPORT", "LIBRE"] })
    sectionType: "ACCOMMODATION" | "ACTIVITY" | "FOOD" | "TRANSPORT" | "LIBRE";

    @Column({ nullable: true })
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @OneToMany(() => ContentBlock, (block) => block.section, { cascade: true, eager: true })
    contentBlocks: ContentBlock[];

    @ManyToOne(() => Day, (day) => day.sections, { onDelete: "CASCADE" })
    day: Day;

    @ManyToOne(() => DirectGuide, (directGuide) => directGuide.sections, { onDelete: "CASCADE" })
    guide: DirectGuide;

    @Column({ nullable: true })
    order: number;
}
