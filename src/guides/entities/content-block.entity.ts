import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.entity";

@Entity()
export class ContentBlock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: ["TEXT", "IMAGE", "LINK"] })
    contentType: "TEXT" | "IMAGE" | "LINK";

    @Column({ type: "text", nullable: true })
    content: string; // Texte ou URL d'une image/lien

    @ManyToOne(() => Section, (section) => section.contentBlocks, { onDelete: "CASCADE" })
    section: Section;
}
