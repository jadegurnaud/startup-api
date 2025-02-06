import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stay } from "./stay.entity";

@Entity()
export class InterStayTransport {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Stay, stay => stay.departingTransports)
    fromStay: Stay;

    @ManyToOne(() => Stay, stay => stay.arrivingTransports)
    toStay: Stay;

    @Column('text')
    description: string;

    @Column({ type: "enum", enum: ["TRAIN", "BUS", "AVION", "VELO"] })
    transportType: "TRAIN" | "BUS" | "AVION" | "VELO";

    @Column()
    order: number

    
    
}