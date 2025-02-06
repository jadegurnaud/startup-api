import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItineraryGuide } from "./itinerary-guide.entity";
import { Section } from "./section.entity";

@Entity()
export class Day {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column('text')
    description: string;

    @ManyToOne(() => ItineraryGuide, itineraryGuide => itineraryGuide.days)
    itineraryGuide: ItineraryGuide;

    @OneToMany(() => Section, (section) => section.day, { cascade: true })
    sections: Section[];

    
    
}