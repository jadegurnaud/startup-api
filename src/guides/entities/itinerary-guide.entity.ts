import { ChildEntity, Column, Entity, OneToMany } from 'typeorm';
import { Guide } from './guide.entity';
import { Day } from './day.entity';
import { GuideType } from '../types/guide.types';
import { Stay } from './stay.entity';

@ChildEntity(GuideType.ITINERARY)
export class ItineraryGuide extends Guide {
    @Column({ nullable: true })
    startCity: string;

    @Column({ nullable: true })
    endCity: string;
    
    @Column({ nullable: true })
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @OneToMany(() => Day, day => day.itineraryGuide, { cascade: true })
    days: Day[];

    @OneToMany(() => Stay, stay => stay.itineraryGuide, { cascade: true })
    stays: Stay[];

    constructor(guide: Partial<ItineraryGuide>) {
        super(guide);
        this.guideType = GuideType.ITINERARY;
    }

}