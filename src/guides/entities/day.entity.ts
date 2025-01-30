import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ItineraryGuide } from "./itinerary-guide.entity";

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
    
}