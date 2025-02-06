import { ChildEntity, Column, Entity, OneToMany } from 'typeorm';
import { Guide } from './guide.entity';
import { Day } from './day.entity';
import { GuideType } from '../types/guide.types';

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

    constructor(guide: Partial<ItineraryGuide>) {
        super(guide);
        this.guideType = GuideType.ITINERARY;
    }

}