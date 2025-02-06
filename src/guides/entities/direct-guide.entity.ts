import { ChildEntity, OneToMany } from 'typeorm';
import { Guide } from './guide.entity';
import { GuideType } from '../types/guide.types';
import { Section } from "./section.entity";

@ChildEntity(GuideType.DIRECT)
export class DirectGuide extends Guide {

   @OneToMany(() => Section, (section) => section.guide, { cascade: true })
       sections: Section[];

   constructor(guide: Partial<DirectGuide>) {
      super(guide);
      this.guideType = GuideType.DIRECT;
   }
}