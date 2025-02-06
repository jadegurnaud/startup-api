import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ItineraryGuide } from "./itinerary-guide.entity";
import { Section } from "./section.entity";
import { Day } from "./day.entity";
import { Address } from "src/addresses/entities/address.entity";
import { InterStayTransport } from "./interStayTransport.entity";

@Entity()
export class Stay {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column('text')
    description: string;

    @ManyToOne(() => ItineraryGuide, itineraryGuide => itineraryGuide.stays)
    itineraryGuide: ItineraryGuide;

    @OneToMany(() => Day, day => day.stay, { cascade: true, eager: true })
    days: Day[];

    @ManyToOne(() => Address, { cascade: true, eager: true })
    address: Address;

    @Column()
    order: number

    @OneToMany(() => InterStayTransport, transport => transport.fromStay, { cascade: true, eager: true })
    departingTransports: InterStayTransport[];
  
    @OneToMany(() => InterStayTransport, transport => transport.toStay, { cascade: true, eager: true})
    arrivingTransports: InterStayTransport[];
    
}