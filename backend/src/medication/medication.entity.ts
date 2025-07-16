import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('medication')
export class MedicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dosage: string;

  @Column()
  frequency: string;
}