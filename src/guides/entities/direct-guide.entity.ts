import { ChildEntity, Column } from 'typeorm';
import { Guide } from './guide.entity';
import { GuideType } from '../types/guide.types';

@ChildEntity(GuideType.DIRECT)
export class DirectGuide extends Guide {

   constructor(guide: Partial<DirectGuide>) {
      super(guide);
      this.guideType = GuideType.DIRECT;
   }
}